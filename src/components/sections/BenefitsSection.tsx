import SlideUpText from "@/components/animations/SlideUpText";
import { Home, Shield, Zap } from "lucide-react";
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";

const benefits = [
  {
    icon: Home,
    title: "Designed for Real Homes",
    description: "Fits naturally into daily life without changing routines.",
  },
  {
    icon: Shield,
    title: "Privacy-First by Design",
    description: "No raw video storage. No identity tracking. Ever.",
  },
  {
    icon: Zap,
    title: "Always On, Never in the Way",
    description: "Quiet background monitoring with clear alerts when needed.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="section section-light">
      <div className="container">
        <FadeInView className="text-center mb-12">
          <SlideUpText as="h2" className="mb-4">Built for real homes. Built for trust.</SlideUpText>
        </FadeInView>

        <StaggerContainer className="card-grid" staggerDelay={0.15}>
          {benefits.map((benefit, index) => (
            <StaggerItem key={index} className="care-card text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeInView className="text-center mt-10" delay={0.3}>
          <p className="text-muted-foreground">
            Simple by design. Reliable by necessity.
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
