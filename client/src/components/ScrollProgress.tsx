import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50"
      data-testid="scroll-progress"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-chart-2 to-chart-3 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
