import React from "react";
import { PieChart, Scale } from "lucide-react";

export default function FinancialsAndLegal() {
  return (
    <section className="relative w-full bg-background px-4 py-24 md:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Use of Funds Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-muted/20 p-8 md:p-12 transition-all hover:bg-muted/40">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-primary/10 blur-[80px] transition-all group-hover:bg-primary/20" />
            
            <div className="relative z-10">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <PieChart className="h-8 w-8" />
              </div>
              
              <h3 className="mb-4 text-3xl font-bold text-foreground">
                Use of Funds
              </h3>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                Capital is rigorously managed. All funding is specifically allocated toward <span className="font-semibold text-foreground">program development</span>, <span className="font-semibold text-foreground">participant support</span>, and <span className="font-semibold text-foreground">core operations</span>.
              </p>
            </div>
          </div>

          {/* Legal Structure Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-muted/20 p-8 md:p-12 transition-all hover:bg-muted/40">
             <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-primary/10 blur-[80px] transition-all group-hover:bg-primary/20" />
            
            <div className="relative z-10">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Scale className="h-8 w-8" />
              </div>
              
              <h3 className="mb-4 text-3xl font-bold text-foreground">
                Legal Structure
              </h3>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                We are structured as a <span className="font-semibold text-foreground">non-profit entity</span>. This framework was deliberately chosen to ensure maximal accountability, transparency, and long-term continuity.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
