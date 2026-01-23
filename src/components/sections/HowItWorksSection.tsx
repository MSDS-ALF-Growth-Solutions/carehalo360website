import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Eye, Cpu, Bell } from "lucide-react";
import homeInteriorImage from "@/assets/home-interior.jpg";

const steps = [
  {
    icon: Settings,
    title: "Set up in minutes",
    description: "Simple installation with no complicated wiring or technical expertise required.",
  },
  {
    icon: Eye,
    title: "Passive monitoring",
    description: "Observes patterns of daily life without capturing personal details or identities.",
  },
  {
    icon: Cpu,
    title: "On-device intelligence",
    description: "Core processing happens locally, keeping sensitive data where it belongs—at home.",
  },
  {
    icon: Bell,
    title: "Smart alerts when it matters",
    description: "Get notified about unusual activity, not every routine moment.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-4">How CareHalo360 works</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Simple, thoughtful technology that stays out of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Steps */}
          <div className="card-grid-4 lg:grid-cols-2">
            {steps.map((step, index) => (
              <div key={index} className="care-card">
                <step.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Image */}
          <div>
            <img
              src={homeInteriorImage}
              alt="Minimal modern home hallway with warm natural lighting and subtle smart home aesthetic"
              className="care-image"
            />
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="link" size="lg">
            <Link to="/how-it-works">Learn more about how it works →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
