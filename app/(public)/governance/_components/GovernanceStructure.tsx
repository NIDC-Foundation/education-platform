import React from "react";
import { Shield, Users, Lightbulb } from "lucide-react";

const STRUCTURE_TIERS = [
  {
    title: "Directors",
    description: "Responsible for oversight and direction.",
    icon: Shield,
  },
  {
    title: "Core Team",
    description: "Handles operations and coordination.",
    icon: Users,
  },
  {
    title: "Advisors",
    description: "Provide strategic guidance.",
    icon: Lightbulb,
  },
];

export default function GovernanceStructure() {
  return (
    <section className="relative w-full overflow-hidden bg-muted/30 px-4 py-24 md:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Structure
          </div>
          
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6">
            Structural Hierarchy
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our governance model is designed to ensure accountability, agility, and long-term vision execution across all levels of the foundation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
          
          {STRUCTURE_TIERS.map((tier, idx) => (
            <div 
              key={tier.title} 
              className="flex flex-col items-start gap-4 rounded-3xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-background hover:border-primary/30"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <tier.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {tier.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {tier.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
