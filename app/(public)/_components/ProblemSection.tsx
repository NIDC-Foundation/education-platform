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
    <section className="relative w-full overflow-hidden bg-background px-4 py-20 md:px-8 lg:py-28">

      <div className="relative mx-auto max-w-325">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase text-secondary">
              The Problem
            </span>
          </div>

          <h2 className="mb-5 text-balance text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl lg:text-6xl">
            Nigeria has talent.
            <span className="block text-card">But no system.</span>
          </h2>

          <p className="mx-auto max-w-2xl text-[0.98rem] leading-8 text-gray-500 md:text-lg">
            Across the country, capable individuals emerge every year, yet many
            are unable to translate their ability into meaningful contribution.
            Not because they lack potential, but because there is no clear
            structure connecting talent to real-world systems.
          </p>
        </div>

        {/* Main card shell */}
        <div className="overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:rounded-[2.75rem]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {PROBLEM_ITEMS.map((item, index) => (
              <article
                key={item.label}
                className="group relative min-h-[320px] overflow-hidden border-b border-gray-100 bg-[#fbfbfb] p-8 transition-all duration-500 hover:bg-white md:border-b-0 md:border-r md:p-10 lg:p-12 last:md:border-r-0"
              >
                {/* Hover glow */}
                <div className="absolute inset-x-8 top-8 h-28 rounded-full bg-[#ccff66]/0 blur-3xl transition-all duration-500 group-hover:bg-[#ccff66]/20" />

                {/* Top row */}
                <div className="relative mb-12 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-gray-400">
                    {item.number}
                  </span>
                </div>

                {/* Label block */}
                <div className="relative mb-8">
                  <div className="inline-flex min-w-37.5 items-center justify-center rounded-2xl bg-accent px-4 py-4 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-primary group-hover:shadow-[0_14px_35px_rgba(204,255,102,0.35)]">
                    <span className="text-xl font-bold tracking-tight text-secondary">
                      {item.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="mb-3 max-w-[260px] text-xl font-semibold tracking-tight text-secondary-foreground">
                    {item.title}
                  </h3>

                  <p className="max-w-[310px] text-[0.95rem] leading-7 text-gray-500">
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
