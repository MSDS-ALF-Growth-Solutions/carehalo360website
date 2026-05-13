import SlideUpText from "@/components/animations/SlideUpText";
import { ImageReveal, FadeInView, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";
import familyImage from "@/assets/family-peace-of-mind.jpg";

const testimonials = [
  {
    quote: "I used to call my mom three times a day just to make sure she was okay. Now I have peace of mind without being intrusive.",
    author: "Early pilot family",
    location: "California",
  },
  {
    quote: "What I appreciate most is how it respects my dad's privacy. He feels independent, and I feel informed.",
    author: "Early pilot family",
    location: "Texas",
  },
  {
    quote: "The setup was surprisingly simple. It just works quietly in the background, exactly as promised.",
    author: "Early pilot family",
    location: "Florida",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section section-light">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <ImageReveal>
            <img
              src={familyImage}
              alt="Adult daughter calmly checking phone notification in her kitchen, representing family peace of mind"
              className="care-image"
            />
          </ImageReveal>

          {/* Content */}
          <div>
            <FadeInView>
              <SlideUpText as="h2" className="mb-8">Trust grows from consistency.</SlideUpText>
            </FadeInView>

            <StaggerContainer className="space-y-6" staggerDelay={0.15}>
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={index} className="testimonial-card">
                  <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{testimonial.author}</span>
                    <span className="mx-2">·</span>
                    <span>{testimonial.location}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeInView delay={0.5}>
              <p className="text-xs text-muted-foreground mt-6 italic">
                Results vary by home setup and individual needs.
              </p>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
