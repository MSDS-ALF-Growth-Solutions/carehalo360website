import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqSections = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "What is CareHalo360?",
        answer: "CareHalo360 is a privacy-first home safety monitoring service designed to help families stay aware of safety-related events at home without wearables, cameras watching, or constant supervision. It works quietly in the background to support care, not replace it."
      },
      {
        question: "Who is CareHalo360 for?",
        answer: "CareHalo360 is designed for families caring for aging parents living independently, loved ones recovering at home, individuals with elevated fall risk, and families providing care remotely."
      }
    ]
  },
  {
    title: "Privacy & Trust",
    faqs: [
      {
        question: "Does CareHalo360 record video?",
        answer: "No. CareHalo360 does not store or transmit identifiable video. The system focuses on abstract movement patterns, not faces or identities."
      },
      {
        question: "Does CareHalo360 use facial recognition?",
        answer: "No. Facial recognition and identity tracking are intentionally excluded from the system. Privacy is a foundation, not a feature."
      },
      {
        question: "Will my loved one feel watched?",
        answer: "CareHalo360 is designed to avoid a surveillance feeling. There are no screens, no constant video feeds, and no interaction required. Most people forget it's even there."
      }
    ]
  },
  {
    title: "Setup & Use",
    faqs: [
      {
        question: "Is CareHalo360 difficult to install?",
        answer: "No. Setup is simple and takes only a short time. Devices arrive ready to go, with no technical expertise required."
      },
      {
        question: "Does anyone need to wear a device?",
        answer: "No. CareHalo360 does not require wearables, pendants, or buttons. There's nothing to remember, charge, or put on."
      },
      {
        question: "Does it work all the time?",
        answer: "Yes. CareHalo360 runs continuously in the background and does not require daily interaction."
      }
    ]
  },
  {
    title: "Alerts & Safety",
    faqs: [
      {
        question: "How does CareHalo360 detect safety events?",
        answer: "CareHalo360 observes movement patterns and looks for meaningful changes that may indicate a safety concern. It uses on-device intelligence to decide when attention may be needed."
      },
      {
        question: "Will I get constant alerts?",
        answer: "No. The system is designed to avoid alert fatigue. Alerts are sent only when something meaningful occurs, not for normal daily activity."
      },
      {
        question: "Who receives alerts?",
        answer: "Alerts can be sent to designated family members or caregivers, depending on your setup. Family access is included in your subscription."
      }
    ]
  },
  {
    title: "Pricing & Subscription",
    faqs: [
      {
        question: "How much does CareHalo360 cost?",
        answer: "CareHalo360 is offered as a single monthly subscription, typically between $39–$49 per month. Final pricing is shown at checkout."
      },
      {
        question: "Is the hardware included?",
        answer: "Yes. CareHalo360 devices are included in the monthly subscription."
      },
      {
        question: "What happens if I cancel?",
        answer: "You can cancel at any time. If devices are returned, there is no additional charge. If devices are not returned, a one-time $250 replacement fee applies."
      },
      {
        question: "Are there contracts or long-term commitments?",
        answer: "No. CareHalo360 is month-to-month. Stay because it helps, not because you're locked in."
      }
    ]
  },
  {
    title: "Limitations & Expectations",
    faqs: [
      {
        question: "Is CareHalo360 a medical device?",
        answer: "No. CareHalo360 is not a medical device and does not provide medical diagnosis or treatment. It is designed to support awareness and safety, not replace medical care or caregivers."
      },
      {
        question: "Does CareHalo360 replace caregivers or family care?",
        answer: "No. CareHalo360 complements care by providing awareness. It does not replace human involvement."
      }
    ]
  },
  {
    title: "Support & Next Steps",
    faqs: [
      {
        question: "What if I need help?",
        answer: "Customer support is included with your subscription. We're here to help families feel confident and supported."
      },
      {
        question: "Can CareHalo360 be used for care facilities or multiple homes?",
        answer: "Yes. Multi-home or care facility use is available. Please contact us to discuss options."
      }
    ]
  }
];

// Flatten FAQs for schema
const allFaqs = faqSections.flatMap(section => section.faqs);

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CareHalo360 FAQ | Home Safety Monitoring Questions Answered</title>
        <meta 
          name="description" 
          content="Find answers to common CareHalo360 questions. Learn about privacy, pricing, setup, alerts, and how our home safety monitoring works for families." 
        />
        <meta property="og:title" content="CareHalo360 FAQ — Your Questions, Answered" />
        <meta 
          property="og:description" 
          content="Clear answers about CareHalo360 pricing, privacy, setup, alerts, and support. Built for families caring for loved ones at home." 
        />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="home safety monitoring FAQ, elderly care monitoring questions, caregiving technology FAQ, privacy-first home monitoring, senior safety at home, fall detection alternative, non-intrusive home monitoring, care for aging parents, home care safety system" />
        <link rel="canonical" href="https://carehalo360.com/faq" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground mb-4">
                Clear answers. No guesswork.
              </p>
              <p className="text-muted-foreground mb-4">
                Choosing care technology for your home is a big decision. Below are answers 
                to the most common questions families ask about CareHalo360.
              </p>
              <p className="text-muted-foreground">
                If something isn't answered here, we're always happy to help.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        {faqSections.map((section, sectionIndex) => (
          <section 
            key={sectionIndex} 
            className={`section ${sectionIndex % 2 === 0 ? 'section-warm' : ''}`}
          >
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-center mb-8">{section.title}</h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {section.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`section-${sectionIndex}-item-${faqIndex}`}
                      className="care-card border-none"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                        {faq.question === "Does CareHalo360 record video?" && (
                          <span className="block mt-2">
                            For more details, visit our{" "}
                            <Link to="/privacy" className="text-primary hover:underline">
                              Privacy & Trust page
                            </Link>.
                          </span>
                        )}
                        {faq.question === "How much does CareHalo360 cost?" && (
                          <span className="block mt-2">
                            You can view full details on our{" "}
                            <Link to="/pricing" className="text-primary hover:underline">
                              Pricing page
                            </Link>.
                          </span>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        ))}

        {/* Final CTA */}
        <section className="section section-warm">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mb-4">Care decisions feel easier with clear answers.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                CareHalo360 is designed to support families with calm, privacy-first safety monitoring.
              </p>
              <Button asChild variant="hero" size="xl">
                <Link to="/get-started">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
