"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  BookOpen,
  Terminal,
  Server,
  Zap,
  Shield,
  Bot,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string>("quickstart");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const navSections = [
    { id: "quickstart", title: "Quick Start", icon: Zap },
    { id: "installation", title: "Installation & Docker", icon: Server },
    { id: "websocket-api", title: "WebSocket Telemetry Protocol", icon: Terminal },
    { id: "control-bus", title: "Control Bus & HMAC Auth", icon: Shield },
    { id: "ai-setup", title: "AI Agent Setup (Codex/Claude)", icon: Bot },
    { id: "troubleshooting", title: "Troubleshooting & Latency", icon: HelpCircle },
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-10 border-b border-white/10 mb-12">
          <Badge variant="accent" size="sm" className="mb-3">
            DEVELOPER DOCUMENTATION
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            ALGORB ARCHITECTURE & INTEGRATION SPECIFICATION
          </h1>
          <p className="mt-3 text-sm sm:text-base text-text-secondary font-sans max-w-3xl">
            Reference documentation for embedding Algorb telemetry adapters into custom Python, TypeScript, Go, or Rust automated trading engines.
          </p>
        </div>

        {/* Documentation Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 sticky top-24 bg-surface/80 rounded-xl border border-white/10 p-3 space-y-1 text-xs">
            <span className="text-[10px] text-text-muted uppercase tracking-wider px-3 py-2 block font-bold">
              DOCUMENTATION INDEX
            </span>
            {navSections.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-2 transition-all",
                    isActive
                      ? "bg-accent/15 text-accent font-bold border border-accent/30"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 rounded-2xl bg-surface/60 border border-white/10 p-6 sm:p-10 font-sans text-text-secondary text-sm leading-relaxed space-y-12">
            {/* Quickstart */}
            {activeSection === "quickstart" && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white font-sans mb-2">
                    Quick Start Guide
                  </h2>
                  <p>
                    Connecting your bot to Algorb involves running the lightweight local adapter daemon and dispatching telemetry payloads whenever your strategy loops or fills an order.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <span className="text-white font-bold block">1. Install Python Adapter Client</span>
                  <div className="p-3.5 rounded-lg bg-black/80 border border-white/10 flex items-center justify-between text-text-primary">
                    <code>pip install algorb-adapter</code>
                    <button
                      onClick={() => handleCopy("pip", "pip install algorb-adapter")}
                      className="text-text-muted hover:text-white"
                    >
                      {copied === "pip" ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <span className="text-white font-bold block">2. Hook Adapter into Strategy Loop</span>
                  <div className="p-4 rounded-lg bg-black/80 border border-white/10 text-text-secondary overflow-x-auto">
                    <pre>
                      <code>{`from algorb import AlgorbAdapter

# Connects to default local telemetry bus
algorb = AlgorbAdapter(host="127.0.0.1", port=9042)

# Inside your strategy iteration:
algorb.emit_telemetry(
    equity=24821.64,
    daily_pnl=482.17,
    positions=[
        {
            "symbol": "BTC-PERP",
            "side": "LONG",
            "size": 0.85,
            "entryPrice": 62450.0,
            "markPrice": 63120.5,
            "unrealizedPnl": 569.92
        }
    ]
)`}</code>
                    </pre>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 text-xs">
                  <span className="text-accent font-bold block mb-1">Architecture Note</span>
                  The adapter communicates strictly via local loopback sockets. Your market data feeds and exchange order paths remain untouched.
                </div>
              </section>
            )}

            {/* Installation & Docker */}
            {activeSection === "installation" && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white font-sans mb-2">
                    Installation & Docker Deployment
                  </h2>
                  <p>
                    Algorb can be run as a standalone pre-compiled binary or via Docker Compose on Linux, macOS, and Windows.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <span className="text-white font-bold block">docker-compose.yml</span>
                  <div className="p-4 rounded-lg bg-black/80 border border-white/10 text-text-secondary overflow-x-auto">
                    <pre>
                      <code>{`version: "3.8"
services:
  algorb-ui:
    image: algorb/storefront:latest
    container_name: algorb-dashboard
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
      - "127.0.0.1:9042:9042"
    environment:
      - BIND_ADDR=127.0.0.1
      - THEME_DEFAULT=obsidian
      - HMAC_SECRET=\${ALGORB_TOKEN}`}</code>
                    </pre>
                  </div>
                </div>
              </section>
            )}

            {/* WebSocket Protocol */}
            {activeSection === "websocket-api" && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white font-sans mb-2">
                    WebSocket Telemetry Protocol Specification
                  </h2>
                  <p>
                    The Algorb frontend listens for JSON-RPC 2.0 frames over WebSocket. Below is the specification for the core telemetry frame.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-black/80 border border-white/10 font-mono text-xs text-text-secondary overflow-x-auto">
                  <pre>
                    <code>{`{
  "jsonrpc": "2.0",
  "method": "telemetry.update",
  "params": {
    "timestamp": 1725651735821,
    "equity": 24821.64,
    "daily_pnl": 482.17,
    "drawdown": 0.0421,
    "win_rate": 0.724,
    "bot_status": "RUNNING",
    "positions": [ ... ],
    "recent_logs": [ ... ]
  }
}`}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* Control Bus */}
            {activeSection === "control-bus" && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white font-sans mb-2">
                    Control Bus & HMAC Authentication
                  </h2>
                  <p>
                    Algorb Control communicates bidirectional commands (e.g. `EMERGENCY_HALT`, `PAUSE_STRATEGY`, `SET_PARAM`) using HMAC-SHA256 authenticated payloads.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-black/80 border border-warning/30 font-mono text-xs text-warning overflow-x-auto">
                  <pre>
                    <code>{`# Python Command Listener Example
@algorb.on_command("EMERGENCY_HALT")
def handle_emergency_halt(signature, nonce):
    if not algorb.verify_hmac(signature, nonce):
        raise UnauthorizedCommand("Invalid HMAC token")
        
    bot.cancel_all_orders()
    bot.market_flatten_all()
    return {"status": "SUCCESS_FLATTENED"}`}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* AI Setup */}
            {activeSection === "ai-setup" && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white font-sans mb-2">
                    AI Agent Setup (Codex, Claude, Cursor)
                  </h2>
                  <p>
                    Algorb was built to be easily hooked up using modern AI code assistants.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-elevated border border-accent/30 font-mono text-xs space-y-2">
                  <span className="text-accent font-bold block">Recommended Prompt:</span>
                  <p className="text-white">
                    &quot;Read the provided ALGORB_SPEC.md. Inspect my trading bot codebase and create an adapter class that streams my live account balance and order fill events to ws://127.0.0.1:9042.&quot;
                  </p>
                </div>
              </section>
            )}

            {/* Troubleshooting */}
            {activeSection === "troubleshooting" && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white font-sans mb-2">
                    Troubleshooting & Latency Optimization
                  </h2>
                  <p>
                    Optimizing telemetry performance and resolving common socket handshake snags.
                  </p>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3 rounded bg-white/5 border border-white/5">
                    <span className="text-white font-bold block mb-1">Issue: Socket connection refused (127.0.0.1:9042)</span>
                    <span className="text-text-muted">Ensure your bot has initialized the AlgorbAdapter before starting the dashboard. Check firewall permissions for local loopback.</span>
                  </div>
                  <div className="p-3 rounded bg-white/5 border border-white/5">
                    <span className="text-white font-bold block mb-1">Issue: Frame serialization delay over 2ms</span>
                    <span className="text-text-muted">Avoid serializing deep unindexed trade history on every tick. Emit full snapshots at 1Hz and delta updates at tick frequency.</span>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
