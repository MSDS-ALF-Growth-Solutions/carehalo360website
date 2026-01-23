import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Mail, RefreshCw } from "lucide-react";
import securityImage from "@/assets/security/trust-abstract.jpg";

export default function Security() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Security at CareHalo360 | Data Protection & Trust</title>
        <meta
          name="description"
          content="Learn how CareHalo360 approaches data security and privacy with care, responsibility, and transparency."
        />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-center mb-4">Security at CareHalo360</h1>
              <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                Built with care. Protected with intention.
              </p>

              <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                <div>
                  <img
                    src={securityImage}
                    alt="Abstract illustration of protection and trust"
                    className="care-image"
                  />
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Security is a responsibility we take seriously.
                  </p>
                  <p className="text-muted-foreground">
                    CareHalo360 is designed to minimize data collection and protect sensitive information through thoughtful system design.
                  </p>
                </div>
              </div>

              <div className="care-card mb-12">
                <h2 className="text-xl font-semibold mb-6">Our Approach to Security</h2>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">Minimal data collection by design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">On-device processing whenever possible</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">Encrypted data transmission</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">Restricted internal access</span>
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  We focus on reducing exposure, not just reacting to threats.
                </p>
              </div>

              <div className="care-card mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Continuous Improvement</h2>
                    <p className="text-muted-foreground">
                      Security is not static. We regularly review and improve our systems to align with best practices and evolving standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Questions?</h2>
                    <p className="text-muted-foreground mb-4">
                      If you have questions about security or data protection, contact us at:
                    </p>
                    <a
                      href="mailto:support@carehalo360.com"
                      className="text-primary hover:underline font-medium"
                    >
                      support@carehalo360.com
                    </a>
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
