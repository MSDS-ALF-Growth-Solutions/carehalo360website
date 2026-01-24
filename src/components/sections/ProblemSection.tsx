import { FadeInView, ImageReveal } from "@/components/animations/MotionElements";
import careMomentImage from "@/assets/care-moment.jpg";

export default function ProblemSection() {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <ImageReveal>
            <img
              src={careMomentImage}
              alt="Adult son helping his older mother prepare tea in a bright kitchen"
              className="care-image"
            />
          </ImageReveal>

          {/* Content */}
          <div>
            <FadeInView>
              <h2 className="mb-6">
                Caring is love. Worry is the part nobody talks about.
              </h2>
            </FadeInView>
            <FadeInView delay={0.1}>
              <p className="text-lg mb-6">
                Caring for someone at home can feel like you're always on alert, especially 
                when you're not in the same room, or not in the same city.
              </p>
            </FadeInView>
            <FadeInView delay={0.2}>
              <p className="text-lg mb-8">
                CareHalo360 reduces uncertainty by giving you calm awareness when something 
                looks unusual, without turning your home into a surveillance zone.
              </p>
            </FadeInView>
            
            {/* Note */}
            <FadeInView delay={0.3}>
              <div className="bg-background rounded-xl p-4 border border-border">
                <p className="text-sm text-muted-foreground italic">
                  CareHalo360 supports caregivers and families. It does not replace them.
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
