import { Shield, Lock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Portfolio", href: "#portfolio" },
  ];

  const services = [
    "Website Development",
    "Mobile App Development",
    "Digital Marketing",
    "Full-Stack Solutions",
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border" data-testid="footer">
      <div className="container mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl">F</span>
              </div>
              <span className="font-heading font-bold text-xl bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Fusion
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Full-service digital agency delivering seamless, integrated solutions to help businesses establish a strong online presence and drive growth.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4" />
                GST Registered
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-4 h-4" />
                Secure Payments
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-muted-foreground">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Bhubaneswar, Odisha, India</li>
              <li>
                <a
                  href="mailto:contact@fusionwebsolution.com"
                  className="hover:text-primary transition-colors"
                >
                  contact@fusionwebsolution.com
                </a>
              </li>
              <li>+91-XXXXXXXXXX</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Fusion Web Solution. All rights reserved. | Based in India, Serving Global Clients
          </p>
        </div>
      </div>
    </footer>
  );
}
