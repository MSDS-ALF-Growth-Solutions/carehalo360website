import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy | CareHalo360</title>
        <meta 
          name="description" 
          content="CareHalo360 Privacy Policy. Learn what data we collect, what we don't, and how we protect your privacy." 
        />
        <link rel="canonical" href="https://carehalo360.com/privacy-policy" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="mb-4">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground mb-12">Last updated: January 2026</p>

              <div className="prose prose-lg max-w-none space-y-10">
                {/* Intro */}
                <div className="bg-secondary rounded-xl p-6">
                  <p className="text-foreground text-lg mb-0">
                    CareHalo360 is built on a simple belief:
                    <br />
                    <strong>Privacy is a responsibility, not a feature.</strong>
                  </p>
                </div>

                <p className="text-muted-foreground">
                  This Privacy Policy explains what we collect, what we don't, and how we protect your information.
                </p>

                {/* Information We Collect */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    We collect only what is necessary to provide and support the CareHalo360 service.
                  </p>
                  <p className="text-muted-foreground mb-2">This may include:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Account information (name, email, address)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Device configuration data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Safety event notifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Customer support communications</span>
                    </li>
                  </ul>
                </div>

                {/* What We Do NOT Collect */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">What We Do NOT Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    CareHalo360 is intentionally designed to avoid sensitive data.
                  </p>
                  <p className="text-muted-foreground mb-2">We do not:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Store or transmit identifiable video</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Use facial recognition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Track identities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Sell or share personal data</span>
                    </li>
                  </ul>
                </div>

                {/* How Data Is Used */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">How Data Is Used</h2>
                  <p className="text-muted-foreground mb-2">Information is used only to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Provide safety alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Support system functionality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Improve service reliability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Communicate with customers</span>
                    </li>
                  </ul>
                </div>

                {/* Data Processing & Security */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Data Processing and Security</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Core processing occurs on-device whenever possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Data transmission is minimized</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Industry-standard security practices are used</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Access is restricted to authorized personnel only</span>
                    </li>
                  </ul>
                </div>

                {/* Sharing of Information */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Sharing of Information</h2>
                  <p className="text-muted-foreground mb-4">
                    We do not sell personal data.
                  </p>
                  <p className="text-muted-foreground mb-2">Information is shared only:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>With service providers necessary to operate CareHalo360</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>When legally required</span>
                    </li>
                  </ul>
                </div>

                {/* Your Choices */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
                  <p className="text-muted-foreground mb-2">You may:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Access your account information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Cancel your subscription at any time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Request deletion of account data (subject to legal obligations)</span>
                    </li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                  <p className="text-muted-foreground">
                    If you have questions about privacy:
                    <br />
                    <a href="mailto:support@carehalo360.com" className="text-primary hover:underline">
                      support@carehalo360.com
                    </a>
                  </p>
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
