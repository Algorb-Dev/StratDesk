import React from "react";
import { cn } from "@/lib/utils";

interface ScanlineProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

export const Scanline: React.FC<ScanlineProps> = ({
  className,
  intensity = "subtle",
}) => {
  const intensityMap = {
    subtle: "opacity-15",
    medium: "opacity-25",
    strong: "opacity-40",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-20 select-none scanline-overlay",
        intensityMap[intensity],
        className
      )}
    />
  );
};
