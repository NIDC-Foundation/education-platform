import React from "react";
import { CheckCircle2, Compass, Cpu, Zap } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";

const phases = [
  {
    phase: "Phase 1",
    title: "Selection",
    description: "A limited number of individuals are identified based on seriousness, discipline, long-term intent, and willingness to take responsibility for their growth. This is structured entry, not mass participation.",
    icon: CheckCircle2,
  },
  {
    phase: "Phase 2",
    title: "Development",
    description: "Participants enter a guided development pathway featuring structured learning direction, skill-building aligned with real sectors, and continuous progress tracking—locally and internationally.",
    icon: Compass,
  },
  {
    phase: "Phase 3",
    title: "Parallel Growth",
    description: "While individuals are developing, system-level work continues. Early-stage hubs and projects evolve, and real-world environments begin taking shape. Development is directly aligned with this.",
    icon: Cpu,
  },
  {
    phase: "Phase 4",
    title: "Integration & Contribution",
    description: "As individuals grow, they are integrated into active systems. They contribute to ongoing projects and take on increasing responsibility. They are not starting something new; they are strengthening what exists.",
    icon: Zap,
  },
];

export default function PipelinePhases() {
  return (
    <SectionWrapper 
      title="How The Pipeline Works"
      description="A four-stage progression from initial selection to active integration within our ongoing projects and systems."
    >
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting line for desktop */}
        <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-px bg-border -z-10" />

        {phases.map((phase, index) => {
          const Icon = phase.icon;
          return (
            <div key={phase.phase} className="relative flex flex-col group">
              <div className="mb-6 flex justify-center lg:justify-start">
                <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center shadow-sm group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                  <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>
              <div className="space-y-3 text-center lg:text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {phase.phase}
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {phase.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {phase.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
