import React from "react";
import { ArrowRight, GraduationCap, Factory, Network } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";

const DEPLOYMENT_AREAS = [
  {
    title: "Talent training and development",
    icon: GraduationCap,
  },
  {
    title: "Industrial and energy pilot projects",
    icon: Factory,
  },
  {
    title: "Infrastructure development through NIDC hubs",
    icon: Network,
  },
];

export default function Deployment() {
  return (
    <SectionWrapper 
      title="Deployment" 
      description="Funds are deployed into high-impact areas aligned with national development priorities."
    >
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {DEPLOYMENT_AREAS.map((area, idx) => (
          <div 
            key={idx}
            className="flex items-start gap-4 p-6 rounded-2xl border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <area.icon className="h-6 w-6" />
            </div>
            <div className="flex flex-col justify-center h-12">
              <h3 className="text-lg font-semibold text-foreground leading-tight">
                {area.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
