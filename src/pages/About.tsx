import PageLayout from "@/components/PageLayout";

export default function About() {
  return (
    <PageLayout 
      title="About CareHalo360" 
      subtitle="Built for families, designed for dignity."
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-muted-foreground">
          Our story and mission coming soon.
        </p>
      </div>
    </PageLayout>
  );
}
