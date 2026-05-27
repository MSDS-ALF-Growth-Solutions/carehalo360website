import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInView, ImageReveal, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";

import heroImage from "@/assets/heroes/pricing-hero.jpg";
import premiumHomeImage from "@/assets/pricing/premium-home.jpg";
import flexibleTrustImage from "@/assets/pricing/flexible-trust.jpg";

const includedFeatures = [
  "CareHalo360 device(s)",
  "Privacy-first monitoring",
  "Safety alerts & notifications",
  "Software updates",
  "Customer support",
  "Family access",
];

const pricingFaqs = [
  {
    question: "Is this a medical device?",
    answer: "No. CareHalo360 is a safety and awareness tool designed to support families, not a medical device.",
  },
  {
    question: "Are there setup or installation fees?",
    answer: "No. Hardware and setup are included in your subscription.",
  },
  {
    question: "Can multiple family members receive alerts?",
    answer: "Yes. Family access is included.",
  },
  {
    question: "What happens if we move or no longer need it?",
    answer: "You can cancel anytime and return the devices.",
  },
];

const whoThisIsFor = [
  "Thoughtful, premium care support",
  "Privacy-first technology",
  "Simple, predictable monthly costs",
  "A solution that respects independence",
];

export default function Pricing() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "CareHalo360",
    "description": "Privacy-first home safety monitoring for families supporting someone at home.",
    "brand": {
      "@type": "Brand",
      "name": "CareHalo360"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "39.00",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://carehalo360.com/pricing"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CareHalo360 Pricing | Simple, Privacy-First Home Safety Monitoring</title>
        <meta 
          name="description" 
          content="Simple monthly pricing for CareHalo360. Hardware included, cancel anytime. Premium, privacy-first home safety monitoring for families." 
        />
        <meta property="og:title" content="CareHalo360 Pricing — Simple. Transparent. Thoughtful." />
        <meta 
          property="og:description" 
          content="One monthly price. Hardware included. Cancel anytime. CareHalo360 offers premium, privacy-first safety monitoring for families at home." 
        />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="home safety monitoring pricing, elderly care monitoring cost, home care technology subscription, senior safety monitoring price, caregiving technology pricing, aging in place technology cost, non-intrusive home monitoring, family caregiving tools, privacy-first home monitoring" />
        <link rel="canonical" href="https://carehalo360.com/pricing" />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <PageHero
          title="Simple pricing. No surprises."
          subtitle="CareHalo360 is offered as a single monthly subscription, designed to give families quiet certainty without long-term commitments or complicated plans."
          description="Premium care support, thoughtfully designed, easy to trust."
          backgroundImage={heroImage}
        />

        {/* One Simple Plan */}
        <section className="section section-warm">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <FadeInView>
                  <h2 className="mb-6">One simple plan</h2>
                </FadeInView>
                
                <FadeInView delay={0.1}>
                  <div className="care-card mb-8">
                    <div className="text-center mb-6">
                      <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                        $39–$49
                        <span className="text-xl font-normal text-muted-foreground"> / month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Final price shown at checkout based on home setup.
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <p className="font-semibold mb-4 text-foreground">What's included</p>
                      <StaggerContainer className="space-y-3" staggerDelay={0.05}>
                        {includedFeatures.map((feature, index) => (
                          <StaggerItem key={index} className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-foreground">{feature}</span>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </div>
                </FadeInView>

                <FadeInView delay={0.3}>
                  <p className="text-muted-foreground">
                    No add-ons. No hidden fees. No upsells.
                  </p>
                </FadeInView>
              </div>

              <ImageReveal delay={0.2}>
                <img 
                  src={premiumHomeImage} 
                  alt="Warm family home interior representing calm, premium care"
                  className="rounded-2xl shadow-xl w-full"
                />
              </ImageReveal>
            </div>
          </div>
        </section>

        {/* Hardware Explained */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <FadeInView>
                <h2 className="text-center mb-4">Hardware, clearly explained</h2>
              </FadeInView>
              <FadeInView delay={0.1}>
                <p className="text-center text-lg text-muted-foreground mb-10">
                  CareHalo360 devices are provided as part of your monthly plan. There's no separate purchase required.
                </p>
              </FadeInView>

              <FadeInView delay={0.2}>
                <div className="care-card">
                  <p className="text-center text-muted-foreground mb-6">
                    We ask only one thing: if you ever cancel, please return the devices.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-semibold text-foreground">Return devices</span>
                      </div>
                      <p className="text-muted-foreground">No charge</p>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <X className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="font-semibold text-foreground">Devices not returned</span>
                      </div>
                      <p className="text-muted-foreground">One-time replacement fee of $250</p>
                    </div>
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    This allows us to keep pricing fair and accessible for families.
                  </p>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Cancel Anytime */}
        <section className="section section-warm">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ImageReveal className="order-2 lg:order-1">
                <img 
                  src={flexibleTrustImage} 
                  alt="Peaceful home environment conveying flexibility and trust"
                  className="rounded-2xl shadow-xl w-full"
                />
              </ImageReveal>

              <div className="order-1 lg:order-2">
                <FadeInView>
                  <h2 className="mb-4">Cancel anytime</h2>
                </FadeInView>
                <FadeInView delay={0.1}>
                  <p className="text-lg text-muted-foreground mb-6">
                    Stay because it helps, not because you're locked in.
                  </p>
                </FadeInView>
                <FadeInView delay={0.2}>
                  <p className="text-muted-foreground mb-6">
                    CareHalo360 is month-to-month.
                  </p>

                  <div className="space-y-3">
                    <p className="text-foreground">There are:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• No contracts</li>
                      <li>• No long-term commitments</li>
                      <li>• No penalties for canceling</li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground mt-6">
                    If your needs change, you're free to cancel at any time.
                  </p>
                </FadeInView>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <FadeInView>
                <h2 className="mb-6">Who this is for</h2>
              </FadeInView>
              <FadeInView delay={0.1}>
                <p className="text-lg text-muted-foreground mb-10">
                  CareHalo360 pricing is designed for families who want:
                </p>
              </FadeInView>

              <StaggerContainer className="grid sm:grid-cols-2 gap-4 mb-10" staggerDelay={0.1}>
                {whoThisIsFor.map((item, index) => (
                  <StaggerItem key={index} className="care-card text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <FadeInView delay={0.4}>
                <p className="text-muted-foreground italic">
                  This is not about watching someone. It's about being ready when it matters.
                </p>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section section-warm">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <FadeInView>
                <h2 className="text-center mb-10">Pricing questions</h2>
              </FadeInView>
              
              <FadeInView delay={0.1}>
                <Accordion type="single" collapsible className="space-y-4">
                  {pricingFaqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="care-card border-none"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Facilities CTA */}
        <section className="section">
          <div className="container">
            <FadeInView>
              <div className="max-w-2xl mx-auto text-center care-card">
                <h2 className="text-xl mb-4">For care facilities or multi-home use</h2>
                <p className="text-muted-foreground mb-6">
                  Looking for support across multiple homes or care settings?
                </p>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
            </FadeInView>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section section-warm">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <FadeInView>
                <h2 className="mb-4">Thoughtful care starts with clarity.</h2>
              </FadeInView>
              <FadeInView delay={0.1}>
                <p className="text-lg text-muted-foreground mb-8">
                  CareHalo360 offers calm, privacy-first safety support with pricing you can trust.
                </p>
              </FadeInView>
              <FadeInView delay={0.2}>
                <Button asChild variant="hero" size="xl">
                  <Link to="/waitlist">Join Waitlist</Link>
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
