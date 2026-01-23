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

    const { email, name, reason } = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    logStep("Processing cancellation request", { email: normalizedEmail });

    // Try to verify with Stripe, but don't block if not found
    let verifiedInStripe = false;
    let stripeCustomerId = null;
    
    try {
      const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
      if (stripeKey) {
        const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
        const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 });
        
        if (customers.data.length > 0) {
          stripeCustomerId = customers.data[0].id;
          const subscriptions = await stripe.subscriptions.list({
            customer: stripeCustomerId,
            status: "active",
            limit: 1,
          });
          verifiedInStripe = subscriptions.data.length > 0;
          logStep("Stripe verification complete", { verified: verifiedInStripe, customerId: stripeCustomerId });
        } else {
          logStep("No Stripe customer found, will store request for manual review");
        }
      }
    } catch (stripeError) {
      logStep("Stripe verification failed, continuing anyway", { error: String(stripeError) });
    }

    // Always store the cancellation request for manual processing
    const { error: insertError } = await supabase
      .from("cancellation_requests")
      .insert({
        email: normalizedEmail,
        name: name || null,
        reason: reason || null,
        status: "pending",
        notes: verifiedInStripe 
          ? `Verified: Active subscription found (Customer: ${stripeCustomerId})`
          : "Needs manual verification - no active subscription found in Stripe",
      });

    if (insertError) {
      logStep("Error storing request", { error: insertError.message });
      throw new Error("Failed to submit cancellation request");
    }

    logStep("Cancellation request stored successfully", { verified: verifiedInStripe });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Your cancellation request has been received. We'll process it shortly."
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
