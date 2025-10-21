import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-commerce for Fashion Brand",
    category: "Websites",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    problem: "Low conversion rates on existing site",
    solution: "Headless storefront with Shopify integration",
    outcome: "30% conversion lift",
    tags: ["E-commerce", "React", "Shopify"],
  },
  {
    title: "Fintech Landing Revamp",
    category: "Websites",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    problem: "Slow LCP affecting user experience",
    solution: "SSR implementation + image optimization",
    outcome: "50% faster load, +22% sign-ups",
    tags: ["Performance", "Next.js", "SEO"],
  },
  {
    title: "D2C Mobile App",
    category: "Apps",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
    problem: "Poor user retention rates",
    solution: "Push notifications + advanced analytics",
    outcome: "+18% 30-day retention",
    tags: ["Mobile", "React Native", "Analytics"],
  },
  {
    title: "SaaS Marketing Campaign",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
    problem: "Low brand visibility in market",
    solution: "Multi-channel digital marketing strategy",
    outcome: "3x increase in qualified leads",
    tags: ["SEO", "PPC", "Content"],
  },
];

const categories = ["All", "Websites", "Apps", "Marketing"];

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="py-20 md:py-32 bg-background"
      data-testid="section-portfolio"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4"
            data-testid="text-portfolio-title"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Proven results across industries and technologies
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className={activeFilter === category ? "bg-primary" : ""}
              data-testid={`button-filter-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.title}
              className="group overflow-hidden bg-card/50 backdrop-blur-sm border-card-border hover-elevate transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-testid={`card-project-${index}`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                    <div className="text-sm text-primary font-medium">
                      Problem
                    </div>
                    <p className="text-sm text-foreground">{project.problem}</p>
                    <div className="text-sm text-chart-3 font-medium">
                      Solution
                    </div>
                    <p className="text-sm text-foreground">{project.solution}</p>
                    <div className="text-sm text-chart-4 font-medium">
                      Outcome
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {project.outcome}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="p-0 h-auto group/btn"
                  data-testid={`button-view-case-study-${index}`}
                >
                  View Case Study
                  <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
