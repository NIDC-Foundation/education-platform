import React from "react";
import { Users, Building, Coins } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";

const SOURCES = [
  {
    title: "Individual Support",
    description: "Contributions from individuals who believe in building Nigeria's future capacity.",
    icon: Users,
  },
  {
    title: "Institutional Partnerships",
    description: "Grants and funding from organizations aligned with long-term development.",
    icon: Building,
  },
  {
    title: "Operational Revenue",
    description: "Income generated through projects and activities within our hubs, including energy, manufacturing, and digital infrastructure.",
    icon: Coins,
  },
];

export default function FundingSources() {
  return (
    <SectionWrapper 
      title="Sources of Funding" 
      description="We receive support from three primary channels to power the NIDC Foundation."
    >
      <div className="grid gap-6 md:grid-cols-3 mt-12">
        {SOURCES.map((source, idx) => (
          <div 
            key={idx}
            className="group relative flex flex-col items-start p-8 rounded-3xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <source.icon className="h-7 w-7" />
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-3">
              {source.title}
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              {source.description}
            </p>

            {/* Subtle glow on hover */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
