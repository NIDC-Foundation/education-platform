import React from "react";
import { ArrowRight, Layers, Target } from "lucide-react";

export default function CoreIdea() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="nidc-surface p-8 sm:p-12 lg:p-16 relative overflow-hidden group">
          {/* subtle background effect inside the card */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6 z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <span className="inline-block w-4 h-px bg-primary" />
                Core Idea
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground text-balance">
                Development Is Not Separate From Contribution.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Growth within NIDC is aligned with real work. While individuals are developing locally or internationally, system-level execution continues.
                </p>
                <p>
                  As capability increases, individuals are integrated into environments where their skills are applied, tested, and expanded. Participants are not prepared in isolation—they engage with systems that are actively being built.
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/3 flex justify-center z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <div className="relative flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center shadow-lg animate-bounce duration-[3000ms]">
                    <Layers className="w-6 h-6 text-foreground" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_30px_var(--primary)] text-primary">
                    <Target className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
