import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { FadeInView } from "@/components/animations/MotionElements";
import heroImage from "@/assets/heroes/about-hero.jpg";

const announcements = [
  {
    date: "May 2026",
    title: "CareHalo360 Achieves U.S. Patent Pending Status",
    body: "CareHalo360 is now officially Patent Pending in the United States, marking a key milestone in the development of its AI-powered safety monitoring platform.",
  },
];

export default function Announcements() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Announcements | CareHalo360</title>
        <meta name="description" content="News and milestones from CareHalo360, including our U.S. Patent Pending status." />
        <link rel="canonical" href="https://carehalo360.com/announcements" />
      </Helmet>

      <Header />
      <main className="flex-1">
        <PageHero
          title="Announcements"
          subtitle="News and milestones from CareHalo360."
          backgroundImage={heroImage}
        />

        <section className="section">
          <div className="container max-w-3xl space-y-8">
            {announcements.map((a, i) => (
              <FadeInView key={i} delay={i * 0.1}>
                <article className="care-card">
                  <p className="text-sm text-muted-foreground mb-2">{a.date}</p>
                  <h2 className="mb-4">{a.title}</h2>
                  <p className="text-muted-foreground">{a.body}</p>
                </article>
              </FadeInView>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
