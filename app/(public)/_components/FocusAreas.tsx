import React from "react";
import { Factory, Cpu, Zap, ShieldCheck, ArrowUpRight } from "lucide-react";

const FOCUS_AREAS = [
  {
    title: "Industrialization",
    icon: Factory,
  },
  {
    title: "Digitalization",
    icon: Cpu,
  },
  {
    title: "Energy Reform",
    icon: Zap,
  },
  {
    title: "Security Systems",
    icon: ShieldCheck,
  },
];

const FocusAreas = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] nidc-grid" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div className="mb-6 flex justify-center">
            <span className="nidc-eyebrow">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Focus Areas
            </span>
          </div>

          <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Strategic Focus Areas
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            The system is oriented toward the sectors where coordinated capability can create long-term national impact.
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {FOCUS_AREAS.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 dark:bg-card/40 dark:hover:bg-card/80 md:p-10"
              >
                {/* Glowing Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Number Watermark */}
                <div className="absolute -right-4 -top-6 text-8xl font-black text-muted-foreground/5 transition-all duration-500 group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:text-primary/10 dark:text-muted-foreground/10 dark:group-hover:text-primary/10">
                  0{index + 1}
                </div>

                <div className="relative z-10 flex h-full flex-col">
                  {/* Icon */}
                  <div className="mb-12 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-7" strokeWidth={2} />
                  </div>

                  {/* Title & Arrow */}
                  <div className="mt-auto flex items-end justify-between gap-4">
                    <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                      {area.title}
                    </h3>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted/80 text-muted-foreground transition-all duration-300 group-hover:bg-primary/20 group-hover:text-primary">
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;