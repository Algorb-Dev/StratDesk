import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "default",
  size = "md",
  dot = false,
  pulse = false,
}) => {
  const variantStyles = {
    default: "bg-surface-elevated text-text-secondary border-border",
    accent: "bg-accent/10 text-accent border-accent/30",
    success: "bg-success/10 text-success border-success/30",
    warning: "bg-warning/10 text-warning border-warning/30",
    danger: "bg-danger/10 text-danger border-danger/30",
    outline: "bg-transparent text-text-secondary border-border",
  };

  const dotColors = {
    default: "bg-text-secondary",
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    outline: "bg-text-muted",
  };

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 gap-1.5",
    md: "text-xs px-2.5 py-1 gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-medium tracking-wider uppercase border rounded",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                dotColors[variant]
              )}
            />
          )}
          <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", dotColors[variant])} />
        </span>
      )}
      {children}
    </span>
  );
};
