import SlideUpText from "@/components/animations/SlideUpText";
import { ShieldCheck } from "lucide-react";
import { FadeInView } from "@/components/animations/MotionElements";

export default function TrustSection() {
  return (
    <section className="section">
      <div className="container">
        <FadeInView className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-6">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <SlideUpText as="h2" className="mb-4">Trusted & Built for Real-World Care</SlideUpText>
          <p className="text-muted-foreground">
            CareHalo360's core safety system is protected under a U.S. patent-pending application, reinforcing reliability, auditability, and long-term regulatory alignment for assisted living and home care environments.
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
