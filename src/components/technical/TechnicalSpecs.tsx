"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Terminal, Cpu, Radio, Network, Server, Shield, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const TechnicalSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"websocket" | "rest" | "python" | "docker">("websocket");
  const [copied, setCopied] = useState(false);

  const snippets = {
    websocket: `// WebSocket Telemetry Protocol (default ws://127.0.0.1:9042)
// Inbound Telemetry Frame from Customer Bot:
{
  "jsonrpc": "2.0",
  "method": "stratdesk.telemetry.v1",
  "params": {
    "timestamp": 1725651735821,
    "equity": 24821.64,
    "daily_pnl": 482.17,
    "margin_utilization": 0.342,
    "positions": [
      {
        "symbol": "BTC-PERP",
        "side": "LONG",
        "size": 0.85,
        "entry_price": 62450.00,
        "mark_price": 63120.50,
        "unrealized_pnl": 569.92,
        "liquidation_buffer": 0.201
      }
    ]
  }
}`,
    rest: `# REST Telemetry Fallback API
POST /api/v1/telemetry
Host: 127.0.0.1:9042
Authorization: Bearer <HMAC_LOCAL_TOKEN>
Content-Type: application/json

{
  "equity": 24821.64,
  "daily_pnl": 482.17,
  "heartbeat": true,
  "memory_mb": 78.4
}

# Response (200 OK):
{
  "status": "synced",
  "latency_us": 412
}`,
    python: `from stratdesk import StratDeskClient

# Initialize client binding to local adapter
client = StratDeskClient(
    host="127.0.0.1",
    port=9042,
    auth_secret="local_shared_secret"
)

# Broadcast fill notification
client.broadcast_fill(
    symbol="ETH-PERP",
    side="BUY",
    amount=6.20,
    price=3390.40,
    maker=True,
    latency_ms=14.2
)

# Control Bus listener (StratDesk Pro):
@client.on_command("EMERGENCY_HALT")
def emergency_stop(payload):
    bot.cancel_all_orders()
    bot.flatten_positions()
    return {"status": "flattened", "timestamp": time.time()}`,
    docker: `version: "3.8"
services:
  stratdesk-dashboard:
    image: stratdesk/runtime-pro:latest
    container_name: stratdesk-interface
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
      - "127.0.0.1:9042:9042"
    environment:
      - BIND_ADDRESS=127.0.0.1
      - SECURE_TOKEN=\${STRATDESK_SECRET}
      - TELEMETRY_BUFFER_SIZE=10000
    network_mode: "host"`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-28 border-b border-white/10 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            DEVELOPER PROTOCOL
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            BUILT FOR PEOPLE WHO BUILD <br />
            <span className="text-text-muted">THEIR OWN SYSTEMS.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
            Designed to integrate cleanly into existing infrastructure. Stream telemetry via standard WebSockets or REST, deploy via Docker or native binary, and automate with AI agents.
          </p>
        </div>

        {/* Technical Specification Showcase */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-surface border border-border overflow-hidden shadow-2xl font-mono text-xs">
          {/* Protocol Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between p-3 bg-slate-100 dark:bg-background border-b border-border gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActiveTab("websocket")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors flex items-center gap-1.5",
                  activeTab === "websocket"
                    ? "bg-sky-50 dark:bg-accent/20 text-sky-700 dark:text-accent border border-sky-400 dark:border-accent/40 shadow-sm"
                    : "text-text-muted hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>WEBSOCKET SPEC</span>
              </button>
              <button
                onClick={() => setActiveTab("rest")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors flex items-center gap-1.5",
                  activeTab === "rest"
                    ? "bg-sky-50 dark:bg-accent/20 text-sky-700 dark:text-accent border border-sky-400 dark:border-accent/40 shadow-sm"
                    : "text-text-muted hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Network className="w-3.5 h-3.5" />
                <span>REST API</span>
              </button>
              <button
                onClick={() => setActiveTab("python")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors flex items-center gap-1.5",
                  activeTab === "python"
                    ? "bg-sky-50 dark:bg-accent/20 text-sky-700 dark:text-accent border border-sky-400 dark:border-accent/40 shadow-sm"
                    : "text-text-muted hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>PYTHON SDK</span>
              </button>
              <button
                onClick={() => setActiveTab("docker")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors flex items-center gap-1.5",
                  activeTab === "docker"
                    ? "bg-sky-50 dark:bg-accent/20 text-sky-700 dark:text-accent border border-sky-400 dark:border-accent/40 shadow-sm"
                    : "text-text-muted hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Server className="w-3.5 h-3.5" />
                <span>DOCKER COMPOSE</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white dark:bg-white/5 border border-border text-text-secondary hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "COPIED" : "COPY CODE"}</span>
            </button>
          </div>

          {/* Code Viewer */}
          <div data-terminal="true" className="p-6 bg-slate-950 dark:bg-black/80 overflow-x-auto text-slate-200">
            <pre className="text-slate-300 dark:text-text-secondary leading-relaxed text-xs">
              <code>{snippets[activeTab]}</code>
            </pre>
          </div>

          {/* Compatibility Badges */}
          <div className="p-4 bg-slate-100 dark:bg-surface-elevated border-t border-border flex flex-wrap items-center justify-between gap-4 text-[11px] text-text-muted">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-slate-900 dark:text-white font-bold">COMPATIBILITY:</span>
              <span>Python 3.9+</span>
              <span>• Node 18+</span>
              <span>• Go 1.21+</span>
              <span>• Rust</span>
              <span>• CCXT Framework</span>
              <span>• Custom FIX</span>
            </div>
            <span className="text-accent font-semibold">Zero external dependencies</span>
          </div>
        </div>
      </div>
    </section>
  );
};
