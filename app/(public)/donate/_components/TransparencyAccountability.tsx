import React from "react";
import { ShieldCheck } from "lucide-react";

export default function TransparencyAccountability() {
  return (
    <section className="relative w-full overflow-hidden bg-foreground text-background px-4 py-24 md:px-8 lg:py-32">
      {/* Dark background grid for contrast */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-background/10 text-background backdrop-blur-md border border-background/20">
          <ShieldCheck className="h-10 w-10" />
        </div>
        
        <h2 className="mb-8 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Built for <span className="text-primary-foreground/80">Trust</span>
        </h2>
        
        <div className="space-y-6 text-lg md:text-xl text-background/80 leading-relaxed font-medium">
          <p>
            The NIDC Foundation operates under a structured governance framework and is registered as a Company Limited by Guarantee.
          </p>
          <p>
            All funds are used solely to advance the objectives of the Foundation.
          </p>
          <p>
            Financial activities are recorded and managed in alignment with institutional standards.
          </p>
        </div>
      </div>
    </section>
  );
}
