import PageLayout from "@/components/PageLayout";
import FAQSection from "@/components/sections/FAQSection";

export default function FAQ() {
  return (
    <PageLayout 
      title="Frequently Asked Questions" 
      subtitle="Everything you need to know about CareHalo360."
    >
      <FAQSection />
    </PageLayout>
  );
}
