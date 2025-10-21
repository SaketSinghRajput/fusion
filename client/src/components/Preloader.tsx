export function Preloader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background dark"
      data-testid="preloader"
    >
      <div className="text-center space-y-4">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-chart-2 animate-pulse" />
          <div className="absolute inset-2 rounded-lg bg-background flex items-center justify-center">
            <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              F
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="w-2 h-2 rounded-full bg-chart-2 animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 rounded-full bg-chart-3 animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}
