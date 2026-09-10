import React from "react";
import type { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, Terminal, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Documentation Hub & Python SDK",
  description:
    "Complete developer reference and boilerplate code for connecting your custom algorithmic trading bot to the StratDesk dashboard via Python (CCXT), TypeScript, and WebSocket IPC.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-28 pb-24 bg-background min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Universal Documentation Header Banner */}
        <div className="pb-8 border-b border-border mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="accent" size="sm">
                DEVELOPER DOCUMENTATION HUB
              </Badge>
              <span className="text-[10px] text-slate-600 dark:text-text-muted px-2 py-0.5 rounded border border-border bg-slate-100/80 dark:bg-white/[0.02]">
                REST JSON-RPC • LOCAL IPC • ZERO KEY LEAK
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>INGESTION API: <strong className="text-slate-900 dark:text-white">POST /api/ledger</strong></span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            STRATDESK BOT INTEGRATION & SDK SPECIFICATION
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-text-secondary font-sans max-w-3xl leading-relaxed">
            Everything you need to link your proprietary trading engine (Python, CCXT, Node.js, Rust, Go) to your self-hosted StratDesk dashboard.
          </p>
        </div>

        {/* Layout Grid: Sidebar Navigation + Dynamic Main Page Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1">
            <DocsSidebar />
          </div>

          <main className="lg:col-span-3 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
