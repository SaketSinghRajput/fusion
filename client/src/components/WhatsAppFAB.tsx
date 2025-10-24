import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppFAB() {
  const whatsappNumber = "+919934492605";
  const message = "Hi! I'd like to discuss a project with Fusion Web Solution.";

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={openWhatsApp}
      size="icon"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-chart-3 hover:bg-chart-3/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      data-testid="button-whatsapp"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
}
