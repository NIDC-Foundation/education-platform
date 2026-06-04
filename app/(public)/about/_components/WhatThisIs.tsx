import React from "react";
import { LineChart, BookOpen, Building2 } from "lucide-react";

const PILLARS = [
  {
    title: "Continuous Development",
    description: "Ongoing skill building and compounding growth.",
    icon: LineChart,
  },
  {
    title: "Application",
    description: "Putting knowledge into action through practical experience.",
    icon: BookOpen,
  },
  {
    title: "Contribution",
    description: "Deploying capabilities into real-world systems to drive impact.",
    icon: Building2,
  },
];

export default function WhatThisIs() {
  return (
    <section className="relative w-full overflow-hidden bg-muted/30 px-4 py-24 md:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              What This Is
            </div>
            
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6">
              A Structured System
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              NIDC is designed to move individuals from potential to real capability. Not just through learning — but through continuous development, application, and contribution.
            </p>
          </div>

          <div className="flex flex-col gap-4 relative">
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -z-10" />
            
            {PILLARS.map((pillar, idx) => (
              <div 
                key={pillar.title} 
                className="flex items-start gap-4 rounded-2xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all hover:bg-background hover:border-primary/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
