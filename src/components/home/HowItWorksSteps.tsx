"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Download, Unplug, Play, CheckCircle2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const HowItWorksSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // Default to Step 03 CONNECT for maximum tech impact
  const [copied, setCopied] = useState(false);

  const steps = [
    {
      num: "01",
      title: "CHOOSE & LICENSE",
      shortTitle: "BUY",
      icon: ShoppingCart,
      tagline: "Select Algorb View or Algorb Control",
      description:
        "Select the license that fits your operational needs. Algorb View provides read-only surveillance; Algorb Control adds the active low-latency command bus and emergency stop.",
      badge: "STEP 01",
      details: ["Perpetual self-hosted license", "Full source code included", "No recurring cloud fees"],
    },
    {
      num: "02",
      title: "DOWNLOAD PACKAGE",
      shortTitle: "DOWNLOAD",
      icon: Download,
      tagline: "Receive the complete software archive & SDKs",
      description:
        "Unpack the production dashboard binary or container along with the lightweight adapter client libraries (Python, TypeScript, Go, Rust) and comprehensive schemas.",
      badge: "STEP 02",
      details: ["Docker compose ready", "Standalone binary builds", "Zero external dependencies"],
    },
    {
      num: "03",
      title: "CONNECT ADAPTER",
      shortTitle: "CONNECT",
      icon: Unplug,
      tagline: "Hook the telemetry stream in under 15 lines of code",
      description:
        "Import the adapter into your trading bot. Whenever your strategy emits ticks, updates positions, or detects fills, dispatch them to the local WebSocket bus.",
      badge: "STEP 03",
      details: ["Sub-millisecond IPC serialization", "Standard JSON-RPC schema", "Works with existing ccxt or FIX bots"],
    },
    {
      num: "04",
      title: "LAUNCH & COMMAND",
      shortTitle: "RUN",
      icon: Play,
      tagline: "Open your browser to localhost:3000",
      description:
        "Instantly watch your bot's equity curve, active positions, order fills, and risk metrics come alive in institutional clarity. Never squint at messy tmux scrollback again.",
      badge: "STEP 04",
      details: ["Instantaneous hot-reloading", "Multi-monitor friendly", "Remote access via Tailscale / VPN"],
    },
  ];

  const codeSnippets: Record<string, string> = {
    python: `from algorb import AlgorbAdapter

# 1. Initialize local adapter (runs on localhost:9042)
algorb = AlgorbAdapter(port=9042, secret="local_token_hmac")

# 2. Inside your bot execution loop:
@bot.on_fill
def handle_fill(order):
    algorb.emit_fill(
        symbol=order.symbol,
        side=order.side,
        size=order.amount,
        price=order.price,
        maker=order.is_maker
    )

# 3. Stream periodic equity & risk telemetry:
algorb.emit_telemetry(
    equity=account.total_equity,
    unrealized_pnl=account.unrealized_pnl,
    positions=bot.get_open_positions(),
    risk_utilization=account.margin_ratio
)`,
    typescript: `import { AlgorbAdapter } from "@algorb/adapter";

const algorb = new AlgorbAdapter({ port: 9042 });

bot.on("orderFilled", (fill) => {
  algorb.emitFill({
    symbol: fill.symbol,
    side: fill.side,
    price: fill.price,
    size: fill.qty
  });
});

setInterval(() => {
  algorb.emitTelemetry({
    equity: portfolio.nav,
    drawdown: portfolio.maxDrawdown,
    positions: portfolio.getPositions()
  });
}, 1000);`,
  };

  const [activeLang, setActiveLang] = useState<"python" | "typescript">("python");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="how-it-works" className="relative py-28 border-b border-white/10 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            INTEGRATION WORKFLOW
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            FOUR STEPS TO TOTAL VISIBILITY.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary">
            From checkout to streaming real-time telemetry on your personal workstation or VPS in under ten minutes.
          </p>
        </div>

        {/* Step Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 font-mono">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between group",
                  isSelected
                    ? "bg-surface-elevated border-accent/70 shadow-glow-cyan"
                    : "bg-surface/50 border-white/5 hover:border-white/20"
                )}
              >
                <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                  <span className={isSelected ? "text-accent font-bold" : ""}>
                    {s.num}
                  </span>
                  <Icon className={cn("w-4 h-4", isSelected ? "text-accent" : "text-text-muted")} />
                </div>
                <div className="font-bold text-sm text-white font-sans">
                  {s.shortTitle}
                </div>
                <span className="text-[11px] text-text-muted truncate mt-1">
                  {s.tagline}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Step Presentation */}
        <div className="rounded-2xl bg-surface border border-white/10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl">
          {/* Left Column: Step Description */}
          <div className="flex flex-col gap-4 font-mono">
            <Badge variant="accent" size="sm" className="w-fit">
              {steps[activeStep].badge} • {steps[activeStep].shortTitle}
            </Badge>

            <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white">
              {steps[activeStep].title}
            </h3>

            <p className="text-sm sm:text-base text-text-secondary font-sans leading-relaxed">
              {steps[activeStep].description}
            </p>

            <div className="space-y-2 mt-4 pt-4 border-t border-white/10 text-xs">
              {steps[activeStep].details.map((detail) => (
                <div key={detail} className="flex items-center gap-2 text-text-primary">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              {activeStep > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveStep((prev) => prev - 1)}
                >
                  PREVIOUS
                </Button>
              )}
              {activeStep < 3 ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveStep((prev) => prev + 1)}
                >
                  NEXT STEP
                </Button>
              ) : (
                <Button href="/docs" variant="primary" size="sm">
                  VIEW FULL DOCUMENTATION
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Code Demonstration */}
          <div className="rounded-xl bg-black/80 border border-white/10 p-4 font-mono text-xs overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLang("python")}
                  className={cn(
                    "px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors",
                    activeLang === "python" ? "bg-accent/20 text-accent border border-accent/40" : "text-text-muted hover:text-white"
                  )}
                >
                  python_adapter.py
                </button>
                <button
                  onClick={() => setActiveLang("typescript")}
                  className={cn(
                    "px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors",
                    activeLang === "typescript" ? "bg-accent/20 text-accent border border-accent/40" : "text-text-muted hover:text-white"
                  )}
                >
                  node_adapter.ts
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[10px] text-text-muted hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "COPIED" : "COPY"}</span>
              </button>
            </div>

            <pre className="py-4 text-text-secondary leading-relaxed overflow-x-auto text-[11px]">
              <code>{codeSnippets[activeLang]}</code>
            </pre>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-text-muted">
              <span>ZERO DEPENDENCY IPC WRAPPER</span>
              <span className="text-success">SYNTAX TESTED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
