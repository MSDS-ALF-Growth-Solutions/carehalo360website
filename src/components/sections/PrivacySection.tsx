import SlideUpText from "@/components/animations/SlideUpText";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { FadeInView, ImageReveal, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";
import privacyImage from "@/assets/privacy-trust.jpg";

const whatWeDo = [
  "Process key signals on-device",
  "Use abstract motion understanding (not identity)",
  "Share only event-based alerts",
];

const whatWeDont = [
  "No facial recognition",
  "No selling personal data",
  "No constant video storage",
];

export default function PrivacySection() {
  return (
    <section className="section" id="privacy-section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <FadeInView>
              <SlideUpText as="h2" className="mb-6">Privacy is the foundation.</SlideUpText>
            </FadeInView>
            <FadeInView delay={0.1}>
              <p className="text-lg mb-8">
                CareHalo360 focuses on movement patterns, not identities. Core processing 
                happens on-device and is designed to minimize sensitive data exposure.
                We built CareHalo360 around dignity because safety should never come at 
                the cost of privacy.
              </p>
            </FadeInView>

            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              {/* What we do */}
              <StaggerContainer className="privacy-column" staggerDelay={0.1}>
                <h4 className="font-semibold mb-4">What we do</h4>
                {whatWeDo.map((item, index) => (
                  <StaggerItem key={index} className="privacy-item">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* What we don't do */}
              <StaggerContainer className="privacy-column" staggerDelay={0.1}>
                <h4 className="font-semibold mb-4">What we don't do</h4>
                {whatWeDont.map((item, index) => (
                  <StaggerItem key={index} className="privacy-item">
                    <div className="w-5 h-5 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-destructive" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <FadeInView delay={0.3}>
              <Button asChild variant="link" size="lg">
                <Link to="/privacy">Explore Privacy →</Link>
              </Button>
            </FadeInView>
          </div>

          {/* Image */}
          <ImageReveal delay={0.2}>
            <img
              src={privacyImage}
              alt="Elderly hands holding a warm cup of tea near a sunny window, conveying peace and dignity"
              className="care-image"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
