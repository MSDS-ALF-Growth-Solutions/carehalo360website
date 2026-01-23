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
          <div>
            <img
              src={familyImage}
              alt="Adult daughter calmly checking phone notification in her kitchen, representing family peace of mind"
              className="care-image"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="mb-8">Trust grows from consistency.</h2>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{testimonial.author}</span>
                    <span className="mx-2">·</span>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-6 italic">
              Results vary by home setup and individual needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
