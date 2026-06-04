import React from "react";
import { SectionWrapper } from "@/components/sections/section-wrapper";

const ALLOCATIONS = [
  {
    category: "Programs",
    percentage: "40–50%",
    description: "Talent development, training, and capacity-building initiatives.",
    color: "bg-blue-500",
  },
  {
    category: "Infrastructure",
    percentage: "20–30%",
    description: "Development of hubs, equipment, and project environments.",
    color: "bg-indigo-500",
  },
  {
    category: "Operations",
    percentage: "20–30%",
    description: "Organizational management, systems, and administrative support.",
    color: "bg-purple-500",
  },
  {
    category: "Reserves",
    percentage: "5–10%",
    description: "Stability and long-term sustainability.",
    color: "bg-emerald-500",
  },
];

export default function Allocation() {
  return (
    <SectionWrapper 
      className="bg-muted/30"
      title="Structured Allocation" 
      description="All funds received are allocated through a structured internal framework to ensure balance and effectiveness."
    >
      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
        
        {/* Visual Representation */}
        <div className="relative">
          <div className="flex h-16 w-full overflow-hidden rounded-full border border-border/50 bg-background/50 shadow-inner">
            {ALLOCATIONS.map((alloc, idx) => (
              <div 
                key={idx} 
                className={`h-full ${alloc.color} opacity-80 hover:opacity-100 transition-opacity`}
                style={{ width: alloc.percentage.split("–")[0] + "%" }}
                title={`${alloc.category}: ${alloc.percentage}`}
              />
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {ALLOCATIONS.map((alloc, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`h-4 w-4 rounded-full ${alloc.color}`} />
                <span className="text-sm font-medium text-foreground">{alloc.category}</span>
                <span className="text-sm text-muted-foreground ml-auto">{alloc.percentage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-8">
          {ALLOCATIONS.map((alloc, idx) => (
            <div key={idx} className="flex gap-6">
              <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${alloc.color} bg-opacity-10 text-sm font-bold text-foreground`}>
                {alloc.percentage.split("–")[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2 flex items-baseline gap-3">
                  {alloc.category}
                  <span className="text-sm font-normal text-muted-foreground">{alloc.percentage}</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {alloc.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
