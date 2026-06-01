import React from "react";

const PROBLEM_ITEMS = [
  {
    label: "Talent",
    title: "Talent is emerging",
    description:
      "Capable individuals continue to surface across the country every year, brimming with potential.",
  },
  {
    label: "Bridge",
    title: "The bridge is missing",
    description:
      "Development, opportunity, and contribution remain disconnected from one another.",
  },
  {
    label: "System",
    title: "National capacity suffers",
    description:
      "Potential remains underdeveloped instead of strengthening real systems at scale.",
  },
];

const ProblemSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32">
      {/* Background Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06] nidc-grid" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div className="mb-6 flex justify-center">
            <span className="nidc-eyebrow">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              The Problem
            </span>
          </div>

          <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Nigeria has talent.
            <br className="hidden md:block" />
            <span className="text-muted-foreground">But no system.</span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            Across the country, capable individuals emerge every year, yet many
            are unable to translate their ability into meaningful contribution.
            Not because they lack potential, but because there is no clear
            structure connecting talent to real-world systems.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {PROBLEM_ITEMS.map((item, index) => (
            <article
              key={item.label}
              className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 dark:bg-card/40 dark:hover:bg-card/80 md:p-10"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col">
                {/* Top header of card */}
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex h-10 items-center justify-center rounded-xl bg-primary/10 px-4 text-sm font-bold text-primary">
                    {item.label}
                  </div>
                  <span className="text-3xl font-bold text-muted-foreground/20 dark:text-muted-foreground/10 transition-colors group-hover:text-primary/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-auto">
                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
