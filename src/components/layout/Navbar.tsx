"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, Terminal, Cpu, Layers, ShieldCheck, HelpCircle, BookOpen, Compass } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Products", href: "/products", icon: Layers },
    { label: "Architectures", href: "/architectures", icon: Compass },
    { label: "Features", href: "/#features", icon: Cpu },
    { label: "How It Works", href: "/how-it-works", icon: Terminal },
    { label: "Themes", href: "/themes", icon: Layers },
    { label: "FAQ", href: "/faq", icon: HelpCircle },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none",
          isScrolled
            ? "py-2.5 bg-background/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50"
            : "py-4 bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: Algorb Logo */}
          <div className="flex items-center gap-8">
            <Logo size="md" glow={true} />
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded transition-all duration-150 uppercase tracking-wider relative group",
                    isActive
                      ? "text-accent bg-accent/5 font-semibold"
                      : "text-text-secondary hover:text-white hover:bg-white/[0.03]"
                  )}
                >
                  {link.label}
                  {/* Subtle active / hover micro-indicator */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-accent transition-all duration-200",
                      isActive ? "w-4/5 opacity-100" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-70"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Documentation & Explore CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/docs"
              className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>DOCS</span>
            </Link>

            <Button
              href="/#dashboard-lab"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3 h-3" />}
              iconPosition="right"
              glow={true}
            >
              EXPLORE DASHBOARDS
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded bg-white/5 border border-white/10 text-text-secondary hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* High-End Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-background/95 backdrop-blur-xl flex flex-col pt-20 px-6 pb-8 border-b border-white/10">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Logo size="sm" showBadge={true} badgeText="MENU" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded bg-white/5 border border-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2 py-6 font-mono">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded bg-surface/50 border border-white/5 text-white hover:border-accent/40 hover:text-accent transition-all text-sm uppercase tracking-wider"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-accent" />
                    <span>{link.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}

            <Link
              href="/docs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded bg-surface/50 border border-white/5 text-white hover:border-accent/40 hover:text-accent transition-all text-sm uppercase tracking-wider"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-text-muted" />
                <span>DOCUMENTATION</span>
              </div>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </Link>
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <Button
              href="/#dashboard-lab"
              variant="primary"
              size="lg"
              className="w-full"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              EXPLORE DASHBOARDS
            </Button>
            <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                SELF-HOSTED INTERFACE
              </span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
