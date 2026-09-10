"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Check, X, Minus, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/data/products";

interface ComparisonRow {
  feature: string;
  stratDesk: boolean | string;
  terminalLogs: boolean | string;
  genericDash: boolean | string;
  cloudSaas: boolean | string;
  description: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "100% Self-Hosted & Zero Strategy Leaks",
    stratDesk: true,
    terminalLogs: true,
    genericDash: "Varies",
    cloudSaas: false,
    description: "Your balances, trades, and code stay strictly on your local machine or private VPS.",
  },
  {
    feature: "Bidirectional Emergency Kill-Switch & Halts",
    stratDesk: true,
    terminalLogs: false,
    genericDash: false,
    cloudSaas: "Delayed",
    description: "Atomic command dispatch to cancel all open orders and flatten inventory in one click.",
  },
  {
    feature: "Automated Forensic Ledger & R-Multiples",
    stratDesk: true,
    terminalLogs: false,
    genericDash: false,
    cloudSaas: true,
    description: "Calculates expectancy, Sharpe ratio, slippage waterfall, and microsecond fills automatically.",
  },
  {
    feature: "20 Specialized Quant Trading Archetypes",
    stratDesk: true,
    terminalLogs: false,
    genericDash: false,
    cloudSaas: false,
    description: "Instant presets for FTMO, DEX Snipers, Stat-Arb, Options Greeks, and Market Makers.",
  },
  {
    feature: "Sub-Millisecond Local IPC Latency (<1ms)",
    stratDesk: true,
    terminalLogs: true,
    genericDash: false,
    cloudSaas: false,
    description: "Local loopback / shared-memory sockets prevent execution event loop lag.",
  },
  {
    feature: "HMAC-SHA256 Cryptographic Command Signing",
    stratDesk: true,
    terminalLogs: false,
    genericDash: false,
    cloudSaas: "OAuth",
    description: "Dispatched actions require signed nonces, blocking unauthorized network requests.",
  },
  {
    feature: "Python, CCXT, TypeScript & Go Drop-In SDKs",
    stratDesk: true,
    terminalLogs: "Manual print()",
    genericDash: "Custom",
    cloudSaas: "Proprietary",
    description: "Ready-to-use client libraries with zero external dependencies.",
  },
  {
    feature: "Pricing Model",
    stratDesk: "$49 Perpetual",
    terminalLogs: "Free (100h Dev)",
    genericDash: "Free (High Maint)",
    cloudSaas: "$99 - $300 / mo",
    description: "One-time perpetual purchase with full source code ownership. Zero subscriptions.",
  },
];

export const ComparisonTable: React.FC = () => {
  const renderCell = (val: boolean | string, isStratDesk = false) => {
    if (typeof val === "string") {
      return (
        <span
          className={`font-mono text-xs font-bold ${
            isStratDesk
              ? "text-accent"
              : val.includes("/ mo")
              ? "text-danger"
              : "text-text-secondary"
          }`}
        >
          {val}
        </span>
      );
    }

    if (val === true) {
      return (
        <div className="flex justify-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isStratDesk
                ? "bg-accent/20 text-accent ring-1 ring-accent/40 shadow-glow-cyan"
                : "bg-success/10 text-success"
            }`}
          >
            <Check className="w-3.5 h-3.5" />
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/5 text-text-muted flex items-center justify-center">
          <X className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-28 border-b border-border bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            CAPABILITY MATRIX
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            WHY BUILDERS CHOOSE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-sky-600 to-indigo-700 dark:from-accent dark:via-white dark:to-accent glow-text">
              STRATDESK PRO.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary font-sans leading-relaxed">
            Stop sacrificing privacy for pretty charts or burning hundreds of development hours building one-off internal tools.
          </p>
        </div>

        {/* High Density Institutional Table */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-slate-100/70 dark:bg-background-secondary font-mono text-xs">
                  <th className="py-5 px-6 font-bold text-slate-900 dark:text-white uppercase tracking-wider w-2/5">
                    Core Architectural Feature
                  </th>
                  <th className="py-5 px-4 text-center font-bold text-slate-900 dark:text-accent uppercase tracking-wider bg-accent/5 border-x border-accent/20">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm">STRATDESK PRO</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-accent font-mono font-bold">
                        RECOMMENDED
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-4 text-center font-semibold text-text-muted uppercase tracking-wider">
                    Terminal & Tmux
                  </th>
                  <th className="py-5 px-4 text-center font-semibold text-text-muted uppercase tracking-wider">
                    Generic Web Dashboards
                  </th>
                  <th className="py-5 px-4 text-center font-semibold text-text-muted uppercase tracking-wider">
                    Cloud SaaS Analytics
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 dark:text-white font-sans text-sm">
                        {row.feature}
                      </div>
                      <p className="text-[11px] text-text-muted font-sans mt-0.5">
                        {row.description}
                      </p>
                    </td>

                    {/* StratDesk Column Highlight */}
                    <td className="py-4 px-4 text-center bg-accent/5 border-x border-accent/20">
                      {renderCell(row.stratDesk, true)}
                    </td>

                    <td className="py-4 px-4 text-center">
                      {renderCell(row.terminalLogs)}
                    </td>

                    <td className="py-4 px-4 text-center">
                      {renderCell(row.genericDash)}
                    </td>

                    <td className="py-4 px-4 text-center">
                      {renderCell(row.cloudSaas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Callout */}
          <div className="p-6 bg-slate-50/80 dark:bg-background-secondary border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white font-sans block">
                Ready to upgrade your personal bot with StratDesk Pro?
              </span>
              <p className="text-xs text-text-muted font-mono mt-0.5">
                Instant delivery • Full unminified source code • 100% Private & Self-Hosted
              </p>
            </div>
            <Button
              href={PRODUCTS.pro.whopCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              glow={true}
            >
              GET STRATDESK PRO • $49
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
