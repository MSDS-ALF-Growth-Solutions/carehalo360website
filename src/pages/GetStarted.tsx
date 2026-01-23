import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutConfirmation from "@/components/checkout/CheckoutConfirmation";

export default function GetStarted() {
  const [searchParams] = useSearchParams();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowConfirmation(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Get Started with CareHalo360 | Complete Your Setup</title>
        <meta 
          name="description" 
          content="Start your CareHalo360 subscription. Privacy-first home safety monitoring with hardware included. $49/month, cancel anytime." 
        />
        <meta property="og:title" content="Get Started with CareHalo360" />
        <meta property="og:description" content="Complete your setup for privacy-first home safety monitoring. Hardware included, cancel anytime." />
        <link rel="canonical" href="https://carehalo360.com/get-started" />
      </Helmet>

      <Header />
      
      <main className="flex-1">
        {showConfirmation ? (
          <CheckoutConfirmation />
        ) : (
          <CheckoutForm />
        )}
      </main>

      <Footer />
    </div>
  );
}
