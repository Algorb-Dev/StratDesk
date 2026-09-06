import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost" | "control";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "left",
  glow = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center font-mono font-medium tracking-wide uppercase transition-all duration-200 select-none overflow-hidden group rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
    md: "text-xs px-4 py-2 gap-2 h-10 tracking-wider",
    lg: "text-sm px-6 py-2.5 gap-2.5 h-12 tracking-wider",
    xl: "text-base px-8 py-3.5 gap-3 h-14 tracking-widest font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-accent text-background font-bold hover:bg-accent-hover hover:shadow-glow-cyan active:scale-[0.98] border border-accent",
    secondary:
      "bg-surface-elevated text-text-primary hover:bg-surface-hover hover:border-accent/40 border border-border text-white active:scale-[0.98]",
    outline:
      "bg-transparent text-text-primary border border-border hover:border-accent/60 hover:text-accent hover:bg-accent/5 active:scale-[0.98]",
    danger:
      "bg-danger/10 text-danger border border-danger/40 hover:bg-danger/20 hover:border-danger hover:shadow-lg active:scale-[0.98]",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface active:scale-[0.98]",
    control:
      "bg-surface-elevated border-2 border-warning/50 text-warning font-bold hover:bg-warning/10 hover:border-warning active:scale-[0.98]",
  };

  const glowStyles = glow ? "shadow-glow-cyan" : "";

  const content = (
    <>
      {/* Subtle light sweep reflection */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

      {icon && iconPosition === "left" && <span className="relative z-10 transition-transform duration-200 group-hover:-translate-x-0.5">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], glowStyles, className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], glowStyles, className)}
      {...props}
    >
      {content}
    </button>
  );
};
