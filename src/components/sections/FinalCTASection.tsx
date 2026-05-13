import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeInView, ImageReveal } from "@/components/animations/MotionElements";
import eveningImage from "@/assets/evening-peace.jpg";

export default function FinalCTASection() {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <FadeInView>
              <SlideUpText as="h2" className="mb-6">Care is being there, without hovering.</SlideUpText>
            </FadeInView>
            <FadeInView delay={0.1}>
              <p className="text-lg mb-8">
                CareHalo360 helps you stay aware of what matters, while your loved one 
                keeps their independence and dignity.
              </p>
            </FadeInView>
            <FadeInView delay={0.2}>
              <Button asChild variant="hero" size="xl">
                <Link to="/waitlist">Join Waitlist</Link>
              </Button>
            </FadeInView>
          </div>

          {/* Image */}
          <ImageReveal delay={0.2}>
            <img
              src={eveningImage}
              alt="Older adult peacefully resting on a couch in warm evening light, conveying safety and calm"
              className="care-image"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
