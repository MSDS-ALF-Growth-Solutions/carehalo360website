import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Settings, Eye, Clock } from "lucide-react";
import { FadeInView, ImageReveal, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";

import trustHomeImage from "@/assets/about/trust-home.jpg";
import thoughtfulDesignImage from "@/assets/about/thoughtful-design.jpg";

const values = [
  {
    icon: Shield,
    title: "Privacy first",
    description: "We design systems that minimize data and avoid identity tracking."
  },
  {
    icon: Heart,
    title: "Dignity always",
    description: "Care should never feel invasive or controlling."
  },
  {
    icon: Settings,
    title: "Reliability over novelty",
    description: "We build for consistency, not gimmicks."
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Families should always know how a system works and what it doesn't do."
  },
  {
    icon: Clock,
    title: "Long-term trust",
    description: "CareHalo360 is built to be dependable over time, not just impressive on day one."
  }
];

const builtForFamilies = [
  "Support without surveillance",
  "Safety without complexity",
  "Technology that respects independence"
];

export default function About() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CareHalo360",
    "url": "https://carehalo360.com",
    "description": "Privacy-first home safety monitoring designed with dignity, trust, and real caregiving experience at the core.",
    "sameAs": []
  };

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About CareHalo360",
    "description": "Learn why CareHalo360 was built—privacy-first home safety monitoring designed with dignity, trust, and real caregiving experience at the core.",
    "mainEntity": organizationSchema
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About CareHalo360 | Privacy-First Home Safety, Built with Care</title>
        <meta 
          name="description" 
          content="Learn why CareHalo360 was built—privacy-first home safety monitoring designed with dignity, trust, and real caregiving experience at the core." 
        />
        <meta property="og:title" content="About CareHalo360 — Care Built on Trust" />
        <meta 
          property="og:description" 
          content="CareHalo360 is built with intention: privacy-first, dignity-focused home safety monitoring created by a hands-on founder who values trust over hype." 
        />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="about CareHalo360, privacy-first home monitoring, home safety technology company, caregiving technology mission, aging in place safety, dignity in home care, elderly care technology, family caregiving support, ethical home monitoring" />
        <link rel="canonical" href="https://carehalo360.com/about" />
        <script type="application/ld+json">
          {JSON.stringify(aboutPageSchema)}
        </script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <FadeInView>
                <h1 className="mb-6">Care starts with trust.</h1>
              </FadeInView>
              <FadeInView delay={0.1}>
                <p className="text-lg text-muted-foreground mb-6">
                  CareHalo360 was created to support families caring for loved ones at home 
                  without turning homes into surveillance spaces or asking people to sacrifice 
                  dignity for safety.
                </p>
              </FadeInView>
              <FadeInView delay={0.2}>
                <p className="text-muted-foreground">
                  Everything we build starts with one guiding belief:
                </p>
                <p className="text-primary font-medium mt-2">
                  Care should feel supportive, respectful, and human.
                </p>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="section section-warm">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <FadeInView>
                  <h2 className="mb-6">Thoughtful technology for real care at home</h2>
                </FadeInView>
                <FadeInView delay={0.1}>
                  <p className="text-muted-foreground mb-6">
                    As more families choose to care for loved ones at home, the need for 
                    better safety support has never been clearer.
                  </p>
                </FadeInView>
                <FadeInView delay={0.2}>
                  <p className="text-muted-foreground mb-6">
                    Many existing solutions rely on wearables that are forgotten, or camera 
                    systems that feel invasive. CareHalo360 was built to offer a different 
                    path, one that provides awareness without intrusion.
                  </p>
                </FadeInView>
                <FadeInView delay={0.3}>
                  <p className="font-medium text-foreground mb-4">Our mission is simple:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Support independence</li>
                    <li>• Reduce uncertainty for families</li>
                    <li>• Respect privacy at every level</li>
                  </ul>
                </FadeInView>
              </div>
              <ImageReveal delay={0.2}>
                <img 
                  src={trustHomeImage} 
                  alt="Warm home environment representing trust and independence"
                  className="rounded-2xl shadow-xl w-full"
                />
              </ImageReveal>
            </div>
          </div>
        </section>

        {/* Why CareHalo360 Exists */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FadeInView>
                <h2 className="text-center mb-6">A quiet gap we couldn't ignore</h2>
              </FadeInView>
              <FadeInView delay={0.1}>
                <p className="text-center text-muted-foreground mb-8">
                  CareHalo360 was born from firsthand experience, seeing how often families 
                  are left choosing between doing nothing and doing too much.
                </p>
              </FadeInView>
              
              <FadeInView delay={0.2}>
                <div className="care-card mb-8">
                  <p className="font-medium text-foreground mb-4">There was a clear gap:</p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Safety tools that were either intrusive or unreliable</li>
                    <li>• Technology that focused on monitoring, not dignity</li>
                    <li>• Systems designed for demos, not real homes</li>
                  </ul>
                </div>
              </FadeInView>

              <FadeInView delay={0.3}>
                <p className="text-center text-muted-foreground mb-4">
                  We believed families deserved better.
                </p>
                <p className="text-center text-muted-foreground">
                  So CareHalo360 was built with intention, slowly, carefully, and with 
                  real-world use in mind.
                </p>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Built with Hands-On Care */}
        <section className="section section-warm">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ImageReveal className="order-2 lg:order-1">
                <img 
                  src={thoughtfulDesignImage} 
                  alt="Quiet home hallway symbolizing thoughtful, unobtrusive design"
                  className="rounded-2xl shadow-xl w-full"
                />
              </ImageReveal>
              <div className="order-1 lg:order-2">
                <FadeInView>
                  <h2 className="mb-6">Founder-led. Built responsibly.</h2>
                </FadeInView>
                <FadeInView delay={0.1}>
                  <p className="text-muted-foreground mb-6">
                    CareHalo360 is a founder-led company, built hands-on from the ground up.
                  </p>
                </FadeInView>
                <FadeInView delay={0.2}>
                  <p className="text-muted-foreground mb-6">
                    The platform, architecture, and design decisions are shaped directly by 
                    real caregiving challenges, not trends or hype. This approach allows us 
                    to prioritize reliability, clarity, and long-term trust over fast growth.
                  </p>
                </FadeInView>
                <FadeInView delay={0.3}>
                  <p className="font-medium text-foreground mb-4">We believe:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Good care technology should explain itself</li>
                    <li>• Privacy should be designed in, not added later</li>
                    <li>• Responsibility matters more than speed</li>
                  </ul>
                </FadeInView>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <FadeInView>
                <h2 className="text-center mb-4">What guides every decision we make</h2>
              </FadeInView>
              <FadeInView delay={0.1}>
                <p className="text-center text-muted-foreground mb-12">
                  Our values shape how we build, support, and grow.
                </p>
              </FadeInView>

              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
                {values.map((value, index) => (
                  <StaggerItem key={index} className="care-card">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* Built for Families */}
        <section className="section section-warm">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <FadeInView>
                <h2 className="mb-6">Built for families</h2>
              </FadeInView>
              <FadeInView delay={0.1}>
                <p className="text-muted-foreground mb-8">
                  CareHalo360 is designed for families who want:
                </p>
              </FadeInView>

              <StaggerContainer className="space-y-4 mb-10" staggerDelay={0.1}>
                {builtForFamilies.map((item, index) => (
                  <StaggerItem key={index} className="care-card inline-block px-6 py-3">
                    <span className="text-foreground">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <FadeInView delay={0.4}>
                <p className="text-muted-foreground">
                  We don't believe in replacing caregivers or family involvement. 
                  We believe in supporting them, quietly and reliably.
                </p>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <FadeInView>
                <h2 className="mb-4">Care works best when trust comes first.</h2>
              </FadeInView>
              <FadeInView delay={0.1}>
                <p className="text-lg text-muted-foreground mb-8">
                  CareHalo360 is built to support families with calm, privacy-first safety 
                  awareness, designed with care, intention, and respect.
                </p>
              </FadeInView>
              <FadeInView delay={0.2}>
                <Button asChild variant="hero" size="xl">
                  <Link to="/get-started">Get Started Now</Link>
                </Button>
              </FadeInView>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
