import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Check, ShieldCheck, MessageSquare, Clock } from "lucide-react";
import { FadeInView, HeroAnimation, HeroItem } from "@/components/animations/MotionElements";

const PLANS = [
  { value: "monthly", label: "Monthly — $79/month" },
  { value: "annual", label: "Annual — $790/year (save $158)" },
  { value: "founding", label: "I'd like to ask about the founding rate" },
  { value: "unsure", label: "Not sure yet — help me decide" },
];

export default function GetStarted() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const zip = String(fd.get("zip") || "").trim();
    const plan = String(fd.get("plan") || "").trim();
    const note = String(fd.get("note") || "").trim();

    if (!name || !email || !phone) {
      setErrorMsg("Please add your name, email, and phone so we can reach you.");
      return;
    }
    if (zip && !/^\d{5}$/.test(zip)) {
      setErrorMsg("ZIP must be 5 digits.");
      return;
    }

    setSubmitting(true);

    const planLabel = PLANS.find((p) => p.value === plan)?.label || "Not specified";
    const notes = [
      "REQUEST: payment link",
      `Plan interest: ${planLabel}`,
      note ? `Note: ${note}` : null,
      "Source: /get-started",
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await supabase.from("waitlist_signups").insert({
      full_name: name,
      email,
      phone,
      location: zip || null,
      notes,
      role: "payment-link-request",
    });

    if (error) {
      setSubmitting(false);
      setErrorMsg("Something went wrong. Please try again, or text us at 713-517-6792.");
      return;
    }

    try {
      supabase.functions.invoke("notify-slack-lead", {
        body: { source: "get-started", full_name: name, email, phone, location: zip, notes },
      });
    } catch {
      /* noop */
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Get Started with CareHalo360 | Request Your Payment Link</title>
        <meta
          name="description"
          content="No shopping cart. Tell us where to send your secure payment link and we'll reply within one business day with the exact price and what happens next."
        />
        <meta property="og:title" content="Get Started with CareHalo360" />
        <meta
          property="og:description"
          content="Request a secure payment link. We'll confirm the price and the plan before anything is charged."
        />
        <link rel="canonical" href="https://carehalo360.com/get-started" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <HeroAnimation className="text-center mb-10">
                <HeroItem>
                  <h1 className="mb-6">No shopping cart. On purpose.</h1>
                </HeroItem>
                <HeroItem>
                  <div className="text-lg space-y-4 text-left">
                    <p>
                      You're deciding whether to put a device in your mother's house. That is not a
                      thing you should be able to do at 11pm with a saved credit card and no one
                      answering the phone.
                    </p>
                    <p>
                      So we took the checkout button out. Every family who signs up talks to a human
                      first — the founder, usually within a day.
                    </p>
                    <p className="font-semibold text-foreground">
                      Tell us where to send the payment link. We'll reply with the exact price, the
                      plan, and what happens the week after you say yes.
                    </p>
                    <p>
                      Nothing is charged until you click a link you asked for. If it turns out
                      CareHalo360 isn't right for your parent's home, we'll say so.
                    </p>
                  </div>
                </HeroItem>
              </HeroAnimation>

              {submitted ? (
                <FadeInView>
                  <div
                    className="care-card text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-5">
                      <Check className="w-7 h-7 text-primary" aria-hidden="true" />
                    </div>
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Got it. Your payment link is on its way.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Dawood will email you within one business day with a secure link, the exact
                      price, and answers to anything you asked. Nothing has been charged.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      In a hurry? Text{" "}
                      <a href="sms:+17135176792" className="font-medium text-foreground underline underline-offset-2">
                        713-517-6792
                      </a>{" "}
                      and say you're waiting on a link.
                    </p>
                  </div>
                </FadeInView>
              ) : (
                <FadeInView delay={0.1}>
                  <form onSubmit={handleSubmit} noValidate className="care-card space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your name</Label>
                        <Input id="name" name="name" autoComplete="name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" autoComplete="tel" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email (where the link goes)</Label>
                      <Input id="email" name="email" type="email" autoComplete="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zip">
                        ZIP code <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <Input id="zip" name="zip" inputMode="numeric" maxLength={5} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="plan">Which plan are you leaning toward?</Label>
                      <select
                        id="plan"
                        name="plan"
                        defaultValue="monthly"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {PLANS.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="note">
                        Anything we should know?{" "}
                        <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <textarea
                        id="note"
                        name="note"
                        rows={3}
                        placeholder="Which room you're thinking about, who else needs alerts, what worries you most."
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                    </div>

                    {errorMsg && (
                      <p role="alert" aria-live="assertive" className="text-sm text-destructive font-medium">
                        {errorMsg}
                      </p>
                    )}

                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                      {submitting ? "Sending…" : "Send me the payment link"}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      No card required on this page. Nothing is charged until you open the link we
                      send and choose to pay.
                    </p>
                  </form>
                </FadeInView>
              )}

              <FadeInView delay={0.2}>
                <div className="grid sm:grid-cols-3 gap-5 mt-10">
                  {[
                    { icon: Clock, t: "One business day", b: "That's our reply window. Usually much faster." },
                    { icon: ShieldCheck, t: "Secure payment", b: "The link we send is processed by Stripe. We never see your card." },
                    { icon: MessageSquare, t: "A real person", b: "You'll be talking to the founder, not a sales team." },
                  ].map((i) => (
                    <div key={i.t} className="text-center">
                      <i.icon className="w-6 h-6 text-primary mx-auto mb-3" aria-hidden="true" />
                      <p className="font-semibold text-foreground text-sm">{i.t}</p>
                      <p className="text-sm text-muted-foreground mt-1">{i.b}</p>
                    </div>
                  ))}
                </div>
              </FadeInView>

              <FadeInView delay={0.3}>
                <p className="text-center text-muted-foreground mt-10">
                  Still comparing?{" "}
                  <Link to="/pricing" className="font-medium text-foreground underline underline-offset-2">
                    See what's included
                  </Link>{" "}
                  or{" "}
                  <Link to="/founding" className="font-medium text-foreground underline underline-offset-2">
                    ask about the founding rate
                  </Link>
                  .
                </p>
              </FadeInView>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
