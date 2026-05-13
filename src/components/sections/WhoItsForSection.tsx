import SlideUpText from "@/components/animations/SlideUpText";
import { Heart, MapPin, Stethoscope, Brain } from "lucide-react";
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";

const audiences = [
  {
    icon: Heart,
    title: "Aging parents living independently",
    pain: "Want to stay home, but family worries.",
    benefit: "CareHalo360 supports independence with quiet awareness.",
  },
  {
    icon: MapPin,
    title: "Long-distance family caregivers",
    pain: "Can't be there every day.",
    benefit: "Stay informed without constant check-ins.",
  },
  {
    icon: Stethoscope,
    title: "Recovery after surgery or hospitalization",
    pain: "Need extra support during healing.",
    benefit: "Gentle monitoring during the critical transition home.",
  },
  {
    icon: Brain,
    title: "Early cognitive support",
    pain: "Changes can be subtle and gradual.",
    benefit: "Pattern awareness that helps spot changes early.",
  },
];

export default function WhoItsForSection() {
  return (
    <section className="section">
      <div className="container">
        <FadeInView className="text-center mb-12">
          <SlideUpText as="h2" className="mb-4">Made for families supporting care at home.</SlideUpText>
        </FadeInView>

        <StaggerContainer className="card-grid-4" staggerDelay={0.1}>
          {audiences.map((audience, index) => (
            <StaggerItem key={index} className="care-card">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <audience.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{audience.title}</h3>
              <p className="text-sm text-muted-foreground italic mb-2">{audience.pain}</p>
              <p className="text-sm text-muted-foreground">{audience.benefit}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
