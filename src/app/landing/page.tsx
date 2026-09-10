import React from "react";
import { Metadata } from "next";
import { ProHeroSection } from "@/components/home/ProHeroSection";
import { CredibilityStrip } from "@/components/hero/CredibilityStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { ArchitecturesShowcase } from "@/components/home/ArchitecturesShowcase";
import { FeatureShowcase } from "@/components/features/FeatureShowcase";
import { BotArchitecture } from "@/components/architecture/BotArchitecture";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { AiIntegration } from "@/components/integration/AiIntegration";
import { ThemeGallery } from "@/components/themes/ThemeGallery";
import { DashboardLab } from "@/components/lab/DashboardLab";
import { TechnicalSpecs } from "@/components/technical/TechnicalSpecs";
import { SecuritySection } from "@/components/security/SecuritySection";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FinalCta } from "@/components/cta/FinalCta";

export const metadata: Metadata = {
  title: "StratDesk Pro | Institutional Trading Bot Dashboard & HUD",
  description:
    "Institutional trading dashboard for automated bots. 20 architecture blueprints, sub-1ms IPC bridge, forensic trade ledger, and 6 precision themes.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      <ProHeroSection />
      <CredibilityStrip />
      <Testimonials />
      <ComparisonTable />
      <ArchitecturesShowcase />
      <FeatureShowcase />
      <BotArchitecture />
      <HowItWorksSteps />
      <AiIntegration />
      <ThemeGallery />
      <DashboardLab mode="launcher" />
      <TechnicalSpecs />
      <SecuritySection />
      <FaqAccordion />
      <FinalCta />
    </div>
  );
}
