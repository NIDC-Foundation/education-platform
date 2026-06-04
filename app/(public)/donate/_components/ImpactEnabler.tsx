import React from "react";
import { Factory, Users, Target, Building2 } from "lucide-react";

const IMPACT_ITEMS = [
  {
    title: "Development of Energy & Manufacturing Hubs",
    icon: Factory,
  },
  {
    title: "Training & Reintegration of Skilled Talent",
    icon: Users,
  },
  {
    title: "Execution of Industrial & Innovation Projects",
    icon: Target,
  },
  {
    title: "Expansion of National Capacity Infrastructure",
    icon: Building2,
  }
];

export default function ImpactEnabler() {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32 border-y border-border/50">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] nidc-grid" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Header Area */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Where It Goes
            </div>
            
            <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Your support is deployed into <span className="text-primary">real systems</span> and projects.
            </h2>
          </div>
          
          {/* Grid Area */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {IMPACT_ITEMS.map((item, i) => (
              <div 
                key={i}
                className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-[2rem] border border-border/50 bg-card/60 p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-card hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-7 w-7" />
                </div>
                
                <h3 className="relative z-10 text-xl font-bold leading-tight text-foreground/90 group-hover:text-foreground">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
