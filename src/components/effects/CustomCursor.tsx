"use client";

import React, { useEffect, useRef, useState } from "react";

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
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
      const x = e.clientX;
      const y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      if (!isVisible) {
        setIsVisible(true);
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest(
          "button, a, input, select, textarea, [role='button'], [tabindex='0'], label, summary, [data-clickable='true']"
        );
        const shouldBePointer = Boolean(clickable);
        setIsPointer((prev) => (prev !== shouldBePointer ? shouldBePointer : prev));
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
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Crosshair Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[width,height,box-shadow,opacity] duration-150 ease-out ${
          isPointer
            ? "w-2.5 h-2.5 bg-accent shadow-[0_0_12px_rgba(0,240,255,1),0_0_4px_rgba(255,255,255,0.9)]"
            : "w-1.5 h-1.5 bg-accent shadow-[0_0_8px_rgba(0,240,255,0.85)]"
        }`}
      />
    </div>
  );
};
