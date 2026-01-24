import { FadeInView } from "@/components/animations/MotionElements";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

export default function PageHero({ 
  title, 
  subtitle, 
  description, 
  backgroundImage,
  children 
}: PageHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70" />
      
      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInView>
            <h1 className="mb-6 text-foreground">{title}</h1>
          </FadeInView>
          
          {subtitle && (
            <FadeInView delay={0.1}>
              <p className="text-xl text-muted-foreground mb-4">
                {subtitle}
              </p>
            </FadeInView>
          )}
          
          {description && (
            <FadeInView delay={0.2}>
              <p className="text-lg text-muted-foreground">
                {description}
              </p>
            </FadeInView>
          )}
          
          {children && (
            <FadeInView delay={0.3}>
              <div className="mt-8">
                {children}
              </div>
            </FadeInView>
          )}
        </div>
      </div>
    </section>
  );
}
