import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { FadeInView, ImageReveal, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";

import heroImage from "@/assets/heroes/how-it-works-hero.jpg";
import setupImage from "@/assets/how-it-works/setup-living-room.jpg";
import passiveImage from "@/assets/how-it-works/passive-monitoring.jpg";
import privacyImage from "@/assets/how-it-works/privacy-motion.jpg";
import alertsImage from "@/assets/how-it-works/smart-alerts.jpg";
import realHomesImage from "@/assets/how-it-works/real-homes.jpg";

export default function HowItWorks() {
  return (
    <>
      <Helmet>
        <title>How CareHalo360 Works | Privacy-First Home Safety Monitoring</title>
        <meta 
          name="description" 
          content="Learn how CareHalo360 works—privacy-first home safety monitoring for families. No wearables, no constant watching, just calm awareness." 
        />
        <meta property="og:title" content="How CareHalo360 Works — Quiet Safety for Life at Home" />
        <meta property="og:description" content="CareHalo360 uses privacy-first, on-device intelligence to help families stay aware of safety events at home—without wearables or surveillance." />
        <meta name="keywords" content="how home safety monitoring works, privacy-first home monitoring, elderly care at home technology, non-intrusive safety monitoring, aging in place technology" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <PageHero
            title="How CareHalo360 Works"
            subtitle="Quiet support. Thoughtful technology. Designed for real life."
            description="CareHalo360 is built to stay out of the way while staying aware of what matters. It works silently in the background, supporting families without disrupting daily routines."
            backgroundImage={heroImage}
          >
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> No wearables
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> No buttons
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" /> No constant supervision
              </span>
            </div>
            <Button asChild variant="hero" size="xl">
              <Link to="/waitlist">Join Waitlist</Link>
            </Button>
          </PageHero>

          {/* Simple Setup Section */}
          <section className="section">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <FadeInView>
                  <h2 className="mb-4">Set up in minutes</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    CareHalo360 arrives ready to go. There's no complex installation and no technical expertise required.
                  </p>
                  <p className="text-muted-foreground mb-8">
                    Once placed in the home, the system begins working quietly without changing how the person at home lives day to day.
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Why families appreciate this:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        Fast, simple setup
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        No learning curve
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        No interaction required
                      </li>
                    </ul>
                  </div>
                </FadeInView>
                <ImageReveal>
                  <img
                    src={setupImage}
                    alt="Older adult living comfortably in a modern home with natural light"
                    className="care-image"
                  />
                </ImageReveal>
              </div>
            </div>
          </section>

          {/* Passive Monitoring Section */}
          <section className="section bg-secondary/30">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <ImageReveal className="order-2 lg:order-1">
                  <img
                    src={passiveImage}
                    alt="Senior walking independently through a home hallway"
                    className="care-image"
                  />
                </ImageReveal>
                <FadeInView className="order-1 lg:order-2">
                  <h2 className="mb-4">Always on. Never intrusive.</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    CareHalo360 does not require anyone to wear a device or remember to press a button.
                  </p>
                  <p className="text-muted-foreground mb-8">
                    It passively observes movement patterns, allowing it to notice when something looks unusual without interrupting daily life.
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">What this means for families:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        No wearables to forget or remove
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        No routine changes
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        No constant checking
                      </li>
                    </ul>
                  </div>
                </FadeInView>
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section className="section">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <FadeInView>
                  <h2 className="mb-4">Privacy-first by design</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    CareHalo360 processes movement directly on the device, inside the home.
                  </p>
                  <p className="text-muted-foreground mb-8">
                    Instead of recording or storing identifiable video, the system converts motion into abstract representations that allow safety detection without capturing identity.
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Designed intentionally to protect dignity:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        No facial recognition
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        No identity tracking
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        No raw video storage
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6">
                    This approach provides awareness without turning the home into a surveillance space.
                  </p>
                </FadeInView>
                <ImageReveal>
                  <img
                    src={privacyImage}
                    alt="Abstract motion representation illustration showing privacy-first monitoring"
                    className="care-image"
                  />
                </ImageReveal>
              </div>
            </div>
          </section>

          {/* Smart Alerts Section */}
          <section className="section bg-secondary/30">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <ImageReveal className="order-2 lg:order-1">
                  <img
                    src={alertsImage}
                    alt="Caregiver calmly checking phone at home"
                    className="care-image"
                  />
                </ImageReveal>
                <FadeInView className="order-1 lg:order-2">
                  <h2 className="mb-4">Alerts when it matters, not constant noise</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    CareHalo360 is designed to reduce anxiety, not increase it.
                  </p>
                  <p className="text-muted-foreground mb-8">
                    The system looks for meaningful changes in movement patterns and sends alerts only when attention may be needed.
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Alerts are:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        Timely
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        Clear
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        Sent to the right people
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6">
                    This keeps families informed without overwhelming them.
                  </p>
                </FadeInView>
              </div>
            </div>
          </section>

          {/* Real Homes Section */}
          <section className="section">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <FadeInView>
                  <h2 className="mb-4">Designed for everyday living</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    CareHalo360 is built for homes, not hospitals or clinical environments.
                  </p>
                  <p className="text-muted-foreground mb-8">
                    It adapts to normal daily activity and supports independence, helping families stay aware while family members continue living comfortably at home.
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Care that respects dignity:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        No surveillance feeling
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        No constant supervision
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        No disruption to daily life
                      </li>
                    </ul>
                  </div>
                </FadeInView>
                <ImageReveal>
                  <img
                    src={realHomesImage}
                    alt="Older adult relaxing peacefully in a familiar home setting"
                    className="care-image"
                  />
                </ImageReveal>
              </div>
            </div>
          </section>

          {/* What It Is / Isn't Section */}
          <section className="section bg-secondary/30">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <FadeInView>
                  <h2 className="text-center mb-12">What CareHalo360 is (and isn't)</h2>
                </FadeInView>
                
                <StaggerContainer className="grid md:grid-cols-2 gap-8">
                  <StaggerItem className="care-card">
                    <h3 className="text-lg font-semibold mb-4 text-primary">What CareHalo360 is</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        A quiet layer of safety awareness
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        A support tool for families and caregivers
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        Designed to complement care
                      </li>
                    </ul>
                  </StaggerItem>
                  
                  <StaggerItem className="care-card">
                    <h3 className="text-lg font-semibold mb-4 text-muted-foreground">What CareHalo360 is not</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        A replacement for caregivers
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        A surveillance system
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        A medical device
                      </li>
                    </ul>
                  </StaggerItem>
                </StaggerContainer>

                <FadeInView delay={0.3}>
                  <p className="text-center text-muted-foreground mt-8">
                    CareHalo360 exists to support people, not monitor them.
                  </p>
                </FadeInView>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="section">
            <div className="container">
              <FadeInView className="max-w-2xl mx-auto text-center">
                <h2 className="mb-4">Care should feel supportive, not invasive.</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  CareHalo360 helps families stay aware while family members keep their independence.
                </p>
                <Button asChild variant="hero" size="xl">
                  <Link to="/waitlist">Join Waitlist</Link>
                </Button>
                
                <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm">
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Learn about privacy →
                  </Link>
                  <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    View pricing →
                  </Link>
                  <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                    Read FAQs →
                  </Link>
                </div>
              </FadeInView>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
