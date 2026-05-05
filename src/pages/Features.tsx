import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  UserCheck,
  Lock,
  MessageSquare,
  XCircle,
  Hash,
  ClipboardList,
  Send,
  Smartphone,
  Tablet,
} from "lucide-react";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/MotionElements";

import heroImage from "@/assets/heroes/how-it-works-hero.jpg";

const features = [
  {
    icon: ShieldCheck,
    title: "Per-resident Notification Routes",
    description:
      "Each contact list is scoped to a single resident. No cross-contamination between routes.",
  },
  {
    icon: UserCheck,
    title: "Verified account owners",
    description:
      "Only certified, verified owners can add or remove contacts on a resident's route.",
  },
  {
    icon: Lock,
    title: "Opt-in by design",
    description:
      "Account owners must affirmatively certify prior consent for every contact added.",
  },
  {
    icon: MessageSquare,
    title: "Welcome confirmation messages",
    description:
      "Every new contact receives an introductory SMS naming the resident before any alert is sent.",
  },
  {
    icon: XCircle,
    title: "One-tap removal",
    description:
      "A 'Remove me' link is included in every message for instant opt-out.",
  },
  {
    icon: Hash,
    title: "STOP / HELP keywords",
    description:
      "Standard carrier-compliant opt-out and help responses, available on every route.",
  },
  {
    icon: ClipboardList,
    title: "Per-resident audit trail",
    description:
      "Full record of consent, messages sent, and opt-outs for every Notification Route.",
  },
  {
    icon: Send,
    title: "Carrier-registered messaging",
    description:
      "A2P 10DLC registered with The Campaign Registry for high-deliverability SMS.",
  },
  {
    icon: Smartphone,
    title: "No app required for contacts",
    description:
      "Family members receive plain SMS. No download, no login, no friction.",
  },
  {
    icon: Tablet,
    title: "Mobile management for owners",
    description:
      "Account owners manage routes from app.carehalo360.com on any device.",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Features | CareHalo360</title>
        <meta
          name="description"
          content="Everything CareHalo360 does — a focused tool for getting the right safety information to the right family member, fast."
        />
        <meta property="og:title" content="Features — CareHalo360" />
        <meta
          property="og:description"
          content="Per-resident routes, verified owners, opt-in by design, carrier-registered messaging — every feature CareHalo360 ships with."
        />
        <link rel="canonical" href="https://carehalo360.com/features" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <PageHero
          title="Everything CareHalo360 does."
          subtitle="A focused tool, designed for one job."
          description="Get the right safety information to the right family member, fast — without surveillance, without surprises, without an app."
          backgroundImage={heroImage}
        />

        {/* Feature grid */}
        <section className="section">
          <div className="container">
            <FadeInView className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-4">Built around consent and clarity</h2>
              <p className="text-lg text-muted-foreground">
                Every feature is in service of the same goal: getting the right message to the right person, with their permission, at the right moment.
              </p>
            </FadeInView>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <StaggerItem key={feature.title}>
                    <div className="p-6 rounded-xl bg-secondary/30 h-full">
                      <Icon className="w-9 h-9 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA band */}
        <section className="section bg-secondary/30">
          <div className="container max-w-3xl mx-auto text-center">
            <FadeInView>
              <h2 className="mb-4">See how it fits your community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Pricing is straightforward and built for assisted living operators.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/pricing">View pricing</Link>
              </Button>
            </FadeInView>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
