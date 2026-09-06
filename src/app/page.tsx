import React from "react";
import { Hero } from "@/components/hero/Hero";
import { CredibilityStrip } from "@/components/hero/CredibilityStrip";
import { TheProblem } from "@/components/home/TheProblem";
import { ProductCards } from "@/components/products/ProductCards";
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

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <CredibilityStrip />
      <TheProblem />
      <ProductCards />
      <ArchitecturesShowcase />
      <FeatureShowcase />
      <BotArchitecture />
      <HowItWorksSteps />
      <AiIntegration />
      <ThemeGallery />
      <DashboardLab />
      <TechnicalSpecs />
      <SecuritySection />
      <FaqAccordion />
      <FinalCta />
    </div>
  );
}
