import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

import dignityImage from "@/assets/privacy/dignity-comfort.jpg";
import abstractMotionImage from "@/assets/privacy/abstract-motion.jpg";
import homeComfortImage from "@/assets/privacy/home-comfort.jpg";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy & Trust | CareHalo360 Home Safety Monitoring</title>
        <meta 
          name="description" 
          content="CareHalo360 is built with privacy first—no wearables, no constant video, no identity tracking. Safety monitoring designed with dignity and trust." 
        />
        <meta property="og:title" content="Privacy & Trust — CareHalo360" />
        <meta property="og:description" content="CareHalo360 protects privacy by design. On-device intelligence, no surveillance, and respectful safety monitoring for families caring at home." />
        <meta name="keywords" content="privacy-first home monitoring, non-intrusive safety monitoring, elderly care privacy, home monitoring without cameras, caregiver trust technology" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="section bg-secondary/30">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="mb-6">Privacy isn't a feature. It's the foundation.</h1>
                <p className="text-xl text-muted-foreground mb-4">
                  CareHalo360 was built on a simple belief:
                </p>
                <p className="text-xl font-medium text-foreground">
                  Safety should never come at the cost of dignity.
                </p>
                <p className="text-lg text-muted-foreground mt-6">
                  That belief shapes every design decision we make, from how data is processed to what we intentionally choose not to collect.
                </p>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="section">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <h2 className="mb-4">Designed for dignity, not surveillance</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Many home monitoring systems rely on constant video feeds, identity tracking, or devices that people are expected to wear.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    CareHalo360 takes a different approach.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      We focus on understanding movement patterns, not people.
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      We prioritize awareness, not observation.
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      We design for trust, not control.
                    </li>
                  </ul>
                </div>
                <div>
                  <img
                    src={dignityImage}
                    alt="Older adult resting comfortably in a private home environment"
                    className="care-image"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* How We Protect Privacy Section */}
          <section className="section bg-secondary/30">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="mb-4">How CareHalo360 protects privacy</h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src={abstractMotionImage}
                    alt="Abstract illustration representing privacy-first motion analysis"
                    className="care-image"
                  />
                </div>
                <div className="order-1 lg:order-2 space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">On-device intelligence</h3>
                    <p className="text-muted-foreground">
                      CareHalo360 processes information inside the home, directly on the device. This reduces unnecessary data transmission and helps keep sensitive information where it belongs: private.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Abstract motion, not identity</h3>
                    <p className="text-muted-foreground">
                      Instead of storing or transmitting identifiable video, CareHalo360 converts movement into abstract motion representations. This allows the system to detect safety-related events without recognizing faces, identities, or personal details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What We Do / Don't Do Section */}
          <section className="section">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-center mb-12">What we do (and don't do)</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="care-card">
                    <h3 className="text-lg font-semibold mb-6 text-primary">What CareHalo360 does</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        Processes core signals on-device
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        Focuses on movement patterns, not identity
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        Sends alerts only when safety attention may be needed
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        Supports families with clear, timely awareness
                      </li>
                    </ul>
                  </div>
                  
                  <div className="care-card">
                    <h3 className="text-lg font-semibold mb-6 text-muted-foreground">What CareHalo360 does not do</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        No facial recognition
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        No identity tracking
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        No constant video streaming
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        No selling or sharing personal data
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-center text-muted-foreground mt-8">
                  Privacy is not something we add later. It's built into how the system works.
                </p>
              </div>
            </div>
          </section>

          {/* Built for Real Homes Section */}
          <section className="section bg-secondary/30">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <h2 className="mb-4">Respecting independence at home</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    CareHalo360 is designed to blend into everyday life.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    It doesn't ask people to change their behavior, wear devices, or feel watched. It simply stays present in the background, ready when needed.
                  </p>
                  <p className="text-muted-foreground">
                    This approach helps families support independence while maintaining peace of mind.
                  </p>
                </div>
                <div>
                  <img
                    src={homeComfortImage}
                    alt="Warm family home interior emphasizing comfort and privacy"
                    className="care-image"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Trust Through Transparency Section */}
          <section className="section">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="mb-4">Clear boundaries. Honest design.</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We believe trust comes from clarity.
                </p>
                <p className="text-muted-foreground mb-6">
                  CareHalo360 is intentionally transparent about what it does, how it works, and what it does not collect. Families should never have to guess how their home data is handled.
                </p>
                <p className="text-muted-foreground">
                  If something doesn't align with dignity or respect, it doesn't belong in the system.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="section bg-secondary/30">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="mb-4">Care works best when trust comes first.</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  CareHalo360 helps families stay aware while protecting privacy and independence.
                </p>
                <Button asChild variant="hero" size="xl">
                  <Link to="/get-started">Get Started Now</Link>
                </Button>
                
                <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm">
                  <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                    See how it works →
                  </Link>
                  <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    View pricing →
                  </Link>
                  <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                    Read FAQs →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
