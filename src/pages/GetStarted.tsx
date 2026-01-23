import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <PageLayout 
      title="Get Started with CareHalo360" 
      subtitle="Begin your journey to peace of mind."
    >
      <div className="max-w-xl mx-auto text-center">
        <div className="care-card">
          <p className="text-muted-foreground mb-6">
            We're currently onboarding families for our early access program. 
            Leave your details and we'll be in touch soon.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
