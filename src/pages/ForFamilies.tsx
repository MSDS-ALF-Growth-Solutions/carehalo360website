import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  FadeInView,
  ImageReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/MotionElements";

import heroImage from "@/assets/heroes/about-hero.jpg";
import familyImage from "@/assets/family-peace-of-mind.jpg";

export default function ForFamilies() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>For Families | CareHalo360</title>
        <meta
          name="description"
          content="CareHalo360 keeps families informed about loved ones through plain text safety alerts. No app to install, no surveillance — just timely, opt-in messages when something matters."
        />
        <meta property="og:title" content="For Families — CareHalo360" />
        <meta
          property="og:description"
          content="Plain-text safety alerts for family members of loved ones in care. Opt-in, opt-out anytime, never sold or shared."
        />
        <link rel="canonical" href="https://carehalo360.com/for-families" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <PageHero
          title="When something happens with Mom or Dad, you'll be the first to know."
          subtitle="CareHalo360 keeps families informed."
          description="Plain text messages — not another app to manage — let you stay close without intruding on a loved one's daily life."
          backgroundImage={heroImage}
        />

        {/* What you'll receive */}
        <section className="section">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <FadeInView>
                <h2 className="mb-4">What you'll receive</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Three kinds of message, and only those three.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    A welcome message when you're first added as an emergency contact, naming the resident you've been added for.
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    Real-time SMS alerts when a qualifying safety event is detected.
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    Follow-up updates as the situation is resolved.
                  </li>
                </ul>
              </FadeInView>
              <ImageReveal>
                <img
                  src={familyImage}
                  alt="A family member checking a phone in a calm, well-lit room"
                  className="care-image"
                />
              </ImageReveal>
            </div>
          </div>
        </section>

        {/* What we won't do */}
        <section className="section bg-secondary/30">
          <div className="container">
            <FadeInView className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="mb-4">What we won't do</h2>
              <p className="text-lg text-muted-foreground">
                We're built around what families don't want, just as much as what they do.
              </p>
            </FadeInView>
            <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <StaggerItem>
                <div className="flex flex-col items-center text-center gap-3">
                  <X className="w-8 h-8 text-primary" />
                  <h3 className="text-lg font-semibold">No marketing messages</h3>
                  <p className="text-muted-foreground text-sm">
                    We never use your number for promotions or upsells. Safety alerts only.
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col items-center text-center gap-3">
                  <X className="w-8 h-8 text-primary" />
                  <h3 className="text-lg font-semibold">No sharing your number</h3>
                  <p className="text-muted-foreground text-sm">
                    Mobile information is never shared with third parties or affiliates for marketing or promotional purposes.
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex flex-col items-center text-center gap-3">
                  <X className="w-8 h-8 text-primary" />
                  <h3 className="text-lg font-semibold">No extra lists</h3>
                  <p className="text-muted-foreground text-sm">
                    You're only on the resident-specific Notification Route you were invited to. Nothing else.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* How to opt out */}
        <section className="section">
          <div className="container max-w-3xl mx-auto">
            <FadeInView>
              <h2 className="mb-4 text-center">How to opt out, anytime</h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                Three ways, and any of them work.
              </p>
            </FadeInView>
            <StaggerContainer className="space-y-6">
              <StaggerItem>
                <div className="flex gap-4 items-start p-6 rounded-xl bg-secondary/30">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Reply STOP</h3>
                    <p className="text-muted-foreground">
                      Reply <strong>STOP</strong> to any CareHalo360 message and you'll be removed immediately.
                    </p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex gap-4 items-start p-6 rounded-xl bg-secondary/30">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Tap "Remove me"</h3>
                    <p className="text-muted-foreground">
                      Every alert message includes a one-tap "Remove me" link.
                    </p>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex gap-4 items-start p-6 rounded-xl bg-secondary/30">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Ask the account owner</h3>
                    <p className="text-muted-foreground">
                      The family member or administrator who added you can remove you from the route at any time.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA band */}
        <section className="section bg-secondary/30">
          <div className="container max-w-3xl mx-auto text-center">
            <FadeInView>
              <h2 className="mb-4">Read the full SMS Terms</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Program details, sample messages, frequency, and carrier disclaimers — all in plain language.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/sms-terms">View SMS Terms</Link>
              </Button>
            </FadeInView>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
