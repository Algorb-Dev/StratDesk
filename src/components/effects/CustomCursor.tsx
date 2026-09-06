"use client";

import React, { useEffect, useState } from "react";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine control
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    setIsDesktop(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest("button, a, input, [role='button'], [tabindex='0']");
        setIsPointer(!!clickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isDesktop || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300">
      {/* Precision Crosshair Dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent pointer-events-none transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? "6px" : "4px",
          height: isPointer ? "6px" : "4px",
          boxShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
        }}
      />
      {/* Subtle Trailing Reticle Ring */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 pointer-events-none transition-all duration-200 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? "36px" : "22px",
          height: isPointer ? "36px" : "22px",
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.15 : 1})`,
          borderColor: isPointer ? "rgba(0, 240, 255, 0.7)" : "rgba(0, 240, 255, 0.3)",
        }}
      />
    </div>
  );
};
