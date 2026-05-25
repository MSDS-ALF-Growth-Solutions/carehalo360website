import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 255 && EMAIL_REGEX.test(value.trim());
}

function sanitizeString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed.length > 0 ? trimmed : undefined;
}

function sanitizeAddress(input: unknown) {
  if (!input || typeof input !== "object") return undefined;
  const a = input as Record<string, unknown>;
  const line1 = sanitizeString(a.line1, 200);
  const line2 = sanitizeString(a.line2, 200);
  const city = sanitizeString(a.city, 100);
  const state = sanitizeString(a.state, 100);
  const postalCode = sanitizeString(a.postalCode, 20);
  const country = sanitizeString(a.country, 2) || "US";
  if (!line1 && !city && !state && !postalCode) return undefined;
  return { line1, line2, city, state, postal_code: postalCode, country };
}

function badRequest(message: string) {
  return new Response(JSON.stringify({ error: message }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 400,
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return badRequest("Invalid JSON body");
    }
    if (!body || typeof body !== "object") {
      return badRequest("Invalid request body");
    }

    const { email, name, address } = body as Record<string, unknown>;

    if (!isValidEmail(email)) {
      return badRequest("Please provide a valid email address");
    }
    if (name !== undefined && name !== null && typeof name !== "string") {
      return badRequest("Name must be a string");
    }

    const normalizedEmail = (email as string).toLowerCase().trim();
    const sanitizedName = sanitizeString(name, 100);
    const sanitizedAddress = sanitizeAddress(address);

    logStep("Request data validated", { email: normalizedEmail });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 });
    let customerId: string | undefined;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: normalizedEmail,
        name: sanitizedName,
        address: sanitizedAddress,
      });
      customerId = customer.id;
      logStep("New customer created", { customerId });
    }

    // Open-redirect protection: never trust the caller's Origin header.
    // Only echo it back into Stripe success/cancel URLs when it matches our allow-list.
    const ALLOWED_ORIGINS = new Set([
      "https://carehalo360.com",
      "https://www.carehalo360.com",
      "https://carehalo360website.lovable.app",
    ]);
    const requestOrigin = req.headers.get("origin") ?? "";
    const origin = ALLOWED_ORIGINS.has(requestOrigin)
      ? requestOrigin
      : "https://carehalo360.com";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: "price_1Ssn3xPlOAZwVLTu7F7Y7fzy",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/get-started?success=true`,
      cancel_url: `${origin}/get-started?canceled=true`,
      billing_address_collection: "auto",
      payment_method_types: ["card"],
    });

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: "Unable to start checkout. Please try again later." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
