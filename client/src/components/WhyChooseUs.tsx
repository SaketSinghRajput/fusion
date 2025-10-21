import { Target, Puzzle, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const reasons = [
  {
    icon: Target,
    title: "One-Stop Partner",
    description: "Everything you need under one roof—websites, apps, and marketing.",
  },
  {
    icon: Puzzle,
    title: "Tailored Solutions",
    description: "Custom strategies designed specifically for your business goals.",
  },
  {
    icon: Users,
    title: "End-to-End Support",
    description: "From concept to launch and beyond, we're with you every step.",
  },
  {
    icon: TrendingUp,
    title: "Growth-Focused",
    description: "We don't just build—we help your business grow and succeed.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="py-20 md:py-32 bg-accent/20"
      data-testid="section-why-choose-us"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4"
            data-testid="text-why-title"
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Fusion?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Your trusted partner for complete digital transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card
                key={reason.title}
                className="p-8 text-center bg-card/50 backdrop-blur-sm border-card-border hover-elevate active-elevate-2 transition-all duration-300 group"
                data-testid={`card-reason-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-chart-2 p-0.5 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-heading font-semibold mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
