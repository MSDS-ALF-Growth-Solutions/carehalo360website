import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import cancelImage from "@/assets/cancel/gentle-transition.jpg";

export default function Cancel() {
  const [isCanceled, setIsCanceled] = useState(false);

  const handleConfirmCancel = () => {
    setIsCanceled(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isCanceled) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Subscription Canceled | CareHalo360</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Header />
        <main className="flex-1">
          <section className="section">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="mb-6">Your subscription has been canceled.</h1>
                
                <div className="care-card text-left mb-10">
                  <h2 className="text-xl font-semibold mb-6">What happens next:</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium text-primary">1</span>
                      </div>
                      <span className="text-foreground">Your billing will stop immediately</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium text-primary">2</span>
                      </div>
                      <span className="text-foreground">You'll receive device return instructions by email</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium text-primary">3</span>
                      </div>
                      <span className="text-foreground">Support remains available if you need help</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary rounded-xl p-6 mb-10">
                  <p className="text-muted-foreground">
                    Thank you for trusting CareHalo360. Care always comes first.
                  </p>
                </div>

                <Button asChild variant="outline" size="lg">
                  <Link to="/">Return Home</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Cancel Subscription | CareHalo360</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-center mb-4">Before you go</h1>
              <p className="text-center text-lg mb-12 max-w-xl mx-auto">
                We understand that needs change. We want to make this easy and fair.
              </p>

              {/* Reassurance Block */}
              <div className="bg-secondary rounded-xl p-6 mb-10 text-center">
                <p className="text-foreground">
                  CareHalo360 is month-to-month.
                  <br />
                  There are no contracts and no penalties for canceling.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
                {/* Image */}
                <div>
                  <img
                    src={cancelImage}
                    alt="Calm home environment representing peaceful transitions"
                    className="care-image"
                  />
                </div>

                {/* Value Reminder */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">A quick reminder of what CareHalo360 does</h2>
                    <p className="text-muted-foreground mb-6">
                      CareHalo360 quietly supports safety at home without wearables, without constant monitoring, and without compromising privacy.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Many families choose to keep it active during transitions, recovery periods, or temporary uncertainty.
                    </p>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/">Keep CareHalo360 Active</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hardware Return */}
              <div className="care-card mb-10">
                <h2 className="text-xl font-semibold mb-6">About your CareHalo360 device(s)</h2>
                <p className="text-muted-foreground mb-6">
                  If you cancel, we'll send simple return instructions.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">Return the devices: No additional charges</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-foreground">Devices not returned: One-time $250 replacement fee</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Returns are straightforward, and we're happy to help if you need it.
                </p>
              </div>

              {/* Final Actions */}
              <div className="text-center space-y-4">
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={handleConfirmCancel}
                >
                  Confirm Cancellation
                </Button>
                <p className="text-sm text-muted-foreground">
                  <Link to="/contact" className="underline hover:text-foreground">
                    Contact support for help
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
