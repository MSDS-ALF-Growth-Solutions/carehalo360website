import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroAnimation, HeroItem, ImageReveal } from "@/components/animations/MotionElements";
import heroVideo from "@/assets/hero-video.mp4";

const trustBullets = [
  "No wearables",
  "Privacy-first by design",
  "Works quietly in the background",
];

export default function HeroSection() {
  return (
    <section className="section bg-[hsl(35,35%,92%)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <HeroAnimation className="order-2 lg:order-1">
            <HeroItem>
              <h1 className="mb-6">
                Peace of mind, without intrusion.
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="text-lg md:text-xl max-w-xl mb-8">
                Quiet, privacy-first safety monitoring that helps families care for
                loved ones at home. No wearables, no constant checking, and
                no compromising dignity.
              </p>
            </HeroItem>

            {/* CTAs */}
            <HeroItem>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild variant="hero" size="xl">
                  <Link to="/get-started">Get Started Now</Link>
                </Button>
                <Button asChild variant="link" size="lg">
                  <Link to="/how-it-works">See how it works →</Link>
                </Button>
              </div>
            </HeroItem>

            {/* Trust Bullets */}
            <HeroItem>
              <div className="flex flex-wrap gap-6">
                {trustBullets.map((bullet) => (
                  <div key={bullet} className="trust-bullet">
                    {bullet}
                  </div>
                ))}
              </div>
            </HeroItem>
          </HeroAnimation>

          {/* Hero Video */}
          <ImageReveal className="order-1 lg:order-2" delay={0.3}>
            <video
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="care-image w-full rounded-2xl shadow-elegant"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
