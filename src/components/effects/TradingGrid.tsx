import React from "react";
import { cn } from "@/lib/utils";

interface TradingGridProps {
  className?: string;
  dense?: boolean;
  dots?: boolean;
  fadeEdges?: boolean;
}

export const TradingGrid: React.FC<TradingGridProps> = ({
  className,
  dense = false,
  dots = false,
  fadeEdges = true,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 select-none overflow-hidden",
        dots ? "tech-dots opacity-40" : dense ? "tech-grid-dense opacity-30" : "tech-grid opacity-25",
        className
      )}
      style={
        fadeEdges
          ? {
              maskImage: "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.85) 10%, rgba(0,0,0,0.2) 60%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.85) 10%, rgba(0,0,0,0.2) 60%, transparent 80%)",
            }
          : undefined
      }
    />
  );
};
