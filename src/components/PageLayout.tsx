import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="mb-4">{title}</h1>
              {subtitle && <p className="text-lg">{subtitle}</p>}
            </div>
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
