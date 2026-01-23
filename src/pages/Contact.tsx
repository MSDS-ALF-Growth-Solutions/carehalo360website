import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Clock, AlertTriangle } from "lucide-react";
import { FadeInView, ImageReveal, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";
import contactImage from "@/assets/contact/supportive-workspace.jpg";

const helpTopics = [
  "Setup and onboarding questions",
  "Billing or subscription changes",
  "Device returns or replacements",
  "Privacy or data questions",
  "General product support",
];

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact CareHalo360 | Support & Help</title>
        <meta
          name="description"
          content="Contact CareHalo360 for support, questions, or help with your home safety monitoring service. We're here to help."
        />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <FadeInView>
                <h1 className="text-center mb-4">Contact & Support</h1>
              </FadeInView>
              <FadeInView delay={0.1}>
                <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                  We're here to help.
                </p>
              </FadeInView>

              <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                <ImageReveal>
                  <img
                    src={contactImage}
                    alt="Calm home workspace with natural light"
                    className="care-image"
                  />
                </ImageReveal>

                <div className="space-y-8">
                  <FadeInView delay={0.1}>
                    <p className="text-muted-foreground">
                      CareHalo360 is designed to feel simple and supportive, and so is our support.
                    </p>
                  </FadeInView>
                  <FadeInView delay={0.2}>
                    <p className="text-muted-foreground">
                      If you have questions about setup, billing, privacy, or anything else, our team is here to help.
                    </p>
                  </FadeInView>

                  <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                    <h2 className="text-xl font-semibold">How to Reach Us</h2>

                    <StaggerItem className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email Support</h3>
                        <a
                          href="mailto:support@carehalo360.com"
                          className="text-primary hover:underline"
                        >
                          support@carehalo360.com
                        </a>
                      </div>
                    </StaggerItem>

                    <StaggerItem className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Response Time</h3>
                        <p className="text-muted-foreground">
                          We aim to respond within 1 business day.
                        </p>
                      </div>
                    </StaggerItem>
                  </StaggerContainer>
                </div>
              </div>

              <FadeInView>
                <div className="care-card mb-12">
                  <h2 className="text-xl font-semibold mb-6">What We Can Help With</h2>
                  <StaggerContainer className="grid sm:grid-cols-2 gap-3" staggerDelay={0.05}>
                    {helpTopics.map((topic, index) => (
                      <StaggerItem key={index} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {topic}
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                  <p className="text-muted-foreground mt-6">
                    If you're not sure where to start, just reach out.
                  </p>
                </div>
              </FadeInView>

              <FadeInView delay={0.2}>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-amber-900 mb-2">A Note on Emergencies</h2>
                      <p className="text-amber-800">
                        CareHalo360 is not an emergency service. If you or someone else is in immediate danger, please contact 911 or local emergency services.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
