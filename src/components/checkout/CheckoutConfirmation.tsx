import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FadeInView, HeroAnimation, HeroItem, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";

export default function CheckoutConfirmation() {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <HeroAnimation>
            {/* Success Icon */}
            <HeroItem>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-8 h-8 text-primary" />
              </div>
            </HeroItem>

            <HeroItem>
              <h1 className="mb-4">You're all set.</h1>
            </HeroItem>
            <HeroItem>
              <p className="text-xl text-muted-foreground mb-12">
                CareHalo360 is on its way.
              </p>
            </HeroItem>
          </HeroAnimation>

          {/* What happens next */}
          <FadeInView delay={0.3}>
            <div className="care-card text-left mb-10">
              <h2 className="text-xl font-semibold mb-6">What happens next:</h2>
              <StaggerContainer>
                <ul className="space-y-4">
                  <StaggerItem className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-medium text-primary">1</span>
                    </div>
                    <span className="text-foreground">We'll prepare your CareHalo360 device(s)</span>
                  </StaggerItem>
                  <StaggerItem className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-medium text-primary">2</span>
                    </div>
                    <span className="text-foreground">You'll receive setup instructions by email</span>
                  </StaggerItem>
                  <StaggerItem className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-medium text-primary">3</span>
                    </div>
                    <span className="text-foreground">Our team is here if you need help at any time</span>
                  </StaggerItem>
                </ul>
              </StaggerContainer>
            </div>
          </FadeInView>

          {/* Privacy Reassurance */}
          <FadeInView delay={0.4}>
            <div className="bg-secondary rounded-xl p-6 mb-10">
              <p className="text-sm text-muted-foreground mb-1">
                <strong className="text-foreground">Your privacy matters.</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                CareHalo360 is built to minimize data and protect dignity at every step.
              </p>
            </div>
          </FadeInView>

          {/* CTAs */}
          <FadeInView delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/how-it-works">Learn how CareHalo360 works</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact support</Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
