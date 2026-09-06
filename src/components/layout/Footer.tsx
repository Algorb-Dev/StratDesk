import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Shield, Terminal, Cpu, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-background-secondary border-t border-white/10 pt-16 pb-12 overflow-hidden select-none">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Logo size="lg" glow={true} />
            <p className="text-text-secondary text-sm max-w-sm font-sans leading-relaxed">
              Premium, ready-to-use interfaces engineered for personal algorithmic trading bots. Total telemetry and command control without altering your proprietary execution engine.
            </p>
            <div className="flex items-center gap-3 font-mono text-xs text-text-muted mt-2">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
                <Shield className="w-3.5 h-3.5 text-success" />
                100% Self-Hosted
              </span>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                Open IPC Schema
              </span>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col gap-3 font-mono text-xs">
            <span className="font-bold text-white uppercase tracking-widest text-[11px] mb-1">
              Products
            </span>
            <Link
              href="/products/view"
              className="text-text-secondary hover:text-accent transition-colors flex items-center gap-1 group"
            >
              <span>Algorb View</span>
              <span className="text-[9px] text-accent/80 font-normal ml-1">Monitor</span>
            </Link>
            <Link
              href="/products/control"
              className="text-text-secondary hover:text-accent transition-colors flex items-center gap-1 group"
            >
              <span>Algorb Control</span>
              <span className="text-[9px] text-warning/80 font-normal ml-1">Command</span>
            </Link>
            <Link
              href="/themes"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              Themes Gallery
            </Link>
            <Link
              href="/#dashboard-lab"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              Dashboard Lab
            </Link>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col gap-3 font-mono text-xs">
            <span className="font-bold text-white uppercase tracking-widest text-[11px] mb-1">
              Resources
            </span>
            <Link
              href="/docs"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/how-it-works"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              Integration Guide
            </Link>
            <Link
              href="/faq"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              Technical FAQ
            </Link>
            <Link
              href="/docs#ai-spec"
              className="text-text-secondary hover:text-accent transition-colors"
            >
              AI Agent Prompt Spec
            </Link>
          </div>

          {/* Column 4: Architecture & Legal */}
          <div className="flex flex-col gap-3 font-mono text-xs">
            <span className="font-bold text-white uppercase tracking-widest text-[11px] mb-1">
              Legal & Info
            </span>
            <span className="text-text-muted cursor-not-allowed">Software License</span>
            <span className="text-text-muted cursor-not-allowed">Terms of Service</span>
            <span className="text-text-muted cursor-not-allowed">Privacy Policy</span>
            <div className="mt-2 text-[10px] text-text-muted border-t border-white/5 pt-2">
              <span>Independent software brand. Not an exchange or financial advisor.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <div>
            © {new Date().getFullYear()} Algorb. All rights reserved. Built for autonomous systems.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
              SYSTEM TELEMETRY NOMINAL
            </span>
            <span>BUILD 2026.09</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
