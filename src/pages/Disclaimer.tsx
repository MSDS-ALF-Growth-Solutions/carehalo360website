import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, X, AlertTriangle } from "lucide-react";
import disclaimerImage from "@/assets/disclaimer/peaceful-evening.jpg";

export default function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CareHalo360 Disclaimer | Important Safety Information</title>
        <meta
          name="description"
          content="CareHalo360 provides safety awareness, not medical or emergency services. Learn what our service does and does not provide."
        />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-center mb-4">Important Disclaimer</h1>
              <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                Supportive technology, not emergency response.
              </p>

              <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                <div>
                  <img
                    src={disclaimerImage}
                    alt="Peaceful home interior in the evening"
                    className="care-image"
                  />
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    CareHalo360 is designed to provide safety awareness and situational support for families caring at home.
                  </p>
                  <p className="text-muted-foreground font-medium">
                    It is not a medical device and not an emergency response system.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="care-card">
                  <h2 className="text-xl font-semibold mb-6">What CareHalo360 Does</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">Provides safety-related alerts based on movement patterns</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">Supports families with awareness</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">Complements caregiving efforts</span>
                    </li>
                  </ul>
                </div>

                <div className="care-card">
                  <h2 className="text-xl font-semibold mb-6">What CareHalo360 Does Not Do</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">It does not provide medical diagnosis or treatment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">It does not automatically contact emergency services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">It does not replace caregivers or supervision</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-amber-900 mb-3">In Case of Emergency</h2>
                    <p className="text-amber-800 mb-4">
                      If there is an immediate medical or safety emergency, contact:
                    </p>
                    <p className="text-2xl font-bold text-amber-900 mb-4">
                      911 or your local emergency services
                    </p>
                    <p className="text-amber-800">
                      CareHalo360 should not be relied upon as the sole method of emergency response.
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
