"use client";

import React, { useState } from "react";
import { FAQS, FaqItem } from "@/data/faq";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, HelpCircle, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export const FaqAccordion: React.FC<{ defaultCategory?: string }> = ({
  defaultCategory = "All",
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "what-am-i-buying": true,
    "does-algorb-execute-trades": true,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);

  const categories = ["All", "General", "Architecture", "Integration", "Security", "Products"];

  const filteredFaqs =
    selectedCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === selectedCategory);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="faq" className="relative py-28 border-b border-border bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="accent" size="sm" className="mb-3">
            TECHNICAL INQUIRIES
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            FREQUENTLY ASKED QUESTIONS.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-text-secondary leading-relaxed font-sans">
            Straightforward technical answers regarding bot compatibility, architecture, hosting, and privacy.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg border transition-all uppercase",
                selectedCategory === cat
                  ? "bg-sky-50 dark:bg-accent/15 border-sky-400 dark:border-accent/60 text-sky-800 dark:text-accent font-bold shadow-sm dark:shadow-glow-cyan"
                  : "bg-surface border-border text-slate-600 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Item List */}
        <div className="space-y-3 font-mono">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                className={cn(
                  "rounded-xl border transition-all duration-200 overflow-hidden bg-surface/90 dark:bg-surface/70",
                  isOpen ? "border-slate-300 dark:border-white/25 bg-white dark:bg-surface-elevated/80 shadow-md dark:shadow-lg" : "border-border hover:border-slate-300 dark:hover:border-white/20"
                )}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 select-none focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-sky-700 dark:text-accent uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-50 dark:bg-accent/10 border border-sky-200 dark:border-accent/20 font-bold">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-text-muted transition-transform duration-200 shrink-0",
                      isOpen ? "transform rotate-180 text-sky-600 dark:text-accent" : ""
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 border-t border-border pt-3">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-text-secondary font-sans leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.codeSnippet && (
                      <div data-terminal="true" className="mt-3 p-3 rounded bg-slate-950 dark:bg-black/60 border border-slate-800 dark:border-white/10 text-[11px] text-accent font-mono overflow-x-auto">
                        <pre>
                          <code>{faq.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
