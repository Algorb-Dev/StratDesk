import React from "react";
import { Metadata } from "next";
import { DashboardLab } from "@/components/lab/DashboardLab";

export const metadata: Metadata = {
  title: "Dashboard Lab | Interactive Trading HUD Simulator",
  description:
    "Test-drive 20 institutional algorithmic trading dashboard archetypes, hot-swap telemetry profiles, and simulate live command buses interactively.",
  openGraph: {
    title: "StratDesk Dashboard Lab | Interactive Bot Interface Simulator",
    description:
      "Test-drive 20 institutional algorithmic trading dashboard archetypes, hot-swap telemetry profiles, and simulate live command buses interactively.",
  },
};

export default function LabPage() {
  return (
    <div className="pt-20 pb-16 bg-background min-h-screen">
      <DashboardLab mode="workstation" />
    </div>
  );
}
