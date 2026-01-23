import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import eveningImage from "@/assets/evening-peace.jpg";

export default function FinalCTASection() {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="mb-6">Care is being there—without hovering.</h2>
            <p className="text-lg mb-8">
              CareHalo360 helps you stay aware of what matters, while your loved one 
              keeps their independence and dignity.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/get-started">Get Started Now</Link>
            </Button>
          </div>

          {/* Image */}
          <div>
            <img
              src={eveningImage}
              alt="Older adult peacefully resting on a couch in warm evening light, conveying safety and calm"
              className="care-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
