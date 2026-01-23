import { Home, Shield, Zap } from "lucide-react";

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
        <div className="text-center mb-12">
          <h2 className="mb-4">Built for real homes. Built for trust.</h2>
        </div>

        <div className="card-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="care-card text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-10">
          Simple by design. Reliable by necessity.
        </p>
      </div>
    </section>
  );
}
