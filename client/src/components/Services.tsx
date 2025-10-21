import { useEffect, useRef, useState } from "react";
import { Code, Smartphone, TrendingUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code,
    title: "Website Development",
    description: "Custom design & development tailored to your brand and business goals.",
    features: [
      "Custom design & development",
      "E-commerce solutions",
      "CMS (WordPress/Shopify)",
      "Landing pages & microsites",
      "Maintenance & support",
    ],
    color: "from-primary to-chart-4",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and hybrid apps that deliver exceptional user experiences.",
    features: [
      "Native & hybrid apps",
      "UI/UX design",
      "Backend & database",
      "Push notifications & analytics",
      "Maintenance & updates",
    ],
    color: "from-chart-2 to-primary",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Strategic marketing campaigns that drive growth and engagement.",
    features: [
      "SEO & content marketing",
      "Social media management",
      "PPC & paid advertising",
      "Email campaigns",
      "Analytics & tracking",
    ],
    color: "from-chart-3 to-primary",
  },
];

export function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 md:py-32 bg-background relative"
      data-testid="section-services"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4"
            data-testid="text-services-title"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive digital solutions to power your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={service.title}
                data-index={index}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card
                  className="p-8 h-full bg-card/50 backdrop-blur-sm border-card-border hover-elevate active-elevate-2 transition-all duration-300 group"
                  data-testid={`card-service-${index}`}
                >
                  <div
                    className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto"
                    data-testid={`button-learn-more-${index}`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
