import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { FadeInView } from "@/components/animations/MotionElements";
import heroImage from "@/assets/heroes/get-started-hero.jpg";

const schema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
});

export default function Waitlist() {
  const [form, setForm] = useState({ full_name: "", email: "", organization: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || "Please check your details.");
      return;
    }
    setLoading(true);
    const payload = {
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      organization: parsed.data.organization || null,
    };
    const [{ error: dbError }] = await Promise.all([
      supabase.from("waitlist_signups").insert(payload),
      supabase.from("leads").insert({ ...payload, source: "waitlist" }),
    ]);
    setLoading(false);
    if (dbError) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Join the CareHalo360 Waitlist | Early Access</title>
        <meta
          name="description"
          content="Be among the first to experience CareHalo360 when we launch. Sign up to receive early access and updates."
        />
        <link rel="canonical" href="https://carehalo360.com/waitlist" />
      </Helmet>

      <Header />
      <main className="flex-1">
        <PageHero
          title="Join the CareHalo360 Waitlist"
          subtitle="Be among the first to experience CareHalo360 when we launch."
          description="Sign up to receive early access and updates."
          backgroundImage={heroImage}
        />

        <section className="section">
          <div className="container max-w-xl">
            <FadeInView>
              {submitted ? (
                <div className="care-card text-center">
                  <h2 className="mb-3">You're on the list.</h2>
                  <p className="text-muted-foreground">
                    Thank you for joining the CareHalo360 waitlist. We'll be in touch with early access details soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full name</Label>
                    <Input
                      id="full_name"
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      required
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      maxLength={255}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization (optional)</Label>
                    <Input
                      id="organization"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      maxLength={150}
                    />
                  </div>

                  {error && (
                    <div className="bg-secondary border border-border rounded-xl p-4">
                      <p className="text-sm text-foreground">{error}</p>
                    </div>
                  )}

                  <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
                    {loading ? "Submitting..." : "Join Waitlist"}
                  </Button>
                </form>
              )}
            </FadeInView>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
