import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currencyRates = {
  INR: { symbol: "₹", rate: 1 },
  USD: { symbol: "$", rate: 0.012 },
  GBP: { symbol: "£", rate: 0.0095 },
  EUR: { symbol: "€", rate: 0.011 },
  SGD: { symbol: "S$", rate: 0.016 },
};

const pricingTiers = [
  {
    name: "Starter",
    description: "Any 1 Service",
    priceMin: 40000,
    priceMax: 75000,
    features: [
      "Responsive design",
      "SEO-ready",
      "1-month support",
      "Basic analytics",
      "Mobile optimized",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    description: "Any 2 Services",
    priceMin: 75000,
    priceMax: 125000,
    features: [
      "Full-stack integration",
      "2-month campaign (if marketing)",
      "Admin panel",
      "2-month support",
      "Advanced features",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Full-Stack",
    description: "All 3 Services",
    priceMin: 150000,
    priceMax: 250000,
    features: [
      "Website + Android/iOS apps",
      "2-3 month marketing campaign",
      "Advanced analytics",
      "3-month support",
      "Priority support",
      "Dedicated account manager",
    ],
    cta: "Get Started",
    popular: false,
  },
];

export function Pricing() {
  const [currency, setCurrency] = useState<keyof typeof currencyRates>("INR");

  const formatPrice = (price: number) => {
    const converted = price * currencyRates[currency].rate;
    const symbol = currencyRates[currency].symbol;
    
    if (currency === "INR") {
      return `${symbol}${(price / 1000).toFixed(0)}K`;
    }
    return `${symbol}${Math.round(converted / 100) * 100}`;
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="pricing"
      className="py-20 md:py-32 bg-accent/20"
      data-testid="section-pricing"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4"
            data-testid="text-pricing-title"
          >
            Simple,{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Choose the perfect plan for your business needs
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">Currency:</span>
            <Select value={currency} onValueChange={(val) => setCurrency(val as keyof typeof currencyRates)}>
              <SelectTrigger className="w-32" data-testid="select-currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR (₹)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="SGD">SGD (S$)</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground">(approx.)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative ${tier.popular ? "md:-mt-4" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-chart-3 to-primary text-white text-sm font-medium">
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </div>
                </div>
              )}

              <Card
                className={`p-8 h-full bg-card/80 backdrop-blur-sm ${
                  tier.popular
                    ? "border-2 border-primary shadow-lg shadow-primary/20"
                    : "border-card-border"
                } hover-elevate transition-all duration-300`}
                data-testid={`card-pricing-${index}`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tier.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      {formatPrice(tier.priceMin)}
                    </span>
                    <span className="text-muted-foreground">–</span>
                    <span className="text-3xl font-bold">
                      {formatPrice(tier.priceMax)}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-chart-3 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToContact}
                  className={`w-full ${
                    tier.popular
                      ? "bg-gradient-to-r from-chart-3 to-primary hover:opacity-90 text-white"
                      : ""
                  }`}
                  variant={tier.popular ? "default" : "outline"}
                  data-testid={`button-pricing-${index}`}
                >
                  {tier.cta}
                </Button>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Need a custom solution?
          </p>
          <Button
            variant="outline"
            onClick={scrollToContact}
            data-testid="button-request-quote"
          >
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
