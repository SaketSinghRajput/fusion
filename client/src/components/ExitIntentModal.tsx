import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    let scrollThreshold = false;

    const handleScroll = () => {
      if (!hasShown && window.scrollY > window.innerHeight * 0.3) {
        scrollThreshold = true;
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!hasShown && e.clientY <= 0 && scrollThreshold) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md" data-testid="modal-exit-intent">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">
            Wait! Don't Miss Out
          </DialogTitle>
          <DialogDescription className="text-base">
            Get a free consultation and discover how we can help grow your business with our full-stack digital solutions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎁</span>
            </div>
            <div>
              <div className="font-semibold">Free Consultation</div>
              <div className="text-sm text-muted-foreground">
                No commitment required
              </div>
            </div>
          </div>

          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-chart-3" />
              Expert guidance on your project
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-chart-3" />
              Custom solution recommendations
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-chart-3" />
              Transparent pricing estimate
            </li>
          </ul>

          <Button
            onClick={scrollToContact}
            className="w-full bg-chart-3 hover:bg-chart-3/90 text-white"
            data-testid="button-modal-consultation"
          >
            Get Free Consultation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
