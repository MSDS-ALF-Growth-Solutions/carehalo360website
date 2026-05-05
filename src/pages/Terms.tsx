import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Service | CareHalo360</title>
        <meta
          name="description"
          content="CareHalo360 Terms of Service for facility customers and users of the CareHalo360 platform."
        />
        <link rel="canonical" href="https://carehalo360.com/terms" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="mb-4">Terms of Service</h1>
              <p className="text-sm text-muted-foreground mb-2">
                Effective date: May 5, 2026
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Last updated: May 5, 2026
              </p>
              <div className="bg-secondary rounded-xl p-4 mb-12">
                <p className="text-sm text-muted-foreground mb-0">
                  ⚠️ This page is provided as boilerplate appropriate for a B2B SaaS
                  company in Texas and is flagged for legal review before publication.
                </p>
              </div>

              <div className="prose prose-lg max-w-none space-y-10">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">1. Acceptance</h2>
                  <p className="text-muted-foreground">
                    By accessing or using CareHalo360 (the "Service"), provided by MSDS ALF
                    Growth Solutions Inc. ("CareHalo360," "we," "us"), you agree to be
                    bound by these Terms of Service ("Terms"). If you do not agree, do not
                    use the Service. These Terms incorporate by reference our{" "}
                    <Link to="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link to="/sms-terms" className="text-primary hover:underline">
                      SMS Terms
                    </Link>
                    .
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">2. Account responsibilities</h2>
                  <p className="text-muted-foreground">
                    Account owners are responsible for the accuracy of information provided
                    during onboarding, for safeguarding account credentials, and for all
                    activity that occurs under the account. Account owners certify that
                    each emergency contact added as a Notification Route has given prior
                    verbal or written consent to receive safety alerts.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">3. Acceptable use</h2>
                  <p className="text-muted-foreground mb-2">You agree not to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Use the Service for unlawful or harmful purposes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        Add contacts who have not consented to receive safety alerts.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        Send marketing, promotional, or non-emergency communications
                        through the Service.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        Reverse engineer, resell, or interfere with the Service or its
                        underlying infrastructure.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">4. Fees (facility customers)</h2>
                  <p className="text-muted-foreground">
                    Facility customers agree to pay all fees described in their order form
                    or subscription agreement. Fees are billed in advance, are
                    non-refundable except as required by law, and may be updated upon
                    renewal with prior notice.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">5. Termination</h2>
                  <p className="text-muted-foreground">
                    Either party may terminate use of the Service in accordance with the
                    applicable subscription agreement. We may suspend or terminate access
                    immediately for violations of these Terms, abuse, or activity that
                    creates legal or security risk. Upon termination, your right to use the
                    Service ceases and any provided hardware must be returned per the
                    applicable agreement.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">6. Disclaimers</h2>
                  <p className="text-muted-foreground">
                    The Service is provided "as is" and "as available" without warranties
                    of any kind, express or implied. CareHalo360 is not a medical device
                    and does not provide medical diagnosis, treatment, or emergency
                    response services. We do not guarantee that messages will be delivered
                    without delay or interruption. Use of the Service does not replace
                    caregiver or facility responsibility.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">7. Limitation of liability</h2>
                  <p className="text-muted-foreground">
                    To the maximum extent permitted by law, CareHalo360 and its affiliates
                    shall not be liable for any indirect, incidental, special,
                    consequential, or punitive damages, or any loss of profits, data, or
                    goodwill arising from or related to your use of the Service. Our
                    aggregate liability for any claim arising out of or relating to the
                    Service is limited to the fees paid by you to CareHalo360 in the twelve
                    (12) months preceding the claim.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">8. Governing law</h2>
                  <p className="text-muted-foreground">
                    These Terms are governed by the laws of the State of Texas, without
                    regard to conflict of law principles. The exclusive venue for any
                    dispute shall be the state or federal courts located in Montgomery
                    County, Texas.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">9. Contact</h2>
                  <p className="text-muted-foreground">
                    MSDS ALF Growth Solutions Inc.
                    <br />
                    24624 Interstate 45 N Suite 200
                    <br />
                    Spring, TX 77386
                    <br />
                    <a
                      href="mailto:hello@carehalo360.com"
                      className="text-primary hover:underline"
                    >
                      hello@carehalo360.com
                    </a>
                    <br />
                    +1 (281) 786-0005
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
