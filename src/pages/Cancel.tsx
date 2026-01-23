import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import cancelImage from "@/assets/cancel/gentle-transition.jpg";

type Step = "form" | "confirm" | "done";

export default function Cancel() {
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("request-cancellation", {
        body: { email, name, reason },
      });

      if (fnError) {
        setError("Something went wrong. Please try again or contact support.");
        return;
      }

      if (data?.error) {
        setError(data.error);
        return;
      }

      if (data?.success) {
        setStep("done");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      setError("Something went wrong. Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    setStep("confirm");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Done state
  if (step === "done") {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Cancellation Requested | CareHalo360</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Header />
        <main className="flex-1">
          <section className="section">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="mb-6">Your cancellation request has been received.</h1>
                
                <div className="care-card text-left mb-10">
                  <h2 className="text-xl font-semibold mb-6">What happens next:</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium text-primary">1</span>
                      </div>
                      <span className="text-foreground">We'll process your request within 1 to 2 business days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium text-primary">2</span>
                      </div>
                      <span className="text-foreground">Your billing will stop once processed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium text-primary">3</span>
                      </div>
                      <span className="text-foreground">You'll receive device return instructions by email</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium text-primary">4</span>
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

  // Confirmation step
  if (step === "confirm") {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Confirm Cancellation | CareHalo360</title>
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

                <div className="bg-secondary rounded-xl p-6 mb-10 text-center">
                  <p className="text-foreground">
                    CareHalo360 is month-to-month.
                    <br />
                    There are no contracts and no penalties for canceling.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
                  <div>
                    <img
                      src={cancelImage}
                      alt="Calm home environment representing peaceful transitions"
                      className="care-image"
                    />
                  </div>

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

                <div className="text-center space-y-4">
                  <Button 
                    variant="hero" 
                    size="xl"
                    onClick={handleVerifyEmail}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Cancellation"
                    )}
                  </Button>

                  {error && (
                    <p className="text-destructive text-sm">{error}</p>
                  )}

                  <p className="text-sm text-muted-foreground">
                    <button 
                      onClick={() => setStep("form")} 
                      className="underline hover:text-foreground"
                    >
                      Go back
                    </button>
                    {" · "}
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

  // Initial form step
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
            <div className="max-w-xl mx-auto">
              <h1 className="text-center mb-4">Cancel Your Subscription</h1>
              <p className="text-center text-lg text-muted-foreground mb-10">
                Enter the email address you used when subscribing to CareHalo360.
              </p>

              <form onSubmit={handleProceedToConfirm} className="care-card space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Why are you canceling? (optional)</Label>
                  <Textarea
                    id="reason"
                    placeholder="Help us understand so we can improve..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    This helps us serve families better.
                  </p>
                </div>

                {error && (
                  <p className="text-destructive text-sm">{error}</p>
                )}

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Continue
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Changed your mind?{" "}
                  <Link to="/" className="underline hover:text-foreground">
                    Go back home
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
