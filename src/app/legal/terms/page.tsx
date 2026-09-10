import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Shield, Lock, AlertTriangle, FileText, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and software licensing agreement for StratDesk trading bot dashboards.",
};

export default function TermsOfServicePage() {
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
          <span className="text-sky-700 dark:text-accent font-bold">TERMS OF SERVICE</span>
        </div>

        {/* Page Header */}
        <div className="border-b border-border pb-8 mb-10">
          <Badge variant="accent" size="sm" className="mb-3">
            LEGAL AGREEMENT
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Terms of Service
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-text-muted">
            <span>EFFECTIVE DATE: SEPTEMBER 2026</span>
            <span>•</span>
            <span>VERSION 1.0</span>
            <span>•</span>
            <span>APPLIES TO: STRATDESK PRO</span>
          </div>
        </div>

        {/* Important Warning Banner */}
        <div className="p-4 sm:p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs font-mono mb-10 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-warning shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-800 dark:text-warning uppercase block">
              Financial Risk & No Financial Advice Disclaimer
            </span>
            <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
              StratDesk is purely client-side telemetry, visualization, and user interface software. StratDesk does NOT provide financial, investment, legal, accounting, or tax advice. StratDesk is not a broker, exchange, or custodian. Trading digital assets, cryptocurrencies, equities, and derivatives involves substantial risk of financial loss. You retain 100% responsibility for your trading bot decisions, execution algorithms, and market orders.
            </p>
          </div>
        </div>

        {/* Legal Body Sections */}
        <div className="space-y-10 font-sans text-slate-700 dark:text-text-secondary text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section id="license" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">01.</span>
              Software License Grant
            </h2>
            <p>
              Upon purchasing a perpetual license to <strong>StratDesk Pro</strong> via our designated merchant of record (Whop), you are granted a non-exclusive, non-transferable, perpetual, royalty-free license to download, install, modify, and execute the source code on your private computers, servers, or cloud virtual machines.
            </p>
            <p>
              This license authorizes you to integrate the software with your personal, proprietary, or proprietary fund trading bots. You may modify the source code to suit your internal algorithmic requirements.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">02.</span>
              Prohibited Redistribution & Resale
            </h2>
            <p>
              You may <strong>NOT</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600 dark:text-slate-300 text-sm">
              <li>Resell, redistribute, sub-license, rent, or lease the raw source code, UI components, or templates in whole or in part to third parties.</li>
              <li>Publish the proprietary codebase to public source repositories (e.g., public GitHub, GitLab, or package managers).</li>
              <li>Offer StratDesk as a multi-tenant public SaaS platform or storefront competing directly with StratDesk.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">03.</span>
              Non-Custodial & Self-Hosted Architecture
            </h2>
            <p>
              StratDesk operates entirely on client infrastructure. There are no centralized StratDesk backend databases receiving your portfolio valuations, trade histories, exchange secrets, or private keys.
            </p>
            <p>
              You acknowledge that you are solely responsible for securing your local environment, network ports, firewall configurations, and local loopback bindings (e.g., <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white">127.0.0.1:3000</code>).
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">04.</span>
              Digital Goods & Refund Policy
            </h2>
            <p>
              Due to the immediate digital delivery and non-returnable nature of software source code, all purchases are generally final once access is provisioned via Whop. If you experience technical defects preventing deployment or unresolvable bugs within 14 days of purchase, please contact our support team at <strong className="text-slate-900 dark:text-white font-mono text-sm">stratdesk.pro@gmail.com</strong>.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">05.</span>
              Disclaimer of Warranties & Limitation of Liability
            </h2>
            <p>
              STRATDESK IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              IN NO EVENT SHALL STRATDESK, ITS CREATORS, OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF CAPITAL, TRADING LOSSES, SLIPPAGE, EXCHANGE API DISCONNECTIONS, NETWORK OUTAGES, OR SYSTEM DOWNTIME) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
              <span className="text-sky-700 dark:text-accent font-mono text-base">06.</span>
              Modifications & Inquiries
            </h2>
            <p>
              We reserve the right to revise these Terms of Service at any time. Continued use of the website constitutes agreement to updated terms.
            </p>
            <div className="pt-4 border-t border-border font-mono text-xs text-slate-500 dark:text-text-muted">
              <span>Direct inquiries: stratdesk.pro@gmail.com • Merchant of Record: Whop.com</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
