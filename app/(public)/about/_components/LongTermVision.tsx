import React from "react";
import { Globe2 } from "lucide-react";

export default function LongTermVision() {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-40">
      {/* Background glowing effects */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-10 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_40px_var(--primary)] shadow-primary/20">
            <Globe2 className="h-10 w-10 text-primary" />
          </div>
        </div>

        <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Long-Term Vision
        </h2>

        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl md:leading-relaxed">
          To build a system where individuals are <span className="text-foreground font-medium">continuously developed</span>, <span className="text-foreground font-medium">connected</span>, and <span className="text-foreground font-medium">positioned to contribute</span> over time.
        </p>
      </div>
    </section>
  );
}
