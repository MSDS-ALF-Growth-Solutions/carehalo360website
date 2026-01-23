import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Shield, Users } from "lucide-react";
import { FadeInView, HeroAnimation, HeroItem, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hardwareAcknowledged, setHardwareAcknowledged] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hardwareAcknowledged) {
      setError("Please acknowledge the hardware return policy to continue.");
      return;
    }

    if (!formData.email || !formData.firstName || !formData.lastName) {
      setError("Please check the highlighted fields and try again.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-checkout", {
        body: {
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          address: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: "US",
          },
        },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError("We couldn't process your request. Please check your details or try again.");
      console.error("Checkout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <HeroAnimation className="text-center mb-12">
            <HeroItem>
              <h1 className="mb-4">Complete your setup</h1>
            </HeroItem>
            <HeroItem>
              <p className="text-lg max-w-xl mx-auto">
                Start your CareHalo360 subscription today.
              </p>
            </HeroItem>
          </HeroAnimation>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Pricing Summary - Right on desktop, top on mobile */}
            <FadeInView className="lg:col-span-2 lg:order-2" delay={0.2}>
              <div className="care-card sticky top-24">
                <h3 className="text-lg font-semibold mb-1">CareHalo360 Monthly Subscription</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-semibold text-foreground">$49</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Billed monthly. Cancel anytime.
                </p>
                <p className="text-xs text-muted-foreground border-t border-border pt-4">
                  Hardware included.
                </p>
              </div>
            </FadeInView>

            {/* Form - Left on desktop, bottom on mobile */}
            <FadeInView className="lg:col-span-3 lg:order-1" delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Information */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Who is this for?</h2>
                    <p className="text-sm text-muted-foreground">
                      This helps us personalize setup and delivery.
                    </p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Home Details */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Home details</h2>
                    <p className="text-sm text-muted-foreground">
                      Used only to help configure your CareHalo360 setup.
                      <br />
                      We never sell or share personal data.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">ZIP code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Secure payment</h2>
                    <p className="text-sm text-muted-foreground">
                      Your payment is encrypted and processed securely.
                      <br />
                      We never store full payment details.
                    </p>
                  </div>
                </div>

                {/* Hardware Acknowledgment */}
                <div className="bg-secondary rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="hardware"
                      checked={hardwareAcknowledged}
                      onCheckedChange={(checked) => setHardwareAcknowledged(checked === true)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="hardware" className="text-sm leading-relaxed cursor-pointer">
                      I understand that CareHalo360 devices must be returned if I cancel my subscription to avoid a $250 replacement fee.
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground pl-7">
                    Returning devices is easy. No charge if returned.
                  </p>
                </div>

                {/* Trust Signals */}
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Privacy-first by design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Cancel anytime</span>
                  </div>
                </div>

                {/* Error State */}
                {error && (
                  <div className="bg-secondary border border-border rounded-xl p-4">
                    <p className="text-sm text-foreground">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Start CareHalo360"}
                </Button>

                {/* Legal Microcopy */}
                <p className="text-xs text-center text-muted-foreground">
                  By completing your purchase, you agree to our{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                    Privacy Policy
                  </a>.
                </p>

                {/* Safety Net */}
                <p className="text-sm text-center text-muted-foreground">
                  Questions? Our support team is here to help.{" "}
                  <a href="/contact" className="underline hover:text-foreground">
                    Contact support
                  </a>
                </p>
              </form>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
