import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/privacy", label: "Privacy" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/get-started", label: "Get Started" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/security", label: "Security" },
  { href: "/cancel", label: "Cancel Subscription" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-3">
              <img src={logo} alt="CareHalo360" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Privacy-first home safety monitoring designed for dignity.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <small className="text-muted-foreground">
            © {new Date().getFullYear()} CareHalo360. All rights reserved.
          </small>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
