import React from "react";
import { Activity } from "lucide-react";

export default function CurrentStage() {
  return (
    <section className="py-24 sm:py-32 bg-background border-y border-border/50">
      <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 mb-2">
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          Current Stage
        </h2>
        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          <p>
            The system is currently in its early phase. Initial structures are being established while the first cohort is being identified.
          </p>
          <p className="font-medium text-foreground">
            Growth will be gradual, intentional, and structured.
          </p>
        </div>
      </div>
    </section>
  );
}
