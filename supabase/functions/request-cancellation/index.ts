import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

function badRequest(message: string) {
  return new Response(
    JSON.stringify({ error: message }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

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

    logStep("Checking for active subscription", { email: normalizedEmail });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Generic response shared by every "not eligible" branch — prevents
    // attackers from enumerating which emails are Stripe customers.
    const GENERIC_NOT_FOUND = {
      error:
        "We could not process your request. Please check the email you used at signup or contact support if you need help.",
      found: false,
    };
    const notFoundResponse = () =>
      new Response(JSON.stringify(GENERIC_NOT_FOUND), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });

    const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 });

    if (customers.data.length === 0) {
      logStep("No customer found", { email: normalizedEmail });
      return notFoundResponse();
    }

    const customerId = customers.data[0].id;
    logStep("Customer found", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      logStep("No active subscription found", { customerId });
      return notFoundResponse();
    }

    logStep("Active subscription found, storing cancellation request");

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

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your cancellation request has been received. We'll process it shortly.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again later." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
