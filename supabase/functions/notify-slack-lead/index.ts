import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const webhook = Deno.env.get("SLACK_LEADS_WEBHOOK_URL");
    if (!webhook) {
      return new Response(JSON.stringify({ ok: false, error: "Webhook not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const source = String(body.source ?? "unknown").slice(0, 40);
    const name = body.name ? String(body.name).slice(0, 120) : "";
    const email = body.email ? String(body.email).slice(0, 200) : "";
    const organization = body.organization ? String(body.organization).slice(0, 200) : "";
    const extra = body.extra && typeof body.extra === "object" ? body.extra as Record<string, unknown> : {};

    const lines = [
      `*New ${source} lead* :wave:`,
      name && `*Name:* ${name}`,
      email && `*Email:* ${email}`,
      organization && `*Org:* ${organization}`,
      ...Object.entries(extra).map(([k, v]) => `*${k}:* ${String(v).slice(0, 200)}`),
    ].filter(Boolean);

    const slackRes = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lines.join("\n") }),
    });

    if (!slackRes.ok) {
      const errText = await slackRes.text();
      console.error("Slack webhook error:", slackRes.status, errText);
      return new Response(JSON.stringify({ ok: false, error: "Slack delivery failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-slack-lead error:", err);
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
