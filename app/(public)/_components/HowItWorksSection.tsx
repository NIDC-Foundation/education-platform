import React from "react";
import { UserCheck, Wrench, Layers, Network } from "lucide-react";

const STEPS = [
  {
    id: "01",
    label: "Selection",
    title: "Selection",
    icon: UserCheck,
    description:
      "We identify a limited number of individuals who demonstrate seriousness, discipline, and willingness to grow.",
  },
  {
    id: "02",
    label: "Development",
    title: "Development",
    icon: Wrench,
    description:
      "Participants go through a structured process focused on building real skills, direction, and accountability.",
  },
  {
    id: "03",
    label: "Parallel Development",
    title: "Parallel Development",
    icon: Layers,
    description:
      "While individuals are developing, the broader system – including hubs and projects is built progressively. Development is aligned with real-world environments, not separated from them. Participants are not disconnected from this process, their development is aligned with it.",
  },
  {
    id: "04",
    label: "Contribution",
    title: "Contribution",
    icon: Network,
    description:
      "Participants apply their capabilities within real systems — contributing to projects, supporting others, and becoming part of a growing network.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32">
      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] nidc-grid" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div className="mb-6 flex justify-center">
            <span className="nidc-eyebrow">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              How It Works
            </span>
          </div>

          <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            How the System Works
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            This is a system designed to connect individual growth to real-world impact.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md dark:bg-card/40 dark:hover:bg-card/80 md:p-10"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-6" strokeWidth={2} />
                    </div>
                    <span className="text-3xl font-bold text-muted-foreground/20 transition-colors group-hover:text-primary/20 dark:text-muted-foreground/10">
                      {step.id}
                    </span>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>

                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
