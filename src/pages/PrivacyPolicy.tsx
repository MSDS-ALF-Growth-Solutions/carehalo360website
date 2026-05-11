import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy — CareHalo360</title>
        <meta
          name="description"
          content="CareHalo360 Privacy Policy — how we collect, use, and protect your data."
        />
        <link rel="canonical" href="https://carehalo360.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy — CareHalo360" />
        <meta
          property="og:description"
          content="CareHalo360 Privacy Policy — how we collect, use, and protect your data."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://carehalo360.com/privacy-policy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy — CareHalo360" />
        <meta
          name="twitter:description"
          content="CareHalo360 Privacy Policy — how we collect, use, and protect your data."
        />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> Back to home
              </Link>

              <article className="prose prose-lg max-w-none">
                <h1 className="mb-2">Privacy Policy</h1>
                <p className="text-base font-semibold mb-1">CareHalo360</p>
                <p className="text-sm text-muted-foreground mb-1">
                  Effective date: 2026-05-08
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  Last updated: 2026-05-10
                </p>

                <p className="text-muted-foreground mb-4">
                  MSDS ALF Growth Solutions Inc. ("CareHalo360", "we", "our", "us")
                  provides the CareHalo360 mobile application and the CareHalo360 Device
                  (collectively, the "Service"). This Privacy Policy explains what
                  information we collect, how we use it, who we share it with, and the
                  choices you have. We designed CareHalo360 to collect the minimum
                  information necessary to deliver fall-detection alerts and to keep
                  that information secure.
                </p>
                <p className="text-muted-foreground mb-10">
                  If you have any questions, contact us at{" "}
                  <a href="mailto:support@carehalo360.com" className="text-primary hover:underline font-semibold">
                    support@carehalo360.com
                  </a>
                  .
                </p>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">1. Information we collect</h2>

                <h3 className="text-xl font-semibold mt-6 mb-3">a) Account information you provide</h3>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li><strong>Email address</strong> — used as your sign-in identifier.</li>
                  <li><strong>Name</strong> — optional, used as a friendly label in alerts.</li>
                  <li><strong>Phone numbers and other contact destinations</strong> — only those you explicitly add as caregiver routes (for example, a family member's phone for voice alerts, or a team chat channel for facility staff).</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">b) Resident information you create</h3>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li><strong>Resident display name and resident code</strong> — labels you assign to the people being monitored.</li>
                  <li><strong>Household / facility name</strong> — the account label.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">c) Device information</h3>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li><strong>CareHalo360 Device identifier and pairing token</strong> — to associate a device with a resident.</li>
                  <li><strong>Device LAN IP and heartbeat status</strong> — to confirm the device is online.</li>
                  <li><strong>Mobile device push token</strong> — provided by Apple Push Notification service (iOS) or Firebase Cloud Messaging (Android) so we can deliver alerts.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">d) Fall events</h3>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li><strong>Fall incident records</strong> — timestamp, state transitions, acknowledgement and resolution events.</li>
                  <li><strong>Evidence snapshots</strong> — short still images captured at the moment of a detected fall, stored briefly so caregivers can verify the event. Snapshots <strong>automatically expire and are deleted within 7 days</strong> of capture.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">e) Technical and diagnostic data</h3>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li>App version, OS version, crash logs (aggregated, no personal content).</li>
                  <li>API request logs containing the user identifier and the action performed (used for security and debugging; retained 30 days).</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">f) What we <strong>do not</strong> collect</h3>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li>We do <strong>not</strong> stream live video from the CareHalo360 Device to our servers. AI fall detection runs entirely on the device. Only the short evidence snapshots described above are uploaded, and only when a fall is detected.</li>
                  <li>We do <strong>not</strong> track your location.</li>
                  <li>We do <strong>not</strong> access your contacts, photos, microphone, or other unrelated data.</li>
                  <li>We do <strong>not</strong> use third-party advertising trackers.</li>
                </ul>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">2. How we use your information</h2>
                <p className="text-muted-foreground mb-3">We use the information we collect to:</p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li>Deliver real-time fall alerts to the caregiver destinations you configure.</li>
                  <li>Keep your residents' devices online and notify you if one goes offline.</li>
                  <li>Authenticate you and protect your account from unauthorized access.</li>
                  <li>Diagnose and fix bugs, monitor service health, and improve detection accuracy.</li>
                  <li>Comply with legal obligations.</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We do <strong>not</strong> use your data to train third-party AI models. We do <strong>not</strong> sell your data, ever.
                </p>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">3. Who we share information with</h2>
                <p className="text-muted-foreground mb-3">
                  We share information only with service providers who help us deliver the Service, and only the minimum necessary:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li><strong>Cloud infrastructure (Amazon Web Services, U.S. region)</strong> — hosts our database and stores evidence snapshots. Encrypted at rest.</li>
                  <li><strong>Voice and SMS provider (Twilio Inc.)</strong> — places phone calls and sends SMS alerts when a fall is detected.</li>
                  <li><strong>Push notification providers (Apple Push Notification service for iOS and Firebase Cloud Messaging for Android, routed via the Expo Push Service)</strong> — deliver push notifications to your phone. Only the alert payload (resident code, incident state, and incident identifier) is sent through these providers; no health-related content beyond what is necessary to render the alert.</li>
                  <li><strong>Team chat provider (where you have configured one)</strong> — receives the alerts you have explicitly opted to send there.</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We do <strong>not</strong> sell or rent your information to anyone. We do not allow these providers to use your data for any purpose other than delivering the Service to you.
                </p>
                <p className="text-muted-foreground mt-4">
                  If we are required by law (subpoena, court order) to disclose information, we will do so only to the extent legally required and will notify you when permitted.
                </p>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">4. Data retention</h2>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li><strong>Evidence snapshots</strong> — auto-deleted within 7 days of capture.</li>
                  <li><strong>Account and resident records</strong> — retained for the life of your subscription, plus 90 days after cancellation, after which they are permanently deleted unless you request earlier deletion.</li>
                  <li><strong>API request logs</strong> — 30 days, then deleted.</li>
                  <li><strong>Aggregate analytics</strong> (e.g. number of falls detected per month, with no personal identifiers) — retained indefinitely for service improvement.</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  You may request immediate deletion of your data at any time — see Section 7.
                </p>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">5. Security</h2>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li>All data is encrypted in transit (TLS 1.2+) and at rest (AES-256).</li>
                  <li>Passwords are hashed with bcrypt; we never store plain-text passwords.</li>
                  <li>Access to production data is limited to engineering staff under principle of least privilege and is logged.</li>
                  <li>We perform regular security reviews and apply patches to our infrastructure.</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  No system is perfectly secure. If we ever experience a data breach affecting your information, we will notify you within 72 hours by email and through the app.
                </p>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">6. HIPAA and healthcare contexts</h2>
                <p className="text-muted-foreground mb-4">
                  CareHalo360 is <strong>not</strong> a medical device and does not diagnose, treat, or prevent any condition. It is a fall-detection alerting tool.
                </p>
                <p className="text-muted-foreground">
                  We design the Service to be safe to use in HIPAA-regulated environments, but we are not a HIPAA Covered Entity. If you are a Covered Entity and need a Business Associate Agreement (BAA), contact us at{" "}
                  <a href="mailto:support@carehalo360.com" className="text-primary hover:underline font-semibold">support@carehalo360.com</a>{" "}
                  and we will work with you to put one in place.
                </p>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">7. Your rights and choices</h2>
                <p className="text-muted-foreground mb-3">You can:</p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li><strong>Access</strong> your data — request a copy at any time.</li>
                  <li><strong>Correct</strong> your data — edit your name, email, and resident details directly in the app.</li>
                  <li><strong>Delete</strong> your data — request full deletion via the app's "Delete Resident" action, or email <a href="mailto:support@carehalo360.com" className="text-primary hover:underline font-semibold">support@carehalo360.com</a> for full account deletion.</li>
                  <li><strong>Export</strong> your data — request an export in JSON format at <a href="mailto:support@carehalo360.com" className="text-primary hover:underline font-semibold">support@carehalo360.com</a>.</li>
                  <li><strong>Opt out</strong> of any alert channel — disable the channel in the app's caregiver settings.</li>
                  <li><strong>Withdraw consent</strong> — uninstall the app and ask us to delete your account.</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  We will respond to verified requests within 30 days. We will never charge you for exercising these rights.
                </p>
                <p className="text-muted-foreground mt-4">
                  If you are a California resident, you have additional rights under the CCPA, including the right to know what personal information we have collected about you. We do not sell your personal information.
                </p>
                <p className="text-muted-foreground mt-4">
                  If you are a resident of the European Economic Area, the United Kingdom, or another jurisdiction with comprehensive privacy laws, you have rights under those laws (such as the GDPR) and can exercise them by contacting us.
                </p>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">8. Children's privacy</h2>
                <p className="text-muted-foreground">
                  CareHalo360 is not directed to children under 13, and we do not knowingly collect data from children. The Service is intended for use by caregivers monitoring adult or elderly residents. If you believe a child has provided us information, contact us and we will delete it.
                </p>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">9. International users</h2>
                <p className="text-muted-foreground">
                  We are based in the United States, and our servers are located in the United States (AWS us-east-1). If you use the Service from outside the U.S., you consent to your information being transferred to and processed in the United States, where data protection laws may differ from those in your country.
                </p>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">10. Changes to this policy</h2>
                <p className="text-muted-foreground">
                  If we make material changes to this policy, we will notify you by email and in the app at least 30 days before the changes take effect. Continued use of the Service after the effective date constitutes acceptance.
                </p>

                <hr className="my-10 border-border" />

                <h2 className="text-2xl font-semibold mt-10 mb-4">11. Contact us</h2>
                <p className="text-muted-foreground">
                  <strong>MSDS ALF Growth Solutions Inc.</strong>
                  <br />
                  Email:{" "}
                  <a href="mailto:support@carehalo360.com" className="text-primary hover:underline font-semibold">
                    support@carehalo360.com
                  </a>
                  <br />
                  Phone: <strong>+1 (832) 497-7844</strong>
                </p>
                <p className="text-muted-foreground mt-4">
                  For privacy-specific inquiries:{" "}
                  <a href="mailto:privacy@carehalo360.com" className="text-primary hover:underline font-semibold">
                    privacy@carehalo360.com
                  </a>
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
