import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
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
    <section className="section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="mb-6">Privacy is the foundation.</h2>
            <p className="text-lg mb-8">
              CareHalo360 focuses on movement patterns, not identities. Core processing 
              happens on-device and is designed to minimize sensitive data exposure.
              We built CareHalo360 around dignity—because safety should never come at 
              the cost of privacy.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              {/* What we do */}
              <div className="privacy-column">
                <h4 className="font-semibold mb-4">What we do</h4>
                {whatWeDo.map((item, index) => (
                  <div key={index} className="privacy-item">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* What we don't do */}
              <div className="privacy-column">
                <h4 className="font-semibold mb-4">What we don't do</h4>
                {whatWeDont.map((item, index) => (
                  <div key={index} className="privacy-item">
                    <div className="w-5 h-5 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-destructive" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild variant="link" size="lg">
              <Link to="/privacy">Explore Privacy →</Link>
            </Button>
          </div>

          {/* Image */}
          <div>
            <img
              src={privacyImage}
              alt="Elderly hands holding a warm cup of tea near a sunny window, conveying peace and dignity"
              className="care-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
