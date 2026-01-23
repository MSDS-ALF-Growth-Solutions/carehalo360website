import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInView } from "@/components/animations/MotionElements";

const faqs = [
  {
    question: "Does it record video?",
    answer: "No. CareHalo360 processes visual information on-device to understand activity patterns, but it doesn't store raw video or stream footage. Privacy is built into how the system works.",
  },
  {
    question: "Do I need to wear anything?",
    answer: "No wearables required. CareHalo360 uses passive monitoring that works in the background. Your loved one doesn't need to remember to wear or charge anything.",
  },
  {
    question: "Does it replace a caregiver?",
    answer: "No. CareHalo360 is designed to support families and caregivers—not replace them. It provides calm awareness and helps you stay informed, but human care remains essential.",
  },
  {
    question: "What happens during a fall or safety event?",
    answer: "When unusual activity is detected, designated family members receive a notification. You can then check in and decide on the appropriate response based on your family's situation.",
  },
  {
    question: "Does it work if I'm away from home?",
    answer: "Yes. CareHalo360 sends notifications to your phone wherever you are, so you can stay aware even when you're not in the same city as your loved one.",
  },
  {
    question: "Is it hard to set up?",
    answer: "Setup typically takes just a few minutes. The hardware is designed to fit naturally into your home, and our team provides support if you need any help getting started.",
  },
];

export default function FAQSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <FadeInView>
            <h2 className="text-center mb-10">Frequently asked questions</h2>
          </FadeInView>

          <FadeInView delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="faq-item">
                  <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
