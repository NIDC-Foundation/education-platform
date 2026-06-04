import React from "react";
import { Compass, DoorOpen, ShieldAlert } from "lucide-react";

const PROBLEM_ITEMS = [
  {
    label: "Lack of Direction",
    title: "Direction",
    description: "Without a clear path, potential wanders. Many capable individuals lack guidance on where to channel their abilities effectively.",
    icon: Compass,
  },
  {
    label: "Lack of Access",
    title: "Access",
    description: "Opportunities are unevenly distributed. Essential resources and platforms for real-world application remain out of reach for most.",
    icon: DoorOpen,
  },
  {
    label: "Lack of Support",
    title: "Consistent Support",
    description: "Growth requires compounding effort. The absence of long-term mentorship and structural backing leads to stagnation.",
    icon: ShieldAlert,
  },
];

export default function TheProblem() {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06] nidc-grid" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              The Problem
            </span>
          </div>

          <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Many individuals have potential <br className="hidden md:block" />
            <span className="text-muted-foreground">but lack the structure to realize it.</span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            As a result, growth is unstructured, and capability is never fully developed.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {PROBLEM_ITEMS.map((item, index) => (
            <article
              key={item.label}
              className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-destructive/20 dark:bg-card/40 dark:hover:bg-card/80 md:p-10"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-bold text-muted-foreground/20 dark:text-muted-foreground/10 transition-colors group-hover:text-destructive/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

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
}
