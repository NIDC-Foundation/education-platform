import React from "react";

export default function SupportHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Background glow effects */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[500px] bg-primary/20 opacity-50 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          Funding Model
        </div>

        <h1 className="mx-auto max-w-4xl text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl mb-8">
          How the System is{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
            Funded
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          The NIDC Foundation operates as a structured system for receiving, allocating, and deploying capital into national development.
          <br className="hidden md:block" />
          <br className="hidden md:block" />
          Our funding model is designed to ensure transparency, sustainability, and long-term impact.
        </p>
      </div>
    </section>
  );
}
