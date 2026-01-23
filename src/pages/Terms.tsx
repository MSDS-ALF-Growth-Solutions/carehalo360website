import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms and Conditions | CareHalo360</title>
        <meta 
          name="description" 
          content="CareHalo360 Terms and Conditions. Read our service terms, subscription details, and user responsibilities." 
        />
        <link rel="canonical" href="https://carehalo360.com/terms" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="mb-4">Terms and Conditions</h1>
              <p className="text-sm text-muted-foreground mb-12">Last updated: January 2026</p>

              <div className="prose prose-lg max-w-none space-y-10">
                <p className="text-muted-foreground">
                  By using CareHalo360, you agree to these Terms and Conditions.
                </p>

                {/* Service Description */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
                  <p className="text-muted-foreground mb-4">
                    CareHalo360 provides a home safety monitoring service designed to support awareness and caregiving.
                  </p>
                  <p className="text-muted-foreground">
                    CareHalo360 is not a medical device and does not provide medical diagnosis, treatment, or emergency response services.
                  </p>
                </div>

                {/* Subscription & Billing */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Subscription and Billing</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>CareHalo360 is billed monthly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Subscription is month-to-month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>You may cancel at any time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>No refunds for partial billing periods</span>
                    </li>
                  </ul>
                </div>

                {/* Hardware Use & Return */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Hardware Use and Return</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Devices are provided as part of the subscription</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Devices remain the property of CareHalo360</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Devices must be returned upon cancellation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Failure to return devices may result in a $250 replacement fee</span>
                    </li>
                  </ul>
                </div>

                {/* User Responsibilities */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
                  <p className="text-muted-foreground mb-2">You agree to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Use the service for lawful purposes only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Not misuse, resell, or tamper with devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Maintain a safe home environment</span>
                    </li>
                  </ul>
                </div>

                {/* Limitations of Liability */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Limitations of Liability</h2>
                  <p className="text-muted-foreground mb-4">
                    CareHalo360 provides supportive awareness, not guarantees.
                  </p>
                  <p className="text-muted-foreground mb-2">We are not responsible for:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Missed events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Injuries or damages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Internet or power interruptions</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Use of CareHalo360 does not replace caregiver responsibility.
                  </p>
                </div>

                {/* Termination */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Termination</h2>
                  <p className="text-muted-foreground">
                    We may suspend or terminate service for misuse or violations of these terms.
                  </p>
                </div>

                {/* Governing Law */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                  <p className="text-muted-foreground">
                    These terms are governed by the laws of the State of Texas.
                  </p>
                </div>

                {/* Contact */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                  <p className="text-muted-foreground">
                    Questions regarding these terms:
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
