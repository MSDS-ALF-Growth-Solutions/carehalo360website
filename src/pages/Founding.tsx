import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/carehalo-logo.png";
import heroImage from "@/assets/founding-hero.jpg";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
} as const;

const navLinks = [
  { href: "#privacy", label: "Privacy" },
  { href: "#who", label: "Who it's for" },
  { href: "#how", label: "How" },
  { href: "#offer", label: "Offer" },
  { href: "#faq", label: "FAQ" },
  { href: "#apply", label: "Apply" },
];

export default function Founding() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
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
    const state = String(fd.get("state") || "").trim();
    const wifi = String(fd.get("wifi") || "").trim();
    const access = String(fd.get("access") || "").trim();
    const worry = String(fd.get("worry") || "").trim();
    const referred = String(fd.get("referred") || "").trim();

    if (!name || !phone || !email || !zip || !state || !wifi || !access) {
      setErrorMsg("Please fill all required fields.");
      return;
    }
    if (!/^\d{5}$/.test(zip)) {
      setErrorMsg("ZIP must be 5 digits.");
      return;
    }

    setSubmitting(true);

    const qualified =
      state === "Texas" && wifi === "Yes" && access === "Yes" ? "YES" : "NEEDS REVIEW";

    const notes = [
      `QUALIFIED: ${qualified}`,
      `In Texas: ${state}`,
      `Reliable Wi-Fi: ${wifi}`,
      `Easy founder install access: ${access}`,
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
      location: `${zip}${state ? ` · ${state}` : ""}`,
      caring_for: who || null,
      notes,
      role: qualified === "YES" ? "founding-qualified" : "founding-review",
    });

    if (error) {
      setSubmitting(false);
      setErrorMsg("Something went wrong. Please try again or text 832-497-7844.");
      return;
    }

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
        <title>CareHalo360 — Founding Family Waitlist (Texas, 20 spots)</title>
        <meta
          name="description"
          content="She falls. You know in seconds. CareHalo360 is a small wall-mounted fall detector — no wearable, no recorded video. Apply for one of 20 Texas Founding Family spots."
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
            className="hidden sm:inline-flex items-center px-4 h-10 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-sm transition-colors"
          >
            Apply
          </a>
        </div>
      </nav>

      {/* 1. HERO */}
      <section
        id="top"
        className="relative min-h-[80svh] flex items-center"
        style={{ background: "linear-gradient(to bottom, #F8FAFC 0%, #FFFFFF 70%)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 w-full">
          <motion.div {...fadeIn} className="max-w-4xl">
            <h1
              className="text-4xl sm:text-6xl font-extrabold leading-[1.02] md:text-[80px] md:leading-[0.98]"
              style={{ letterSpacing: "-0.02em", fontWeight: 800 }}
            >
              She falls. You know in seconds. Even at 3am.
            </h1>
            <p className="mt-6 md:mt-8 text-lg md:text-xl max-w-2xl text-slate-900/70 leading-relaxed">
              CareHalo360 is a small wall-mounted device that watches the room your parent
              spends the most time in — and alerts you within seconds of a fall. No wearable.
              No button. Nothing she has to remember.
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Detects falls in seconds</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> No video stored. Ever.</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Built in Texas — launching with 20 families first</li>
            </ul>

            <div className="mt-8 md:mt-10">
              <a
                href="#apply"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={{ fontSize: "1.25rem", padding: "1rem 2rem" }}
              >
                Reserve Your Founding Spot — Texas Only
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-900/60">
              20 spots. Founding price locked forever ($299/yr or $45/mo, vs. $79/mo public launch).
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. PRIVACY PROOF */}
      <section id="privacy" className="py-12 md:py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold"
            style={{ letterSpacing: "-0.02em" }}
          >
            A camera that respects her dignity.
          </motion.h2>
          <motion.div {...fadeIn} className="mt-8 space-y-5 text-lg text-slate-700 leading-relaxed max-w-3xl">
            <p>Every other home camera on the market streams video to the cloud, all day, every day.</p>
            <p className="font-semibold text-slate-900">CareHalo360 doesn't.</p>
            <p>
              The AI runs <strong>on the device itself.</strong> Nothing is recorded. Nothing
              is streamed. The only data that ever leaves Mom's house is <strong>3 blurred
              snapshots at the exact moment a fall is detected</strong> — so you can see how
              serious it looks and decide what to do next.
            </p>
            <p>Those 3 images are <strong>auto-deleted after 7 days.</strong> That's it. Nothing else is captured. Ever.</p>
          </motion.div>

          <motion.div {...fadeIn} className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Traditional cameras</p>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li className="flex gap-2"><X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Streams video 24/7</li>
                <li className="flex gap-2"><X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Stores recordings indefinitely</li>
                <li className="flex gap-2"><X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Anyone with login can watch</li>
                <li className="flex gap-2"><X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> Cloud-processed AI</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-cyan-500 bg-cyan-50/40 p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-cyan-700">CareHalo360</p>
              <ul className="mt-4 space-y-3 text-slate-800">
                <li className="flex gap-2"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> Streams NOTHING in normal use</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> Only 3 blurred frames at moment of fall</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> No one watches. No one can.</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> On-device AI</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. PRODUCT — three states + demo */}
      <section className="py-12 md:py-20 bg-[#0a0a0a] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold max-w-3xl text-white"
            style={{ letterSpacing: "-0.02em", color: "#ffffff" }}
          >
            Three states. Three images. Three channels.
          </motion.h2>

          <div className="mt-16 flex flex-col items-center gap-10 sm:grid sm:grid-cols-3 sm:gap-8">
            {[
              { color: "#10B981", tag: "GREEN", label: "Dad's moving normally. We're watching, not recording." },
              { color: "#F59E0B", tag: "YELLOW", label: "Something unusual. AI confirming before alerting. No false alarms." },
              { color: "#EF4444", tag: "RED", label: "Confirmed fall. 3 still images sent. Push notification, phone call, and SMS — all fire together." },
            ].map((s, i) => (
              <motion.div
                key={s.tag}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="w-[70vw] max-w-[240px] aspect-square sm:w-40 sm:h-40 sm:max-w-none sm:aspect-auto rounded-full shadow-2xl"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${s.color}, ${s.color}cc 60%, ${s.color}66)`,
                    boxShadow: `0 0 60px ${s.color}55`,
                  }}
                  aria-hidden="true"
                />
                <p className="mt-6 text-sm font-bold tracking-widest" style={{ color: s.color, letterSpacing: "0.15em" }}>
                  {s.tag}
                </p>
                <p className="mt-2 text-base md:text-lg font-medium max-w-[280px] text-white/90">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="mt-20 max-w-[360px] mx-auto">
            <div className="aspect-[9/16] rounded-xl overflow-hidden shadow-2xl bg-black ring-1 ring-white/10">
              <video
                src="/demo.mp4"
                muted
                playsInline
                controls
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

      {/* 4. WHO IT'S FOR */}
      <section id="who" className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold"
            style={{ letterSpacing: "-0.02em" }}
          >
            Built for you. <span className="text-slate-500 font-extrabold">The daughter who can't stop checking her phone.</span>
          </motion.h2>
          <motion.p {...fadeIn} className="mt-8 text-lg text-slate-700">
            If you're caring for a parent who:
          </motion.p>
          <motion.ul {...fadeIn} className="mt-5 space-y-3 text-lg text-slate-700">
            {[
              "Lives alone (or with a spouse who can't physically help in an emergency)",
              "Had a recent fall, hospital stay, or new diagnosis",
              "Refuses to wear a Lifeline pendant — or wears it but never charges it",
              "Lives more than 20 minutes from you",
            ].map((b) => (
              <li key={b} className="flex gap-3">
                <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1.5" />
                <span>{b}</span>
              </li>
            ))}
          </motion.ul>
          <motion.p {...fadeIn} className="mt-8 text-lg text-slate-700">
            …and if you've ever lain awake wondering <em>"what if she fell tonight and I didn't know"</em> —
          </motion.p>
          <motion.p {...fadeIn} className="mt-3 text-xl font-bold text-slate-900">
            This is what we built. For you.
          </motion.p>

          <motion.blockquote
            {...fadeIn}
            className="mt-14 border-l-4 border-cyan-500 pl-6 text-xl md:text-2xl italic text-slate-800"
            style={{ fontFamily: "Lora, Georgia, serif" }}
          >
            "I worry 24/7 and can't enjoy myself because I'm preoccupied with how to handle her issues."
            <footer className="mt-3 text-sm not-italic text-slate-500 font-sans">
              — Adult caregiver, AgingCare.com forum
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how" className="py-12 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-5xl font-extrabold"
            style={{ letterSpacing: "-0.02em" }}
          >
            Three steps. Fifteen minutes. Done.
          </motion.h2>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                t: "It arrives at your door",
                b: "We ship the device to YOU, not your parent. Bring it on your next visit (you were probably planning one anyway).",
              },
              {
                n: "2",
                t: "You install it in 15 minutes",
                b: "One screw, 6 feet high, in the room she spends the most time in. We pre-pair it to your phone. The app walks you through Wi-Fi setup and a 10-second walk test.",
              },
              {
                n: "3",
                t: "You go home and sleep",
                b: "If she falls, you get an alert within seconds — phone call, text, and email. Tap to acknowledge. Decide what to do next. We never call 911 on our own.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.08 }}
                className="rounded-2xl border border-slate-200 p-7 bg-white"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 font-bold">
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{s.b}</p>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeIn} className="mt-12 text-center text-lg italic text-slate-600 max-w-3xl mx-auto" style={{ fontFamily: "Lora, Georgia, serif" }}>
            "It works alongside your phone, your sibling's phone, and any care plan you already have. It doesn't replace anyone. It just makes sure no fall goes unnoticed."
          </motion.p>
        </div>
      </section>

      {/* 6. OFFER */}
      <section id="offer" className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeIn} className="flex justify-center mb-6">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold tracking-wider uppercase">
              Founding Family Program · 20 Texas Families
            </span>
          </motion.div>
          <motion.h2
            {...fadeIn}
            className="text-3xl md:text-5xl font-extrabold text-center max-w-3xl mx-auto"
            style={{ letterSpacing: "-0.02em" }}
          >
            The Founding Family Program — for the first 20 Texas families.
          </motion.h2>

          <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* PIF */}
            <motion.div
              {...fadeIn}
              className="relative rounded-2xl border-2 border-cyan-500 shadow-xl p-8 bg-white"
              style={{ background: "radial-gradient(circle at 50% 0%, #ecfeff 0%, #ffffff 70%)" }}
            >
              <span className="absolute -top-3 right-6 inline-flex items-center px-3 py-1 rounded-full bg-cyan-500 text-white text-[11px] font-bold tracking-wider uppercase">
                Most Popular
              </span>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                Paid in full
              </p>
              <p className="mt-2 text-5xl font-extrabold text-cyan-600" style={{ letterSpacing: "-0.03em" }}>
                $299<span className="text-2xl text-slate-500 font-bold">/year</span>
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Save $241 vs. monthly. Founding price locked forever.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Public launch: $948/yr. You save $649.
              </p>
            </motion.div>

            {/* Monthly */}
            <motion.div
              {...fadeIn}
              className="rounded-2xl border border-slate-200 shadow-sm p-8 bg-white"
            >
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                Monthly
              </p>
              <p className="mt-2 text-5xl font-extrabold text-slate-900" style={{ letterSpacing: "-0.03em" }}>
                $45<span className="text-2xl text-slate-500 font-bold">/mo</span>
              </p>
              <p className="mt-2 text-sm text-slate-600">
                No long-term commitment. Cancel in one tap, anytime.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Public launch: $79/mo. You save $34/mo forever.
              </p>
            </motion.div>
          </div>

          {/* Included */}
          <motion.div {...fadeIn} className="mt-12 max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-7 md:p-8">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">What's included (either option)</p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {[
                "The CareHalo360 device + companion app",
                "Multi-channel alerts (phone, text, email)",
                "White-glove installation video walkthrough",
                "Weekly 15-min check-in call with the founder for 60 days",
                "Direct text-line to the founder during founding period",
                "All future software updates, free, forever",
                "Founding price locked permanently — never increases",
              ].map((i) => (
                <li key={i} className="flex gap-2 text-slate-800">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Guarantees */}
          <motion.div {...fadeIn} className="mt-10 grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { t: "14-Day Sleep-Better Guarantee", b: "If you don't feel a shift in how you're sleeping within 14 days, full refund. Keep the device." },
              { t: "Multi-Channel Alert Guarantee", b: "If our system ever fails to notify you of a confirmed fall during your first year, full year refunded." },
              { t: "Cancel-in-One-Tap Promise", b: "Monthly plans cancel from inside the app in one tap. No phone calls. No retention scripts." },
            ].map((g) => (
              <div key={g.t} className="rounded-xl border border-slate-200 p-6 bg-white">
                <p className="text-sm font-bold text-cyan-600 uppercase tracking-wider">{g.t}</p>
                <p className="mt-3 text-slate-700 text-sm leading-relaxed">{g.b}</p>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeIn} className="mt-12 text-center">
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ fontSize: "1.25rem", padding: "1rem 2rem" }}
            >
              Apply for a Founding Spot →
            </a>
            <p className="mt-3 text-xs text-slate-500">
              No payment on this page. We'll qualify you on a quick call first.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. SCARCITY */}
      <section className="py-12 md:py-20 bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2 {...fadeIn} className="text-3xl md:text-5xl font-extrabold text-white" style={{ letterSpacing: "-0.02em", color: "#ffffff" }}>
            20 spots. Texas only.
          </motion.h2>
          <motion.div {...fadeIn} className="mt-6 space-y-4 text-white/80 text-lg leading-relaxed">
            <p>
              We chose 20 because that's how many families our founder can personally onboard — with a white-glove
              install walkthrough and weekly check-in calls for the full 60-day beta.
            </p>
            <p>
              Once those 20 spots are taken, the founding price (and the founder-led support) goes away forever.
              After that, the public waitlist opens at $79/month.
            </p>
            <p className="text-white font-semibold">
              If you're in Texas and your parent's situation makes you nervous, claim a spot now.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section id="faq" className="py-12 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-4xl md:text-5xl font-extrabold" style={{ letterSpacing: "-0.02em" }}>
            Questions, answered honestly.
          </motion.h2>
          <div className="mt-12 space-y-6">
            {[
              { q: "Is the camera always watching her?", a: "The AI is always processing what it sees — but nothing is ever recorded or streamed. The only data that ever leaves the device is 3 blurred snapshots at the moment of a fall. Those 3 images auto-delete after 7 days. That's the entire data footprint." },
              { q: "What if my mom doesn't have good Wi-Fi?", a: "CareHalo360 requires Wi-Fi to send alerts. If your parent's Wi-Fi is unreliable, get on a call with us before you order — we'll walk through your options (mesh router, T-Mobile/Verizon Home Internet, or a small puck we recommend). We'd rather pause your order than ship a device that won't work in her home." },
              { q: "It only covers one room. What about the bathroom?", a: "True. One device covers one room. Most falls happen in the bathroom, bedroom, or kitchen. Start with the room she spends 80% of her time in — usually the living room or bedroom — and add a second device for the bathroom after. Founding Families get $100 off the second device anytime in Year 1." },
              { q: "Does it call 911?", a: "No — by design. Most 'automatic 911' devices have public records of false dispatches that cost families thousands. CareHalo360 alerts you (and any other caregivers you've set up) within seconds. You decide what to do next. You stay in control. Always." },
              { q: "Will my mom feel like she's being spied on?", a: "There's no video — nothing is recorded or watched. You can show her the system: there's literally no feed to look at. It's a fall detector, not a surveillance camera." },
              { q: "Why is it Texas-only?", a: "We're a Texas company. Our founder can drive to any beta customer in the state if something needs to be fixed in person. Once we've worked with the first 20 families and refined everything, we'll expand to neighboring states — but the Founding Family price ends when we open to a second state." },
              { q: "What happens after the beta?", a: "Founding Family pricing is locked permanently. You will NEVER pay more than $299/year ($45/month if you chose monthly), for as long as you stay subscribed. Even if you cancel and come back later, your founding price is reinstated." },
              { q: "How accurate is the fall detection?", a: "CareHalo360 is designed to detect falls within its line-of-sight zone using computer vision, with typical detection times of 2–5 seconds in normal indoor lighting. No fall-detection system is 100% perfect. CareHalo360 is designed to work alongside — not replace — phones, in-person check-ins, and other safety systems. It is not a medical device and does not call emergency services on your behalf." },
            ].map((f, i) => (
              <motion.details
                key={f.q}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.04 }}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-slate-900 text-lg">
                  <span>{f.q}</span>
                  <span className="text-cyan-500 text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. APPLY FORM (qualifier) */}
      <section id="apply" className="py-12 md:py-20 bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-4xl md:text-5xl font-extrabold text-white" style={{ letterSpacing: "-0.02em", color: "#ffffff" }}>
            Apply for a Founding Spot
          </motion.h2>
          <motion.p {...fadeIn} className="mt-5 text-white/70 max-w-xl">
            Three quick qualifying questions, then we'll book a 15-minute call with the founder.
            <strong className="text-white"> No payment on this page</strong> — billing happens after we confirm fit on the call.
          </motion.p>

          <motion.div {...fadeIn} className="mt-12 max-w-[560px]">
            {submitted ? (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/40 p-8 text-center" role="status" aria-live="polite">
                <div className="w-14 h-14 rounded-full bg-emerald-500 mx-auto flex items-center justify-center">
                  <Check className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <p className="mt-5 text-lg font-semibold">
                  Got it. Dawood will text you within 24 hours to schedule your call.
                </p>
                <p className="mt-2 text-sm text-white/70">
                  No charge today. We'll only invoice after we confirm CareHalo360 is the right fit for your family.
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
                  label="ZIP code (where the device will live)"
                  type="text"
                  required
                  inputMode="numeric"
                  pattern="\d{5}"
                  maxLength={5}
                  autoComplete="postal-code"
                />

                <RadioGroup
                  name="state"
                  legend="Is your parent's home in Texas?"
                  options={["Texas", "Not Texas (but interested)"]}
                  required
                />

                <RadioGroup
                  name="wifi"
                  legend="Does your parent have reliable Wi-Fi at home?"
                  options={["Yes", "No", "Not sure"]}
                  required
                />

                <RadioGroup
                  name="access"
                  legend="Could our founder easily travel to install it in person?"
                  options={["Yes", "Maybe", "No"]}
                  required
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
                        <input type="radio" name="who" value={opt} className="accent-cyan-500" />
                        <span className="text-sm font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="worry" className="block text-sm font-semibold text-slate-800 mb-2">
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
                  <p role="alert" aria-live="assertive" className="text-sm text-red-600 font-medium">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-white font-semibold transition-colors"
                >
                  {submitting ? "Sending…" : "Apply now — no payment today"}
                </button>
                <p className="text-xs text-slate-500 text-center">
                  We don't charge anything on this page. Payment is collected only after a qualifying call.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 pt-14 pb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
            <p style={{ color: "#fde68a" }}>
              <span className="font-semibold" style={{ color: "#fcd34d" }}>Important:</span>{" "}
              CareHalo360 is not a medical device and is not a substitute for emergency services. In a
              life-threatening emergency, always call{" "}
              <a href="tel:911" className="underline font-semibold" style={{ color: "#fef3c7" }}>911</a>.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-4 gap-10 text-sm">
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
      <label htmlFor={id} className="block text-sm font-semibold text-slate-800 mb-2">
        {label}{" "}
        {optional && <span className="text-slate-400 font-normal">(optional)</span>}
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

interface RadioGroupProps {
  name: string;
  legend: string;
  options: string[];
  required?: boolean;
}

function RadioGroup({ name, legend, options, required }: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="block text-sm font-semibold text-slate-800 mb-2">
        {legend}
      </legend>
      <div className="grid sm:grid-cols-3 gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 has-[:checked]:bg-cyan-50 has-[:checked]:border-cyan-500 transition-colors"
          >
            <input type="radio" name={name} value={opt} required={required} className="accent-cyan-500" />
            <span className="text-sm font-medium">{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
