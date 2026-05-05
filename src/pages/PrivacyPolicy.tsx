import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy | CareHalo360</title>
        <meta
          name="description"
          content="CareHalo360 Privacy Policy: how MSDS ALF Growth Solutions Inc. collects, uses, and protects information for the CareHalo360 service."
        />
        <link rel="canonical" href="https://carehalo360.com/privacy-policy" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="mb-4">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground mb-2">
                Effective date: May 5, 2026
              </p>
              <p className="text-sm text-muted-foreground mb-12">
                Last updated: May 5, 2026
              </p>

              <div className="prose prose-lg max-w-none space-y-10">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
                  <p className="text-muted-foreground">
                    This Privacy Policy describes how MSDS ALF Growth Solutions Inc.
                    ("we," "us," "CareHalo360") collects, uses, and protects information
                    when you use the CareHalo360 service. CareHalo360 is operated by MSDS
                    ALF Growth Solutions Inc., a Texas corporation. For
                    corporate information see{" "}
                    <a
                      href="https://alfgrowth.com"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://alfgrowth.com
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">2. Information we collect</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        <strong>Account owner information:</strong> name, email, phone,
                        role, facility affiliation.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        <strong>Resident information:</strong> name, room/unit, facility,
                        designated emergency events.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        <strong>Emergency contact information:</strong> name, phone number,
                        relationship to resident.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        <strong>Message logs:</strong> timestamps, delivery status,
                        opt-in/opt-out events.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">3. How we use information</h2>
                  <p className="text-muted-foreground mb-2">
                    We use the information solely to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Deliver emergency safety alerts to designated contacts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        Maintain a per-resident audit trail of consent, messages, and
                        opt-outs.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        Provide customer support to facilities and account owners.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">
                    4. SMS Communications and Mobile Information
                  </h2>
                  <div className="bg-secondary rounded-xl p-5 mb-4">
                    <p className="text-foreground mb-0">
                      No mobile information will be shared with third parties or affiliates
                      for marketing or promotional purposes. All the above categories
                      exclude text messaging originator opt-in data and consent; this
                      information will not be shared with any third parties.
                    </p>
                  </div>
                  <p className="text-muted-foreground">
                    We do not sell, rent, or trade mobile contact information. SMS opt-in
                    data and consent records are retained only for compliance and audit
                    purposes.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">5. How we share information</h2>
                  <p className="text-muted-foreground mb-2">
                    We share information only with:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        Service providers who deliver our SMS messages (e.g., Twilio) under
                        contract.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        The originating facility and account owner for the resident in
                        question.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>Authorities, where required by law.</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    We do not share contact information with advertisers, marketers, or
                    unrelated third parties.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">6. Data retention</h2>
                  <p className="text-muted-foreground">
                    We retain message logs and consent records for 4 years for
                    compliance. Contact records are removed when a contact opts out or is
                    removed from a Notification Route, except for the minimum audit record
                    required by carrier rules.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">7. Your rights</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        Opt out of SMS at any time (reply STOP, tap "Remove me," or contact
                        the account owner).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        Request deletion of your information by emailing{" "}
                        <a
                          href="mailto:privacy@carehalo360.com"
                          className="text-primary hover:underline"
                        >
                          privacy@carehalo360.com
                        </a>
                        .
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>
                        Request a copy of your information by emailing{" "}
                        <a
                          href="mailto:privacy@carehalo360.com"
                          className="text-primary hover:underline"
                        >
                          privacy@carehalo360.com
                        </a>
                        .
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">8. Children</h2>
                  <p className="text-muted-foreground">
                    CareHalo360 is not directed to children under 13 and does not knowingly
                    collect their information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">9. Security</h2>
                  <p className="text-muted-foreground">
                    We use industry-standard safeguards including encryption in transit,
                    access controls, and audit logging.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">10. Changes</h2>
                  <p className="text-muted-foreground">
                    We may update this Policy. We will post changes here with an updated
                    "Last updated" date.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">11. Contact</h2>
                  <p className="text-muted-foreground">
                    MSDS ALF Growth Solutions Inc.
                    <br />
                    24624 Interstate 45 N Suite 200
                    <br />
                    Spring, TX 77386
                    <br />
                    <a
                      href="mailto:privacy@carehalo360.com"
                      className="text-primary hover:underline"
                    >
                      privacy@carehalo360.com
                    </a>
                    <br />
                    +1 (281) 786-0005
                  </p>
                  <p className="text-muted-foreground mt-4 text-sm">
                    See also our{" "}
                    <Link to="/sms-terms" className="text-primary hover:underline">
                      SMS Terms
                    </Link>
                    .
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
