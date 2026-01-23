import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Mail } from "lucide-react";
import accessibilityImage from "@/assets/accessibility/inclusive-home.jpg";

export default function Accessibility() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Accessibility Statement | CareHalo360</title>
        <meta
          name="description"
          content="CareHalo360 is committed to accessibility and inclusive design. Learn how we support users of all abilities."
        />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-center mb-4">Accessibility Statement</h1>
              <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                Inclusive by design.
              </p>

              <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                <div>
                  <img
                    src={accessibilityImage}
                    alt="Warm inclusive home environment"
                    className="care-image"
                  />
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    CareHalo360 is committed to making our website and services accessible to as many people as possible.
                  </p>
                  <p className="text-muted-foreground">
                    We believe care technology should be usable, respectful, and inclusive.
                  </p>
                </div>
              </div>

              <div className="care-card mb-12">
                <h2 className="text-xl font-semibold mb-6">Our Commitment</h2>
                <p className="text-muted-foreground mb-6">We strive to:</p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">Use clear, readable language</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">Maintain accessible color contrast</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">Support keyboard navigation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">Ensure compatibility with assistive technologies</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  Accessibility is an ongoing effort, and we continue to improve.
                </p>
              </div>

              <div className="bg-secondary rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Need Help?</h2>
                    <p className="text-muted-foreground mb-4">
                      If you experience difficulty accessing any part of our website or service, please contact us:
                    </p>
                    <a
                      href="mailto:support@carehalo360.com"
                      className="text-primary hover:underline font-medium"
                    >
                      support@carehalo360.com
                    </a>
                    <p className="text-muted-foreground mt-4">
                      We take accessibility feedback seriously and aim to respond promptly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
