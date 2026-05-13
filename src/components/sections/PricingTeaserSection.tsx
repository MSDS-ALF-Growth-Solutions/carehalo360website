import SlideUpText from "@/components/animations/SlideUpText";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";

const features = [
  "Monthly subscription",
  "Hardware included",
  "Software updates included",
  "Cancel anytime",
];

export default function PricingTeaserSection() {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <FadeInView>
            <SlideUpText as="h2" className="mb-4">Simple pricing. No surprises.</SlideUpText>
          </FadeInView>
          <FadeInView delay={0.1}>
            <p className="text-lg mb-10">
              CareHalo360 is a monthly service designed for ongoing support with updates, 
              reliability, and help when you need it. Hardware is included with your plan.
            </p>
          </FadeInView>

          {/* Pricing preview card */}
          <FadeInView delay={0.2}>
            <div className="care-card max-w-md mx-auto mb-10">
              <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                {features.map((feature, index) => (
                  <StaggerItem key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeInView>

          <FadeInView delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg">
                <Link to="/waitlist">Join Waitlist</Link>
              </Button>
              <Button asChild variant="link" size="lg">
                <Link to="/pricing">View pricing →</Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
