import React from "react";
import { LineChart, Zap, Users } from "lucide-react";

export default function WhySupport() {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32 border-t border-border/50">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col max-w-xl">
            <div className="mb-6 flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Why Support NIDC
              </span>
            </div>

            <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              This Is Not Charity. <br className="hidden md:block" />
              <span className="text-muted-foreground">It Is Capacity Building.</span>
            </h2>

            <p className="mb-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              The NIDC Foundation is not designed as a short-term intervention. It is a structured system focused on developing and deploying high-impact talent into critical sectors such as energy, manufacturing, and digital infrastructure.
            </p>

            <p className="text-lg font-medium leading-relaxed text-foreground md:text-xl">
              Your support contributes directly to building the human and physical systems required for national development.
            </p>
          </div>

          {/* Visual abstract representation */}
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
            {/* Background elements */}
            <div className="absolute inset-0 nidc-surface-muted border-primary/10 rounded-[3rem] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
               <div className="absolute inset-0 opacity-[0.05] nidc-grid" />
            </div>

            {/* Glowing nodes representation */}
            <div className="relative z-10 grid grid-cols-2 gap-4 w-4/5">
               <div className="p-6 rounded-3xl bg-card border border-border/50 shadow-sm flex flex-col items-center justify-center text-center gap-4 transition-transform hover:scale-[1.02]">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">High-Impact Talent</h3>
                    <p className="text-sm text-muted-foreground mt-1">Structured Deployment</p>
                  </div>
               </div>
               
               <div className="p-6 rounded-3xl bg-card border border-border/50 shadow-sm flex flex-col items-center justify-center text-center gap-4 transition-transform hover:scale-[1.02] translate-y-8">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Critical Sectors</h3>
                    <p className="text-sm text-muted-foreground mt-1">Energy & Manufacturing</p>
                  </div>
               </div>
               
               <div className="p-6 rounded-3xl bg-card border border-border/50 shadow-sm flex flex-col items-center justify-center text-center gap-4 transition-transform hover:scale-[1.02] col-span-2 mt-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-foreground">
                    <LineChart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">National Development</h3>
                    <p className="text-sm text-muted-foreground mt-1">Long-term industrial growth</p>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
