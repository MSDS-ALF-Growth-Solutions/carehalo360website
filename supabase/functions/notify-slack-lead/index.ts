import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

// Origins allowed to call this function from a browser. Anything else gets no
// CORS grant, so the browser drops the response.
const ALLOWED_ORIGINS = [
  "https://carehalo360.com",
  "https://www.carehalo360.com",
  "https://carehalo360website.vercel.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

// Per-caller and blast-radius budgets. A real family fills one form once; these
// ceilings are far above legitimate use and far below what makes abuse worthwhile.
const PER_IP_LIMIT = 5;
const PER_IP_WINDOW_SECONDS = 600; // 5 submissions / 10 min / IP
const GLOBAL_LIMIT = 60;
const GLOBAL_WINDOW_SECONDS = 3600; // 60 submissions / hour, all callers

const DEFAULT_OWNER_EMAIL = "dawoodshabbir734@gmail.com";

function corsHeadersFor(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin);
  return {
    // Echo only a vetted origin; never reflect an arbitrary one.
    "Access-Control-Allow-Origin": allowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

// Slack mrkdwn treats <...|...> as a link and <!channel> as a mention. Escaping
// the three reserved characters neutralises both, so attacker-supplied text can
// never render as a clickable link or ping the channel.
function slackEscape(value: string): string {
  return value
    // Strip C0 and DEL control characters; keep normal whitespace.
    // deno-lint-ignore no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Single-line by default: newlines are collapsed so a caller cannot inject
// extra "*Email:* ..." lines and forge fields in the rendered Slack message.
// Only the free-form notes block opts into keeping its line breaks.
function field(raw: unknown, maxLength: number, multiline = false): string {
  if (raw === null || raw === undefined) return "";
  const escaped = slackEscape(String(raw));
  const normalised = multiline ? escaped : escaped.replace(/[\r\n]+/g, " ");
  return normalised.slice(0, maxLength).trim();
}

function jsonResponse(
  data: Record<string, unknown>,
  status: number,
  cors: Record<string, string>,
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // Left-most entry is the original client as seen by Supabase's edge.
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  return req.headers.get("cf-connecting-ip")?.slice(0, 64) ?? "unknown";
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeadersFor(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405, cors);
  }

  try {
    const webhook = Deno.env.get("SLACK_LEADS_WEBHOOK_URL");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!webhook || !supabaseUrl || !serviceKey) {
      console.error("notify-slack-lead: missing required environment variables");
      return jsonResponse(
        { ok: false, error: "Server configuration error" },
        500,
        cors,
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Rate limit before doing any outbound work. Fail CLOSED: if the limiter is
    // unavailable we refuse rather than fall back to the old unbounded path.
    // The lead row itself is already persisted by the caller before this runs,
    // so a refusal here costs a notification, never a lead.
    const ip = clientIp(req);
    const buckets: Array<[string, number, number]> = [
      [`slack-lead:ip:${ip}`, PER_IP_LIMIT, PER_IP_WINDOW_SECONDS],
      ["slack-lead:global", GLOBAL_LIMIT, GLOBAL_WINDOW_SECONDS],
    ];

    for (const [bucket, limit, windowSeconds] of buckets) {
      const { data: withinBudget, error } = await supabase.rpc(
        "check_rate_limit",
        {
          p_bucket: bucket,
          p_limit: limit,
          p_window_seconds: windowSeconds,
        },
      );

      if (error) {
        console.error("notify-slack-lead: rate limiter unavailable", {
          bucket,
          error,
        });
        return jsonResponse(
          { ok: false, error: "Service unavailable" },
          503,
          cors,
        );
      }

      if (withinBudget !== true) {
        console.warn("notify-slack-lead: rate limited", { bucket });
        return jsonResponse(
          { ok: false, error: "Too many requests" },
          429,
          cors,
        );
      }
    }

    const body = await req.json().catch(() => ({} as Record<string, unknown>));

    const source = field(body.source ?? "unknown", 40) || "unknown";
    const name = field(body.name ?? body.full_name, 120);
    const email = field(body.email, 200);
    const phone = field(body.phone, 60);
    const location = field(body.location, 200);
    const organization = field(body.organization, 200);
    const notes = field(body.notes, 2000, true);

    // Cap the number of free-form extras so a caller cannot pad the message.
    const extraSource = body.extra && typeof body.extra === "object"
      ? body.extra as Record<string, unknown>
      : {};
    const extra = Object.entries(extraSource).slice(0, 12);

    const lines = [
      `*New ${source} lead* :wave:`,
      name && `*Name:* ${name}`,
      email && `*Email:* ${email}`,
      phone && `*Phone:* ${phone}`,
      location && `*Location:* ${location}`,
      organization && `*Org:* ${organization}`,
      notes && `*Notes:*\n${notes}`,
      ...extra.map(([k, v]) => `*${field(k, 60)}:* ${field(v, 200)}`),
    ].filter(Boolean);

    const slackRes = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lines.join("\n") }),
    });

    if (!slackRes.ok) {
      const errText = await slackRes.text();
      console.error("Slack webhook error:", slackRes.status, errText);
    }

    // Owner notification via the transactional pipeline. Still uses the
    // service-role bearer to clear send-transactional-email's "recipient must be
    // a recent submitter" check — the owner never submits a form. That bypass is
    // now reachable only behind JWT verification and the budgets above.
    try {
      const ownerEmail = Deno.env.get("LEAD_OWNER_EMAIL") ?? DEFAULT_OWNER_EMAIL;

      // Hour-granular key: retries of the same submission collapse, while a
      // genuine second enquiry later in the day still sends.
      const hourBucket = new Date().toISOString().slice(0, 13);

      await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
        body: JSON.stringify({
          templateName: "lead-notification",
          recipientEmail: ownerEmail,
          idempotencyKey: `lead-${source}-${email}-${hourBucket}`,
          templateData: { source, name, email, phone, location, notes },
        }),
      }).catch((e) => console.error("lead-notification email error:", e));
    } catch (e) {
      console.error("owner email dispatch failed:", e);
    }

    return jsonResponse({ ok: true }, 200, cors);
  } catch (err) {
    console.error("notify-slack-lead error:", err);
    return jsonResponse({ ok: false, error: "Server error" }, 500, cors);
  }
});
