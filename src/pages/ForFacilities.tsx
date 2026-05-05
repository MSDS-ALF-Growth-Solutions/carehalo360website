import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Shield, Users, Zap, Activity, Bell, Heart } from "lucide-react";
import {
  FadeInView,
  ImageReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/MotionElements";

import heroImage from "@/assets/heroes/contact-hero.jpg";
import workspaceImage from "@/assets/contact/supportive-workspace.jpg";

const reasons = [
  {
    icon: Users,
    title: "Built for senior living workflows",
    description:
      "Routes are per-resident, multi-contact, and managed by verified account owners. Operations stay where they belong — with your team.",
  },
  {
    icon: Shield,
    title: "Compliance-ready messaging",
    description:
      "Carrier-registered A2P 10DLC, full opt-in / opt-out audit trail, and CTIA-aligned consent. Reviewer-friendly by design.",
  },
  {
    icon: Zap,
    title: "Simple to deploy",
    description:
      "Onboard residents in minutes. Family members need no software — just a phone that can receive a text message.",
  },
];

const useCases = [
  {
    icon: Activity,
    title: "Fall detection alerts",
    description: "Notify the right contacts the moment a fall is detected.",
  },
  {
    icon: Bell,
    title: "Wandering and elopement",
    description: "Reach pre-cleared family members when a resident leaves a designated area.",
  },
  {
    icon: Heart,
    title: "Health event escalations",
    description: "Route urgent updates to the resident's primary contacts in seconds.",
  },
  {
    icon: Users,
    title: "Resident status updates",
    description: "When configured, send routine reassurances to families during sensitive transitions.",
  },
];

export default function ForFacilities() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>For Facilities | CareHalo360</title>
        <meta
          name="description"
          content="CareHalo360 gives assisted living communities a reliable, opt-in SMS layer for emergency family notifications — without IT lift."
        />
        <meta property="og:title" content="For Facilities — CareHalo360" />
        <meta
          property="og:description"
          content="Better family communication, less administrative load. Carrier-registered SMS notifications for assisted living."
        />
        <link rel="canonical" href="https://carehalo360.com/for-facilities" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <PageHero
          title="Better family communication. Less administrative load."
          subtitle="CareHalo360 for assisted living communities."
          description="A reliable, opt-in SMS layer for emergency family notifications — built for senior-living workflows, not generic messaging."
          backgroundImage={heroImage}
        />

        {/* Why facilities choose us */}
        <section className="section">
          <div className="container">
            <FadeInView className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-4">Why facilities choose CareHalo360</h2>
              <p className="text-lg text-muted-foreground">
                Three things matter to operators: workflow fit, compliance, and time-to-deploy.
              </p>
            </FadeInView>
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <StaggerItem key={reason.title}>
                    <div className="p-8 rounded-xl bg-secondary/30 h-full">
                      <Icon className="w-10 h-10 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                      <p className="text-muted-foreground">{reason.description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* How we partner */}
        <section className="section bg-secondary/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <ImageReveal>
                <img
                  src={workspaceImage}
                  alt="A staff workspace in a senior living community"
                  className="care-image"
                />
              </ImageReveal>
              <FadeInView>
                <h2 className="mb-4">How we partner with your community</h2>
                <p className="text-muted-foreground mb-6">
                  CareHalo360 is more than a messaging utility — it's a deployment partner.
                </p>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <div>
                      <strong className="text-foreground">Pilot programs available</strong>
                      <p className="text-sm">Start with a small resident cohort and expand once your team is comfortable.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <div>
                      <strong className="text-foreground">Integration support</strong>
                      <p className="text-sm">We work alongside your existing resident management system, not against it.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <div>
                      <strong className="text-foreground">Staff training included</strong>
                      <p className="text-sm">Account owners are trained on consent verification and route management.</p>
                    </div>
                  </li>
                </ul>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="section">
          <div className="container">
            <FadeInView className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-4">Use cases</h2>
              <p className="text-lg text-muted-foreground">
                What CareHalo360 alerts look like in real assisted-living workflows.
              </p>
            </FadeInView>
            <StaggerContainer className="grid sm:grid-cols-2 gap-6">
              {useCases.map((uc) => {
                const Icon = uc.icon;
                return (
                  <StaggerItem key={uc.title}>
                    <div className="flex gap-4 items-start p-6 rounded-xl bg-secondary/30 h-full">
                      <Icon className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{uc.title}</h3>
                        <p className="text-muted-foreground text-sm">{uc.description}</p>
                      </div>
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
              <h2 className="mb-4">Bring CareHalo360 to your community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Schedule a demo and we'll walk through how CareHalo360 fits into your existing operations.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Schedule a demo</Link>
              </Button>
            </FadeInView>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
