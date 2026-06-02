import React from "react";

const WhyItMatters = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-32 md:px-8 lg:py-40">
      {/* Cinematic Glowing Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] nidc-grid" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[80%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Header Tag */}
        <div className="mb-10 flex justify-center">
          <span className="nidc-eyebrow">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Why It Matters
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-12 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-7xl">
          Building the People Who Will Build Nigeria
        </h2>

        {/* Manifesto Text */}
        <div className="mx-auto max-w-3xl space-y-8 text-lg font-medium leading-relaxed text-muted-foreground md:text-2xl md:leading-relaxed lg:text-3xl lg:leading-tight">
          <p>
            Long-term development requires more than resources — it requires coordinated human capacity.
          </p>
          <p>
            This system exists to ensure that individuals are not just trained, but positioned where their skills can create real impact.
          </p>
          <p className="text-foreground">
            The goal is not just personal success, but meaningful contribution at scale.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;