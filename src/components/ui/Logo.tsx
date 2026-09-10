import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  glow?: boolean;
  href?: string;
}

export const StratDeskSymbol: React.FC<{
  className?: string;
  size?: number;
  glow?: boolean;
}> = ({ className, size = 32, glow = false }) => {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center select-none", className)}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-lg blur-md bg-accent/30 pointer-events-none transform scale-110"
          aria-hidden="true"
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Outer Precision Aperture */}
        <path
          d="M18 2.5L31.5 10.2942V25.7058L18 33.5L4.5 25.7058V10.2942L18 2.5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          className="text-white/80"
        />
        {/* Algorithmic Orbit & Nodes */}
        <circle
          cx="18"
          cy="18"
          r="9.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="2 3"
          className="text-accent/70"
        />
        {/* Core Vector Intersection (A-Node) */}
        <path
          d="M18 9L24.5 23H11.5L18 9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="text-accent"
        />
        {/* Center Kernel Pulse */}
        <circle cx="18" cy="18" r="2.2" fill="currentColor" className="text-accent" />
        <circle cx="18" cy="18" r="4" stroke="currentColor" strokeWidth="0.75" className="text-accent/50" />
      </svg>
    </div>
  );
};

export const AlgorbSymbol = StratDeskSymbol;

export const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  showWordmark = true,
  showBadge = false,
  badgeText = "STOREFRONT",
  glow = false,
  href = "/home",
}) => {
  const sizeMap = {
    sm: { symbol: 24, text: "text-base tracking-[0.2em]", gap: "gap-2" },
    md: { symbol: 30, text: "text-lg tracking-[0.22em]", gap: "gap-2.5" },
    lg: { symbol: 38, text: "text-2xl tracking-[0.24em]", gap: "gap-3" },
    xl: { symbol: 48, text: "text-3xl tracking-[0.26em]", gap: "gap-4" },
  };

  const { symbol, text, gap } = sizeMap[size];

  const content = (
    <div className={cn("inline-flex items-center group cursor-pointer select-none", gap, className)}>
      <StratDeskSymbol size={symbol} glow={glow} />
      {showWordmark && (
        <div className="flex items-center gap-2">
          <span className={cn("font-bold text-white font-mono uppercase transition-colors duration-200 group-hover:text-accent", text)}>
            StratDesk
          </span>
          {showBadge && (
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-semibold tracking-wider text-accent/90 bg-accent/10 border border-accent/30 rounded">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="StratDesk Homepage" className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
};
