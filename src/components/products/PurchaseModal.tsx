"use client";

import React, { useState } from "react";
import { ProductTier } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { X, CheckCircle2, ShieldCheck, Mail, ArrowRight } from "lucide-react";

interface PurchaseModalProps {
  product: ProductTier | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-elevated border border-white/15 p-6 sm:p-8 shadow-2xl font-mono text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-success/20 text-success border border-success/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-sans">You&apos;re on the Priority List</h3>
            <p className="mt-2 text-xs text-text-secondary leading-relaxed max-w-sm mx-auto">
              We received your reservation for <span className="text-white font-bold">{product.name}</span>. You will receive first-wave build access and launch release pricing.
            </p>
            <Button
              variant="outline"
              size="md"
              className="mt-6"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
            >
              CLOSE WINDOW
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent" size="sm">
                EARLY ACCESS TIER
              </Badge>
              <span className="text-xs text-text-muted">{product.badge}</span>
            </div>

            <h3 className="text-2xl font-bold font-sans text-white">
              Reserve {product.name}
            </h3>

            <p className="mt-2 text-xs text-text-secondary leading-relaxed">
              Algorb dashboards are currently in targeted private preview. Pricing and commercial licenses are launching shortly.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-text-muted uppercase">License Model</span>
                <div className="text-sm font-bold text-white">Perpetual / Self-Hosted</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-text-muted uppercase">Launch Price</span>
                <div className="text-sm font-bold text-accent">{product.pricePlaceholder}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="text-xs text-text-muted">Enter email to secure launch queue slot:</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="email"
                    required
                    placeholder="quant@infrastructure.internal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded bg-surface border border-white/15 text-white text-xs font-mono placeholder:text-text-muted focus:outline-none focus:border-accent"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  RESERVE
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[10px] text-text-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>No spam. No cloud telemetry. Strictly release notifications.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
