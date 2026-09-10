import React from "react";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { BotArchitecture } from "@/components/architecture/BotArchitecture";
import { AiIntegration } from "@/components/integration/AiIntegration";
import { Badge } from "@/components/ui/Badge";

export default function HowItWorksPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="accent" size="sm" className="mb-3">
            TECHNICAL WALKTHROUGH
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
            HOW STRATDESK CONNECTS.
          </h1>
          <p className="mt-4 text-base sm:text-xl text-text-secondary leading-relaxed font-sans">
            A comprehensive breakdown of how the interface communicates with your local trading bot process without compromising execution safety or secret keys.
          </p>
        </div>

        <HowItWorksSteps />
        <div className="mt-16">
          <BotArchitecture />
        </div>
        <div className="mt-16">
          <AiIntegration />
        </div>
      </div>
    </div>
  );
}
