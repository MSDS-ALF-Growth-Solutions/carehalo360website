import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "ready" | "already" | "invalid" | "done" | "error";

export default function Unsubscribe() {
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState<string | null>(null);
  const token =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token")
      : null;

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_KEY } }
        );
        const data = await res.json();
        if (!res.ok || !data.valid) {
          setState(data?.alreadyUsed ? "already" : "invalid");
          return;
        }
        setEmail(data.email ?? null);
        setState("ready");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState("loading");
    const { data, error } = await supabase.functions.invoke(
      "handle-email-unsubscribe",
      { body: { token } }
    );
    if (error || !data?.success) {
      setState("error");
      return;
    }
    setState("done");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Unsubscribe | CareHalo360</title>
      </Helmet>
      <Header />
      <main className="flex-1">
        <section className="section">
          <div className="container max-w-xl">
            <div className="care-card text-center">
              {state === "loading" && <p>Loading…</p>}
              {state === "ready" && (
                <>
                  <h2 className="mb-3">Unsubscribe</h2>
                  <p className="text-muted-foreground mb-6">
                    {email ? `Stop sending emails to ${email}?` : "Confirm to unsubscribe."}
                  </p>
                  <Button onClick={confirm}>Confirm unsubscribe</Button>
                </>
              )}
              {state === "already" && (
                <>
                  <h2 className="mb-3">Already unsubscribed</h2>
                  <p className="text-muted-foreground">You won't receive further emails.</p>
                </>
              )}
              {state === "done" && (
                <>
                  <h2 className="mb-3">You're unsubscribed</h2>
                  <p className="text-muted-foreground">We've removed you from our list.</p>
                </>
              )}
              {state === "invalid" && (
                <>
                  <h2 className="mb-3">Invalid link</h2>
                  <p className="text-muted-foreground">This unsubscribe link is invalid or expired.</p>
                </>
              )}
              {state === "error" && (
                <>
                  <h2 className="mb-3">Something went wrong</h2>
                  <p className="text-muted-foreground">Please try again later.</p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
