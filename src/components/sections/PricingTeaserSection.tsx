import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
          <h2 className="mb-4">Simple pricing. No surprises.</h2>
          <p className="text-lg mb-10">
            CareHalo360 is a monthly service designed for ongoing support—updates, 
            reliability, and help when you need it. Hardware is included with your plan.
          </p>

          {/* Pricing preview card */}
          <div className="care-card max-w-md mx-auto mb-10">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/get-started">Get Started Now</Link>
            </Button>
            <Button asChild variant="link" size="lg">
              <Link to="/pricing">View pricing →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
