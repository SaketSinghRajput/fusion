import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        toast({
          title: "Success!",
          description: "We've received your message and will get back to you soon.",
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const payload = await res.json().catch(() => ({}));
        setError(payload?.error || "Failed to send message. Please try again later.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-background"
      data-testid="section-contact"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4"
            data-testid="text-contact-title"
          >
            Let's{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Start Building
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Get in touch and let's discuss how we can help grow your business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-card-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                {isSuccess && (
                  <div className="text-green-500 font-medium">Message sent successfully.</div>
                )}
                {error && (
                  <div className="text-red-500 font-medium">{error}</div>
                )}

                <div>
                  <label className="block mb-2 font-medium">Name</label>
                  <Input
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Phone (Optional)</label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+91-7210503398"
                    value={formData.phone}
                    onChange={handleChange}
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Service Interested In</label>
                  <Select onValueChange={handleSelectChange} value={formData.service}>
                    <SelectTrigger data-testid="select-service">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website Development</SelectItem>
                      <SelectItem value="app">Mobile App Development</SelectItem>
                      <SelectItem value="marketing">Digital Marketing</SelectItem>
                      <SelectItem value="full-stack">Full-Stack Solution</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    className="min-h-32"
                    value={formData.message}
                    onChange={handleChange}
                    data-testid="textarea-message"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-chart-3 hover:bg-chart-3/90 text-white"
                  disabled={isSubmitting}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? "Sending..." : isSuccess ? "Sent Successfully!" : "Send Message"}
                </Button>
              </form>
            </Card>

            <div className="text-sm text-muted-foreground text-center">
              By submitting this form, you agree to our privacy policy
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-heading font-semibold mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:thefusionwebsolution@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-lg hover-elevate active-elevate-2 transition-colors"
                  data-testid="link-email"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      thefusionwebsolution@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+917210503398"
                  className="flex items-center gap-4 p-4 rounded-lg hover-elevate active-elevate-2 transition-colors"
                  data-testid="link-phone"
                >
                  <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-chart-3" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">
                      +91-7210503398
                      <br />
                      +91-9934492605
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-chart-2" />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">
                      Bhubaneswar, Odisha, India
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-heading font-semibold mb-4">
                Connect With Us
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-card hover-elevate active-elevate-2 flex items-center justify-center transition-colors border border-border"
                  data-testid="link-linkedin"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-card hover-elevate active-elevate-2 flex items-center justify-center transition-colors border border-border"
                  data-testid="link-instagram"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-card hover-elevate active-elevate-2 flex items-center justify-center transition-colors border border-border"
                  data-testid="link-twitter"
                  aria-label="Twitter/X"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-card hover-elevate active-elevate-2 flex items-center justify-center transition-colors border border-border"
                  data-testid="link-facebook"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-card-border">
              <h3 className="text-lg font-heading font-semibold mb-4">
                Schedule a Free Consultation
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Book a time that works for you and let's discuss your project
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open("https://calendly.com", "_blank")}
                data-testid="button-calendly"
              >
                Open Calendar
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
