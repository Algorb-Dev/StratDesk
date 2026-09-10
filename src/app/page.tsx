import React from "react";
import { Metadata } from "next";
import { DashboardLab } from "@/components/lab/DashboardLab";

export const metadata: Metadata = {
  title: "StratDesk Pro | Institutional Trading HUD Workstation",
  description:
    "Institutional algorithmic trading dashboard workstation. Live telemetry, 20 specialized bot archetypes, 6 precision themes, and cryptographic command bus controls.",
  openGraph: {
    title: "StratDesk Pro | Institutional Trading HUD Workstation",
    description:
      "Institutional algorithmic trading dashboard workstation. Live telemetry, 20 specialized bot archetypes, 6 precision themes, and cryptographic command bus controls.",
  },
};

export default function HomePage() {
  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <DashboardLab mode="workstation" />
    </div>
  );
}
