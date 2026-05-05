import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SmsTerms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>SMS Terms | CareHalo360 Emergency Alerts</title>
        <meta
          name="description"
          content="CareHalo360 Emergency Alerts SMS/MMS program terms: opt-in, opt-out, message frequency, costs, and operator information."
        />
        <link rel="canonical" href="https://carehalo360.com/sms-terms" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="mb-4">SMS Terms</h1>
              <p className="text-sm text-muted-foreground mb-12">
                CareHalo360 Emergency Alerts — SMS/MMS Program
              </p>

              <div className="prose prose-lg max-w-none space-y-10">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Program Name</h2>
                  <p className="text-muted-foreground">CareHalo360 Emergency Alerts</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Program Description</h2>
                  <p className="text-muted-foreground">
                    CareHalo360 sends SMS/MMS emergency safety alerts to contacts
                    ("Notification Routes") who have been added by a verified account owner
                    during onboarding. Messages relate to a specific elderly resident being
                    monitored in their home by an in-home CareHalo360 AI safety camera, and
                    may include incident notifications, snapshot images from the time of an
                    event, escalation notices, and device-status updates.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">How users opt in</h2>
                  <p className="text-muted-foreground">
                    End users consent to receive SMS/MMS by being added as an emergency
                    contact ("Notification Route") on a CareHalo360 monitoring account by
                    the verified account owner during onboarding at{" "}
                    <a
                      href="https://app.carehalo360.com"
                      className="text-primary hover:underline"
                    >
                      https://app.carehalo360.com
                    </a>
                    . Account owners must affirmatively certify in the onboarding flow that
                    each contact they add has given prior verbal or written consent to
                    receive emergency safety alerts about a specific monitored resident.
                    The first message every new contact receives is a confirmation SMS
                    welcoming them to CareHalo360 alerts for that named resident, with
                    explicit opt-out instructions. Contacts can revoke consent at any time
                    by replying STOP to any message, by tapping the "Remove me" link in any
                    SMS, or by being removed from the route by the account owner via the
                    mobile app. CareHalo360 does not market, share, or sell contact
                    information; routes are scoped per-resident and used solely for safety
                    notifications.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Sample first (welcome) message</h2>
                  <div className="bg-secondary rounded-xl p-5">
                    <p className="text-foreground mb-0">
                      Welcome to CareHalo360 alerts for John D. You will receive
                      emergency safety notifications from this number for John. Reply STOP
                      to opt out, HELP for help. Msg & data rates may apply.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Sample event message</h2>
                  <div className="bg-secondary rounded-xl p-5">
                    <p className="text-foreground mb-0">
                      CareHalo360 ALERT: A possible fall was detected for John D. at
                      7:42 PM. Open the CareHalo360 app to acknowledge or call John. More
                      info: https://carehalo360.com/contact Reply STOP to opt out.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Message frequency</h2>
                  <p className="text-muted-foreground">
                    Message frequency varies based on resident safety events.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Cost</h2>
                  <p className="text-muted-foreground">Msg & data rates may apply.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Opt-out</h2>
                  <p className="text-muted-foreground">
                    Reply STOP to any message to unsubscribe. You may also tap the "Remove
                    me" link in any SMS, or ask the account owner to remove you from the
                    route.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Help</h2>
                  <p className="text-muted-foreground">
                    Reply HELP for help, or contact{" "}
                    <a
                      href="mailto:support@carehalo360.com"
                      className="text-primary hover:underline"
                    >
                      support@carehalo360.com
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Carrier disclaimer</h2>
                  <p className="text-muted-foreground">
                    Carriers are not liable for delayed or undelivered messages.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Privacy</h2>
                  <p className="text-muted-foreground">
                    See our{" "}
                    <Link to="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Operator</h2>
                  <p className="text-muted-foreground">
                    CareHalo360 is operated by MSDS ALF Growth Solutions Inc., 24624
                    Interstate 45 N Suite 200, Spring, TX 77386.
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
