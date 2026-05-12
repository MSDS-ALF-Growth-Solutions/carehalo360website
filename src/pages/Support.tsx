import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Support() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Support — CareHalo360</title>
        <meta
          name="description"
          content="Get help with your CareHalo360 Device and app. Contact support, common help topics, and mailing address."
        />
        <link rel="canonical" href="https://carehalo360.com/support" />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="mb-4">Support</h1>
              <p className="text-lg text-muted-foreground mb-12">
                We're here to help you get the most out of your CareHalo360 Device and the CareHalo360 app.
              </p>

              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Contact us</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      Email:{" "}
                      <a href="mailto:support@carehalo360.com" className="text-primary hover:underline">
                        support@carehalo360.com
                      </a>
                    </li>
                    <li>
                      Phone:{" "}
                      <a href="tel:+18324977844" className="text-primary hover:underline">
                        +1 (832) 497-7844
                      </a>
                    </li>
                    <li>Hours: Monday–Friday, 9am–6pm Central</li>
                    <li>Average response time: within 1 business day</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Common help topics</h2>
                  <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                    <li>Setting up your CareHalo360 Device</li>
                    <li>Pairing the device with the CareHalo360 app</li>
                    <li>Adding and managing caregivers</li>
                    <li>Understanding alert notifications and the "Press 1 to acknowledge" call</li>
                    <li>Privacy controls and the consent toggle</li>
                    <li>Billing, subscription, and pilot program questions</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Mailing address</h2>
                  <address className="not-italic text-muted-foreground">
                    MSDS ALF Growth Solutions Inc.
                    <br />
                    8202 Aleppo Pine Ln
                    <br />
                    Cypress, TX 77433
                    <br />
                    United States
                  </address>
                </section>

                <nav className="pt-8 border-t border-border flex flex-wrap gap-6">
                  <Link to="/privacy-policy" className="text-sm text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-sm text-primary hover:underline">
                    Terms
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
