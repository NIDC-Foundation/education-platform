import React from "react";

const ALLOCATION_DATA = [
  {
    category: "Programs",
    percentage: "40–50%",
    description: "Talent development, training, and capacity-building initiatives.",
    colorClass: "bg-primary text-primary-foreground",
    barWidth: "w-[45%]", // Visual approximation
  },
  {
    category: "Infrastructure",
    percentage: "20–30%",
    description: "Development of hubs, equipment, and project environments.",
    colorClass: "bg-secondary text-secondary-foreground",
    barWidth: "w-[25%]",
  },
  {
    category: "Operations",
    percentage: "20–30%",
    description: "Organizational systems and administrative support.",
    colorClass: "bg-muted-foreground/30 text-foreground",
    barWidth: "w-[25%]",
  },
  {
    category: "Reserves",
    percentage: "5–10%",
    description: "Stability and long-term continuity.",
    colorClass: "bg-accent text-accent-foreground",
    barWidth: "w-[8%]",
  }
];

export default function AllocationModel() {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32">
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Allocation
            </span>
          </div>
          
          <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            A Structured <br className="hidden md:block" />
            <span className="text-muted-foreground">Allocation Model</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
            All contributions are allocated through a defined internal framework to ensure impact, efficiency and sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ALLOCATION_DATA.map((item, index) => (
            <article 
              key={item.category}
              className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30"
            >
              <div className="flex flex-col h-full justify-between gap-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">{item.category}</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-sm">{item.description}</p>
                  </div>
                  <span className="text-3xl font-bold tracking-tighter text-foreground/80 group-hover:text-primary transition-colors">
                    {item.percentage}
                  </span>
                </div>
                
                {/* Visual Bar representation */}
                <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.colorClass} ${item.barWidth} transition-all duration-1000 ease-out`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
