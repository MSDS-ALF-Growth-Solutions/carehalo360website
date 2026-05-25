import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OWNER_EMAIL = "dawoodshabbir734@gmail.com";

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
    const name = body.name || body.full_name ? String(body.name ?? body.full_name).slice(0, 120) : "";
    const email = body.email ? String(body.email).slice(0, 200) : "";
    const phone = body.phone ? String(body.phone).slice(0, 60) : "";
    const location = body.location ? String(body.location).slice(0, 200) : "";
    const organization = body.organization ? String(body.organization).slice(0, 200) : "";
    const notes = body.notes ? String(body.notes).slice(0, 2000) : "";
    const extra = body.extra && typeof body.extra === "object" ? body.extra as Record<string, unknown> : {};

    const lines = [
      `*New ${source} lead* :wave:`,
      name && `*Name:* ${name}`,
      email && `*Email:* ${email}`,
      phone && `*Phone:* ${phone}`,
      location && `*Location:* ${location}`,
      organization && `*Org:* ${organization}`,
      notes && `*Notes:*\n${notes}`,
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
    }

    // Also send a lead-notification email to the owner via the transactional pipeline.
    // Uses the service-role bearer so the anti-abuse "recipient must be in a recent
    // submission" check is bypassed.
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (supabaseUrl && serviceKey) {
        await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${serviceKey}`,
            apikey: serviceKey,
          },
          body: JSON.stringify({
            templateName: "lead-notification",
            recipientEmail: OWNER_EMAIL,
            idempotencyKey: `lead-${source}-${email}-${Date.now()}`,
            templateData: { source, name, email, phone, location, notes },
          }),
        }).catch((e) => console.error("lead-notification email error:", e));
      }
    } catch (e) {
      console.error("owner email dispatch failed:", e);
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
