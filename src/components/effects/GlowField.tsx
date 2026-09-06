import React from "react";
import { cn } from "@/lib/utils";

interface GlowFieldProps {
  className?: string;
  color?: "cyan" | "emerald" | "amber" | "subtle";
  position?: "top" | "center" | "bottom" | "custom";
}

export const GlowField: React.FC<GlowFieldProps> = ({
  className,
  color = "cyan",
  position = "top",
}) => {
  const colorMap = {
    cyan: "from-accent/20 via-accent/5 to-transparent",
    emerald: "from-success/20 via-success/5 to-transparent",
    amber: "from-warning/20 via-warning/5 to-transparent",
    subtle: "from-white/10 via-white/5 to-transparent",
  };

  const positionMap = {
    top: "top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px]",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]",
    bottom: "bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px]",
    custom: "",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none rounded-full blur-[120px] bg-gradient-to-b opacity-60",
        positionMap[position],
        colorMap[color],
        className
      )}
    />
  );
};
