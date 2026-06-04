import React from "react";
import { Leaf, RefreshCw } from "lucide-react";

export default function Sustainability() {
  return (
    <section className="py-24 md:py-32 bg-muted/50 border-y border-border/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-500">
              <Leaf className="w-4 h-4" />
              Sustainability Model
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Designed for Continuity
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Unlike traditional models, the NIDC system is designed for continuity. Projects within our hubs are structured to generate value and, where applicable, revenue that is reintegrated into the system.
            </p>
            
            <p className="text-lg font-medium text-foreground">
              This enables long-term operation beyond donations alone.
            </p>
          </div>

          <div className="w-full max-w-md shrink-0 relative aspect-square">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-[40px] rotate-3 border border-emerald-500/10" />
            <div className="absolute inset-0 bg-background rounded-[40px] -rotate-3 border border-border shadow-xl flex items-center justify-center p-12">
              <div className="relative w-full h-full">
                <RefreshCw className="w-full h-full text-emerald-500/20 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-emerald-500 font-bold text-xl tracking-widest uppercase">Value Flow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
