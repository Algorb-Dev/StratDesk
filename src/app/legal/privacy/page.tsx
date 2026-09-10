import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Shield, EyeOff, Lock, Server, CheckCircle2, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection principles for StratDesk trading bot dashboards.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-text-muted mb-6">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 dark:text-text-secondary">LEGAL</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-sky-700 dark:text-accent font-bold">PRIVACY POLICY</span>
        </div>

        {/* Page Header */}
        <div className="border-b border-border pb-8 mb-10">
          <Badge variant="accent" size="sm" className="mb-3">
            DATA PRIVACY & SOVEREIGNTY
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Privacy Policy
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-text-muted">
            <span>EFFECTIVE DATE: SEPTEMBER 2026</span>
            <span>•</span>
            <span>VERSION 1.0</span>
            <span>•</span>
            <span>DATA JURISDICTION: 100% LOCALHOST RUNTIME</span>
          </div>
        </div>

        {/* 3 Privacy Pillars Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 font-mono text-xs">
          <div className="p-4 rounded-xl border border-border bg-surface/90 dark:bg-surface/70 shadow-sm dark:shadow-none space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
              <EyeOff className="w-4 h-4" />
              <span>Zero Cloud Telemetry</span>
            </div>
            <p className="text-slate-600 dark:text-text-secondary font-sans text-xs">
              No trade fills, wallet balances, or PnL numbers ever leave your machine.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface/90 dark:bg-surface/70 shadow-sm dark:shadow-none space-y-1.5">
            <div className="flex items-center gap-2 text-sky-700 dark:text-accent font-bold">
              <Lock className="w-4 h-4" />
              <span>Zero Key Custody</span>
            </div>
            <p className="text-slate-600 dark:text-text-secondary font-sans text-xs">
              StratDesk never requests, stores, or transmits your exchange API secrets.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-surface/90 dark:bg-surface/70 shadow-sm dark:shadow-none space-y-1.5">
            <div className="flex items-center gap-2 text-amber-700 dark:text-warning font-bold">
              <Server className="w-4 h-4" />
              <span>100% Self-Hosted</span>
            </div>
            <p className="text-slate-600 dark:text-text-secondary font-sans text-xs">
              All IPC data pipes stream over loopback (<code className="text-xs">127.0.0.1</code>) or private VPN.
            </p>
          </div>
        </div>

        {/* Legal Body Sections */}
        <div className="space-y-10 font-sans text-slate-700 dark:text-text-secondary text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">01.</span>
              Core Architectural Privacy Commitment
            </h2>
            <p>
              At StratDesk, we believe quantitative traders, algorithm developers, and bot operators require absolute sovereignty over their data. Unlike conventional web-based trading terminals or multi-tenant analytics SaaS platforms, StratDesk is distributed as <strong>self-hosted client-side software</strong>.
            </p>
            <p>
              We do not track your trades, your strategy alpha, your account balances, your position sizes, or your win/loss metrics. There are zero background analytics beacons sending operational trading data back to StratDesk servers.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">02.</span>
              Trade Ingestion Telemetry & Local Storage
            </h2>
            <p>
              When your trading bot (Python, CCXT, Node.js, Go) posts execution records to <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white">POST /api/ledger</code>, that traffic stays completely internal to your server or localhost instance.
            </p>
            <p>
              Trade journal entries, R-multiple stats, and performance charts are stored in your browser&apos;s local memory (e.g., <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white">localStorage</code>) or your private database container. Clearing your browser data or deleting local container volumes wipes this data permanently.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">03.</span>
              Exchange API Credentials & Passphrases
            </h2>
            <p>
              StratDesk does not require write keys, withdrawal keys, or trade execution credentials. Your trading bot connects directly to Binance, Bybit, Coinbase, Hyperliquid, or Solana nodes. StratDesk operates as a downstream presentation layer that consumes high-level formatted output.
            </p>
            <p>
              In <strong>StratDesk Pro</strong>, local commands (such as emergency kill-switch or parameter reload) use HMAC-SHA256 signatures with a locally generated secret known only to your bot script and your private dashboard session.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">04.</span>
              Purchases & Payment Information
            </h2>
            <p>
              When purchasing a digital license for StratDesk Pro, transactions are handled by our Merchant of Record, <strong>Whop</strong> (<a href="https://whop.com" target="_blank" rel="noopener noreferrer" className="text-sky-700 dark:text-accent hover:underline">whop.com</a>).
            </p>
            <p>
              Whop securely processes payment cards, invoices, tax compliance, and license key generation. StratDesk never receives, processes, or stores your credit card number, bank credentials, or billing payment methods.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">05.</span>
              Website Cookies & Marketing
            </h2>
            <p>
              Our storefront website uses minimal functional cookies strictly required for theme state persistence (<code className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white">stratdesk_active_theme</code>) and UI preferences. We do not sell user data to advertising networks or third-party data brokers.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">06.</span>
              Security & Operator Responsibility
            </h2>
            <p>
              Because StratDesk runs on your private hardware, you retain control of network ingress/egress. We recommend deploying StratDesk behind a private wireguard network, Tailscale mesh, or password-protected reverse proxy (e.g. NGINX with basic auth or Cloudflare Access) if exposing the dashboard to the public internet.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">07.</span>
              Contact Us
            </h2>
            <p>
              If you have any questions regarding our architectural privacy model or data security guidelines, please reach out to us:
            </p>
            <div className="p-4 rounded-xl border border-border bg-surface/80 font-mono text-xs text-slate-600 dark:text-text-muted space-y-1">
              <div>Email: <strong className="text-slate-900 dark:text-white">stratdesk.pro@gmail.com</strong></div>
              <div>Security Inquiries: <strong className="text-slate-900 dark:text-white">stratdesk.pro@gmail.com</strong></div>
              <div>Merchant of Record: Whop (Whop Inc.)</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
