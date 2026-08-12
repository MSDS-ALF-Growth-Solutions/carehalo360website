import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Stripe used to gate this endpoint: it looked the email up as a customer and
// refused anyone without an active subscription. Billing is now handled with
// manually issued payment links, so there is no Stripe customer list to check
// against. The rate limiter below replaces Stripe as the abuse control, and
// every request is reviewed by a human before a subscription is ended.
const PER_IP_LIMIT = 3;
const PER_IP_WINDOW_SECONDS = 600;
const GLOBAL_LIMIT = 40;
const GLOBAL_WINDOW_SECONDS = 3600;

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[REQUEST-CANCELLATION] ${step}${detailsStr}`);
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 255 && EMAIL_REGEX.test(value.trim());
}

function sanitizeString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed.length > 0 ? trimmed : null;
}

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });
}

function badRequest(message: string) {
  return jsonResponse({ error: message }, 400);
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return badRequest("Invalid JSON body");
    }

    if (!body || typeof body !== "object") {
      return badRequest("Invalid request body");
    }

    const { email, name, reason } = body as Record<string, unknown>;

    if (!isValidEmail(email)) {
      return badRequest("Please provide a valid email address");
    }

    if (name !== undefined && name !== null && typeof name !== "string") {
      return badRequest("Name must be a string");
    }
    if (reason !== undefined && reason !== null && typeof reason !== "string") {
      return badRequest("Reason must be a string");
    }

    const normalizedEmail = (email as string).toLowerCase().trim();
    const sanitizedName = sanitizeString(name, 100);
    const sanitizedReason = sanitizeString(reason, 1000);

    // Fail CLOSED. A cancellation that is refused here can be retried, or sent
    // by email per the cancellation promise. Silently accepting unbounded
    // writes would be worse.
    const ip = clientIp(req);
    const buckets: Array<[string, number, number]> = [
      [`cancel-request:ip:${ip}`, PER_IP_LIMIT, PER_IP_WINDOW_SECONDS],
      ["cancel-request:global", GLOBAL_LIMIT, GLOBAL_WINDOW_SECONDS],
    ];

    for (const [bucket, limit, windowSeconds] of buckets) {
      const { data: withinBudget, error } = await supabase.rpc("check_rate_limit", {
        p_bucket: bucket,
        p_limit: limit,
        p_window_seconds: windowSeconds,
      });

      if (error) {
        logStep("Rate limiter unavailable", { bucket, error: error.message });
        return jsonResponse(
          {
            error:
              "We could not process your request right now. Please try again shortly, or email support@carehalo360.com and we will cancel it for you.",
          },
          503,
        );
      }

      if (withinBudget !== true) {
        logStep("Rate limited", { bucket });
        return jsonResponse(
          {
            error:
              "Too many requests from this connection. Please wait a few minutes, or email support@carehalo360.com and we will cancel it for you.",
          },
          429,
        );
      }
    }

    logStep("Storing cancellation request", { email: normalizedEmail });

    const { error: insertError } = await supabase
      .from("cancellation_requests")
      .insert({
        email: normalizedEmail,
        name: sanitizedName,
        reason: sanitizedReason,
        status: "pending",
      });

    if (insertError) {
      logStep("Error storing request", { error: insertError.message });
      throw new Error("Failed to submit cancellation request");
    }

    logStep("Cancellation request stored successfully");

    return jsonResponse(
      {
        success: true,
        message: "Your cancellation request has been received. We'll process it shortly.",
      },
      200,
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return jsonResponse(
      { error: "An unexpected error occurred. Please try again later." },
      500,
    );
  }
});
