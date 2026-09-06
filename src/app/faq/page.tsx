import React from "react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, BookOpen } from "lucide-react";

export default function FaqPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqAccordion defaultCategory="All" />

        {/* Bottom Support Banner */}
        <div className="mt-16 max-w-3xl mx-auto p-8 rounded-2xl bg-surface border border-white/10 text-center font-mono">
          <Badge variant="accent" size="sm" className="mb-3">
            TECHNICAL SUPPORT
          </Badge>
          <h3 className="text-xl font-bold text-white font-sans">
            Have a custom bot architecture question?
          </h3>
          <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed max-w-xl mx-auto">
            Our integration engineering team reviews custom setup specifications for high-frequency or complex multi-account infrastructure.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button href="/docs" variant="primary" size="md" icon={<BookOpen className="w-4 h-4" />}>
              VIEW SPECIFICATIONS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
