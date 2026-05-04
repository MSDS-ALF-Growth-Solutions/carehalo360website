import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import PrivacySection from "@/components/sections/PrivacySection";
import PricingTeaserSection from "@/components/sections/PricingTeaserSection";
import WhoItsForSection from "@/components/sections/WhoItsForSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustSection from "@/components/sections/TrustSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <BenefitsSection />
        <PrivacySection />
        <PricingTeaserSection />
        <WhoItsForSection />
        <TestimonialsSection />
        <TrustSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CareHalo360",
            url: "https://carehalo360.com",
            description: "Privacy-first home safety monitoring for families caring for loved ones at home.",
            sameAs: [],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Does it record video?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. CareHalo360 processes visual information on-device to understand activity patterns, but it doesn't store raw video or stream footage.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to wear anything?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No wearables required. CareHalo360 uses passive monitoring that works in the background.",
                },
              },
              {
                "@type": "Question",
                name: "Does it replace a caregiver?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. CareHalo360 is designed to support families and caregivers—not replace them.",
                },
              },
              {
                "@type": "Question",
                name: "What happens during a fall or safety event?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "When unusual activity is detected, designated family members receive a notification.",
                },
              },
              {
                "@type": "Question",
                name: "Does it work if I'm away from home?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. CareHalo360 sends notifications to your phone wherever you are.",
                },
              },
              {
                "@type": "Question",
                name: "Is it hard to set up?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Setup typically takes just a few minutes.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
};

export default Index;
