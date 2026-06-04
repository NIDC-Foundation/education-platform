import React from "react";
import { Anchor } from "lucide-react";

export default function GovernanceClosing() {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-[0_0_40px_var(--primary)]">
          <Anchor className="h-10 w-10" />
        </div>
        
        <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-8">
          Built for long-term sustainability, not short-term activity.
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Our systems are designed to outlast us. We optimize for enduring impact over immediate metrics, ensuring that every step taken strengthens the foundation for the future.
        </p>
      </div>
    </section>
  );
}
