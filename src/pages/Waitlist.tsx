import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { FadeInView } from "@/components/animations/MotionElements";
import heroImage from "@/assets/heroes/get-started-hero.jpg";

const schema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  role: z.string().trim().max(50).optional().or(z.literal("")),
  caring_for: z.string().trim().max(80).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

const ROLES = [
  "Family member",
  "Professional caregiver",
  "Care facility / staff",
  "Healthcare provider",
  "Other",
];

const CARING_FOR = [
  "Parent",
  "Spouse / partner",
  "Grandparent",
  "Other relative",
  "Client / patient",
  "Myself",
];

export default function Waitlist() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    caring_for: "",
    location: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || "Please check your details.");
      return;
    }
    setLoading(true);
    const d = parsed.data;
    const payload = {
      full_name: d.full_name,
      email: d.email,
      phone: d.phone || null,
      organization: d.organization || null,
      role: d.role || null,
      caring_for: d.caring_for || null,
      location: d.location || null,
      notes: d.notes || null,
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
    supabase.functions
      .invoke("send-transactional-email", {
        body: {
          templateName: "waitlist-confirmation",
          recipientEmail: payload.email,
          idempotencyKey: `waitlist-confirm-${payload.email}-${Date.now()}`,
          templateData: { name: payload.full_name },
        },
      })
      .catch(() => {});
    supabase.functions
      .invoke("notify-slack-lead", {
        body: {
          source: "waitlist",
          name: payload.full_name,
          email: payload.email,
          organization: payload.organization,
          extra: {
            phone: payload.phone || "—",
            role: payload.role || "—",
            caring_for: payload.caring_for || "—",
            location: payload.location || "—",
            notes: payload.notes || "—",
          },
        },
      })
      .catch(() => {});
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
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full name</Label>
                      <Input
                        id="full_name"
                        value={form.full_name}
                        onChange={(e) => update("full_name", e.target.value)}
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
                        onChange={(e) => update("email", e.target.value)}
                        required
                        maxLength={255}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        maxLength={30}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location (city, state)</Label>
                      <Input
                        id="location"
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        maxLength={120}
                        placeholder="e.g. Austin, TX"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">I am a...</Label>
                      <Select value={form.role} onValueChange={(v) => update("role", v)}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="caring_for">Caring for</Label>
                      <Select value={form.caring_for} onValueChange={(v) => update("caring_for", v)}>
                        <SelectTrigger id="caring_for">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {CARING_FOR.map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization (optional)</Label>
                    <Input
                      id="organization"
                      value={form.organization}
                      onChange={(e) => update("organization", e.target.value)}
                      maxLength={150}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Anything you'd like us to know? (optional)</Label>
                    <Textarea
                      id="notes"
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      maxLength={1000}
                      rows={4}
                      placeholder="Share your situation or what you're hoping CareHalo360 can help with."
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
