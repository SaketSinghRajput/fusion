import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(192,255,255,0.1),transparent_50%)]" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border text-sm text-muted-foreground mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Trusted by 50+ Businesses
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight"
            data-testid="text-hero-title"
          >
            <span className="bg-gradient-to-r from-primary via-chart-4 to-chart-2 bg-clip-text text-transparent">
              Full-Stack Growth
            </span>
            <br />
            for Your Business.
          </h1>

          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            End-to-end digital services—websites, apps, and marketing—that help businesses grow, engage, and succeed online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="bg-chart-3 hover:bg-chart-3/90 text-white group min-h-12 px-8"
              data-testid="button-start-project"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#portfolio")}
              className="min-h-12 px-8 backdrop-blur-sm bg-background/50"
              data-testid="button-view-work"
            >
              <Play className="mr-2 w-4 h-4" />
              View Our Work
            </Button>
          </div>

          <div className="pt-12 flex items-center justify-center gap-8 opacity-60">
            <div className="text-xs text-muted-foreground">TRUSTED BY</div>
            <div className="flex items-center gap-6">
              {["TechCorp", "InnovateX", "CloudSys"].map((company) => (
                <div
                  key={company}
                  className="px-4 py-2 rounded bg-card/30 backdrop-blur-sm text-sm font-medium text-muted-foreground"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-muted-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
}
