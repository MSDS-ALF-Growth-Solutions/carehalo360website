import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/carehalo-logo.png";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
} as const;

const navLinks = [
  { href: "#why", label: "Why" },
  { href: "#problem", label: "Problem" },
  { href: "#product", label: "Product" },
  { href: "#dignity", label: "Dignity" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how", label: "How" },
  { href: "#apply", label: "Apply" },
];

export default function Founding() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Inter font
    const id = "inter-font-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Lora:ital@1&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const zip = String(fd.get("zip") || "").trim();
    const who = String(fd.get("who") || "").trim();
    const worry = String(fd.get("worry") || "").trim();
    const referred = String(fd.get("referred") || "").trim();

    if (!name || !phone || !email || !zip) {
      setErrorMsg("Please fill all required fields.");
      return;
    }
    if (!/^\d{5}$/.test(zip)) {
      setErrorMsg("ZIP must be 5 digits.");
      return;
    }

    setSubmitting(true);
    const notes = [
      worry ? `Worry: ${worry}` : null,
      referred ? `Referred by: ${referred}` : null,
      "Source: /founding",
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await supabase.from("waitlist_signups").insert({
      full_name: name,
      email,
      phone,
      location: zip,
      caring_for: who || null,
      notes,
      role: "founding-applicant",
    });

    if (error) {
      setSubmitting(false);
      setErrorMsg("Something went wrong. Please try again or text 832-497-7844.");
      return;
    }

    // Fire-and-forget notifications (don't block UX on failure)
    try {
      supabase.functions.invoke("notify-slack-lead", {
        body: { source: "founding", full_name: name, email, phone, location: zip, notes },
      });
      supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "waitlist-confirmation",
          recipientEmail: email,
          idempotencyKey: `founding-${email}-${Date.now()}`,
          templateData: { name },
        },
      });
    } catch {
      /* noop */
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div
      className="min-h-screen bg-white text-slate-900"
      style={{
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <Helmet>
        <title>Founding Family Pilot — CareHalo360</title>
        <meta
          name="description"
          content="CareHalo360 watches for falls without a wearable, without continuous video, without surveillance. Apply for a founding spot in the Houston-metro pilot."
        />
        <link rel="canonical" href="https://carehalo360.com/founding" />
      </Helmet>

      {/* Sticky anchor nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight text-lg">
            <img src={logo} alt="CareHalo360 logo" className="h-9 w-9 object-contain" />
            <span>CareHalo<span className="text-cyan-500">360</span></span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-slate-900 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#apply"
            className="hidden sm:inline-flex items-center px-4 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          >
            Apply
          </a>
        </div>
      </nav>

      {/* 1. HERO */}
      <section
        id="top"
        className="relative min-h-[100svh] flex items-center"
        style={{
          background:
            "linear-gradient(to bottom, #F8FAFC 0%, #FFFFFF 70%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 w-full">
          <motion.div {...fadeIn} className="max-w-4xl">
            <h1
              className="text-3xl sm:text-6xl font-extrabold leading-[1.02] md:text-[80px] md:leading-[0.98]"
              style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
            >
              Dad won't wear the pendant.
            </h1>
            <p className="mt-6 md:mt-8 text-lg md:text-xl max-w-2xl text-slate-900/70 leading-relaxed">
              Founding-family pilot now open.
            </p>
            <div className="mt-8 md:mt-10">
              <a
                href="#apply"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                style={{ fontSize: "1.5rem", padding: "1rem 2rem" }}
              >
                Apply for a founding spot
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-900/60">
              Houston metro · Founder installs personally · USPTO 64/055,823
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FOUNDER QUOTE */}
      <section id="why" className="py-16 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <blockquote
              className="text-3xl md:text-4xl leading-snug italic text-slate-900"
              style={{ fontFamily: "Lora, Georgia, serif" }}
            >
              "My grandfather had a serious fall in his care facility. It
              wasn't just the injury — it was knowing it could have been
              prevented. That moment became CareHalo360."
            </blockquote>
            <p className="mt-8 text-sm font-semibold tracking-wide text-slate-600">
              — Dawood Kokawala, Founder
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. PROBLEM */}
      <section id="problem" className="py-16 md:py-32 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold max-w-2xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Why nothing has worked so far
          </motion.h2>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Pendants get taken off",
                body: "And the fall happens at 3am, in the bathroom, without it.",
              },
              {
                title: "Cameras feel like surveillance",
                body: "Dad won't agree. Honestly, you don't want them either.",
              },
              {
                title: "Wellness calls come too late",
                body: "By then it's been hours.",
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.08 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mb-5">
                  <X className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-slate-600 text-[15px] leading-relaxed">
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUCT (dark) */}
      <section id="product" className="py-16 md:py-32 bg-[#0a0a0a] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold max-w-3xl text-white"
            style={{ letterSpacing: "-0.02em", color: "#ffffff" }}
          >
            Three states. Three images. Three channels.
          </motion.h2>

          <div className="mt-16 flex flex-col items-center gap-8 sm:grid sm:grid-cols-3 sm:gap-8">
            {[
              { color: "#10B981", label: "Watching, not recording" },
              { color: "#F59E0B", label: "3 images to your phone. Ack or escalate." },
              { color: "#EF4444", label: "Push, voice, and SMS — all three at once." },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="w-[80vw] max-w-[280px] aspect-square sm:w-40 sm:h-40 sm:max-w-none sm:aspect-auto rounded-full shadow-2xl"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${s.color}, ${s.color}cc 60%, ${s.color}66)`,
                    boxShadow: `0 0 60px ${s.color}55`,
                  }}
                  aria-hidden="true"
                />
                <p className="mt-6 text-base md:text-lg font-semibold max-w-[260px] text-white/90">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="mt-20 max-w-[360px] mx-auto">
            <div className="aspect-[9/16] rounded-xl overflow-hidden shadow-2xl bg-black ring-1 ring-white/10">
              <video
                src="/demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
                aria-label="CareHalo360 demo video showing a fall detection and notification"
              />
            </div>
            <p className="mt-4 text-center text-sm text-white/60">
              Real demo. Real call. Real SMS. 30 seconds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. WHAT WE ARE NOT */}
      <section id="dignity" className="py-16 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold"
            style={{ letterSpacing: "-0.02em" }}
          >
            What we're not
          </motion.h2>
          <ul className="mt-12 space-y-6">
            {[
              { lead: "Not a pendant.", body: "Nothing to wear." },
              {
                lead: "Not continuous video.",
                body: "3 still frames only when something happens.",
              },
              { lead: "Not a microphone.", body: "We don't listen." },
              {
                lead: "Not a fall pad.",
                body: "We don't wait until they're already on the floor.",
              },
            ].map((row, i) => (
              <motion.li
                key={row.lead}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.06 }}
                className="flex items-start gap-4 py-2"
              >
                <span
                  className="mt-1 w-7 h-7 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 flex-shrink-0"
                  aria-hidden="true"
                >
                  <X className="w-4 h-4" />
                </span>
                <p className="text-lg md:text-xl">
                  <span className="font-bold text-slate-900">{row.lead}</span>{" "}
                  <span className="text-slate-600">{row.body}</span>
                </p>
              </motion.li>
            ))}
          </ul>
          <motion.p
            {...fadeIn}
            className="mt-16 text-center text-xl md:text-2xl italic text-slate-900"
            style={{ fontFamily: "Lora, Georgia, serif" }}
          >
            Dignity isn't optional. It's the point.
          </motion.p>
        </div>
      </section>

      {/* 6. FOUNDING OFFER */}
      <section id="pricing" className="py-16 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeIn} className="flex justify-center mb-6">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold tracking-wider uppercase">
              Founding Family Pilot
            </span>
          </motion.div>
          <motion.div
            {...fadeIn}
            className="relative mx-auto max-w-[520px] rounded-2xl border-2 border-cyan-500 shadow-2xl p-8 md:p-10 overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, #ecfeff 0%, #ffffff 70%)",
            }}
          >
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              CareHalo360 Device · one-time
            </p>
            <p
              className="mt-2 text-4xl md:text-5xl font-extrabold text-cyan-500"
              style={{ letterSpacing: "-0.03em" }}
            >
              $249
            </p>
            <div className="my-6 border-t border-dashed border-slate-300" />
            <p
              className="text-4xl md:text-5xl font-extrabold text-amber-500 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              $0 / month
            </p>
            <p className="mt-1 text-base font-semibold text-slate-700">
              for the first 3 months
            </p>
            <p className="mt-3 text-slate-600">
              Then $39 / month, locked forever for founding members.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "90-day money-back on subscription",
                "Founder installs personally",
                "Only 50 founding spots, ever",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-slate-800">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-amber-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              48 of 50 founding spots remaining
            </div>
            <p className="mt-6 text-sm italic text-slate-500 leading-relaxed">
              In exchange: honest feedback + a 60-second video review at day 30.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. HOW IT STARTS */}
      <section id="how" className="py-16 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold"
            style={{ letterSpacing: "-0.02em" }}
          >
            Three steps
          </motion.h2>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { n: "1", t: "Apply", b: "Fill the form below." },
              { n: "2", t: "Brief call", b: "15 minutes with Dawood." },
              {
                n: "3",
                t: "Install",
                b: "He drives out and sets it up in 30 minutes.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.08 }}
                className="rounded-2xl border border-slate-200 p-8 bg-white"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 font-bold">
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-slate-600">{s.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7b. DOCTOR REFERRAL */}
      <section className="py-10 md:py-14 bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h3
            {...fadeIn}
            className="text-2xl md:text-3xl font-extrabold text-slate-900"
            style={{ letterSpacing: "-0.02em" }}
          >
            Referred by a doctor?
          </motion.h3>
          <motion.p {...fadeIn} className="mt-4 text-slate-600 max-w-xl mx-auto leading-relaxed">
            Mention their name in the form below. We'll send them a thank-you
            and a monthly note of which patients enrolled — no PHI shared,
            just the count.
          </motion.p>
        </div>
      </section>

      {/* 8. APPLY FORM (dark) */}
      <section id="apply" className="py-16 md:py-32 bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold text-white"
            style={{ letterSpacing: "-0.02em", color: "#ffffff" }}
          >
            Apply for a founding spot
          </motion.h2>
          <motion.p {...fadeIn} className="mt-5 text-white/70 max-w-xl">
            Founding cohort capped at 50 families. Your info goes only to
            Dawood — no marketing list.
          </motion.p>

          <motion.div {...fadeIn} className="mt-12 max-w-[520px]">
            {submitted ? (
              <div
                className="rounded-2xl bg-emerald-500/10 border border-emerald-500/40 p-8 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500 mx-auto flex items-center justify-center">
                  <Check className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <p className="mt-5 text-lg font-semibold">
                  Got it. Dawood will text you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 bg-white text-slate-900 rounded-2xl p-7 md:p-8 shadow-2xl"
              >
                <Field id="name" label="Your name" type="text" required autoComplete="name" />
                <Field id="phone" label="Phone" type="tel" required autoComplete="tel" />
                <Field id="email" label="Email" type="email" required autoComplete="email" />
                <Field
                  id="zip"
                  label="ZIP code"
                  type="text"
                  required
                  inputMode="numeric"
                  pattern="\d{5}"
                  maxLength={5}
                  autoComplete="postal-code"
                />

                <fieldset>
                  <legend className="block text-sm font-semibold text-slate-800 mb-2">
                    Who is this for?
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {["Parent", "Spouse", "Myself", "Other"].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 has-[:checked]:bg-cyan-50 has-[:checked]:border-cyan-500 transition-colors"
                      >
                        <input
                          type="radio"
                          name="who"
                          value={opt}
                          className="accent-cyan-500"
                        />
                        <span className="text-sm font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="worry"
                    className="block text-sm font-semibold text-slate-800 mb-2"
                  >
                    What worried you enough to look today?{" "}
                    <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="worry"
                    name="worry"
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>

                <Field
                  id="referred"
                  name="referred"
                  label="Referred by a doctor?"
                  type="text"
                  optional
                  placeholder="Doctor's name"
                />

                {errorMsg && (
                  <p
                    role="alert"
                    aria-live="assertive"
                    className="text-sm text-red-600 font-medium"
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                >
                  {submitting ? "Sending…" : "Apply now"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 pt-14 pb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* 911 disclaimer banner */}
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
            <p style={{ color: "#fde68a" }}>
              <span className="font-semibold" style={{ color: "#fcd34d" }}>Important:</span>{" "}
              CareHalo360 is not a medical device and is not a substitute for
              emergency services. In a life-threatening emergency, always call{" "}
              <a href="tel:911" className="underline font-semibold" style={{ color: "#fef3c7" }}>911</a>.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-4 gap-10 text-sm">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <img src={logo} alt="CareHalo360 logo" className="h-10 w-10 object-contain" />
                <p className="font-semibold" style={{ color: "#ffffff" }}>
                  CareHalo360 by MSDS ALF Growth Solutions Inc.
                </p>
              </div>
              <p className="mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                MSDS ALF Growth Solutions Inc.
                <br />
                Houston, TX 77001
              </p>
              <p className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                USPTO 64/055,823 · Patent Pending
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <p className="font-semibold" style={{ color: "#ffffff" }}>Contact</p>
              <p>
                <a href="tel:+18324977844" className="hover:text-white" style={{ color: "rgba(255,255,255,0.85)" }}>
                  832-497-7844
                </a>
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Mon–Fri, 9am–6pm CT</p>
              <p>
                <a href="mailto:dawoodk@carehalo360.com" className="hover:text-white break-all" style={{ color: "rgba(255,255,255,0.85)" }}>
                  dawoodk@carehalo360.com
                </a>
              </p>
              <p className="pt-2">
                <a
                  href="https://www.linkedin.com/company/carehalo360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  LinkedIn ↗
                </a>
              </p>
            </div>

            {/* Legal */}
            <div className="space-y-2">
              <p className="font-semibold" style={{ color: "#ffffff" }}>Legal</p>
              <ul className="space-y-2">
                {[
                  { href: "/privacy-policy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms" },
                  { href: "/sms-terms", label: "SMS Terms" },
                  { href: "/accessibility", label: "Accessibility" },
                  { href: "/disclaimer", label: "Disclaimer" },
                  { href: "/support", label: "Support" },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-white" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-xs flex flex-col md:flex-row md:justify-between gap-2" style={{ color: "rgba(255,255,255,0.55)" }}>
            <p style={{ color: "rgba(255,255,255,0.55)" }}>© 2026 MSDS ALF Growth Solutions Inc. All rights reserved.</p>
            <p style={{ color: "rgba(255,255,255,0.55)" }}>Made in Houston, TX</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FieldProps {
  id: string;
  name?: string;
  label: string;
  type: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "tel" | "email";
  pattern?: string;
  maxLength?: number;
  placeholder?: string;
}

function Field({
  id,
  name,
  label,
  type,
  required,
  optional,
  autoComplete,
  inputMode,
  pattern,
  maxLength,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-800 mb-2"
      >
        {label}{" "}
        {optional && (
          <span className="text-slate-400 font-normal">(optional)</span>
        )}
      </label>
      <input
        id={id}
        name={name ?? id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
      />
    </div>
  );
}
