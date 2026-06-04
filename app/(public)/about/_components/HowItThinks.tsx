import React from "react";
import { ArrowRight, Brain, Lightbulb, Target } from "lucide-react";

const STEPS = [
  {
    title: "Learn Effectively",
    description: "Absorbing knowledge with intention and focus.",
    icon: Brain,
  },
  {
    title: "Apply Knowledge",
    description: "Bridging the gap between theory and execution.",
    icon: Lightbulb,
  },
  {
    title: "Contribute",
    description: "Creating tangible value in real systems.",
    icon: Target,
  },
];

export default function HowItThinks() {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32">
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              How It Thinks
            </span>
          </div>

          <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            The focus is not just education. <br className="hidden md:block" />
            <span className="text-primary">The focus is Outcome.</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
            Developing individuals who can take knowledge and translate it into real-world impact.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connecting line for desktop */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-border hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {STEPS.map((step, index) => (
              <div key={step.title} className="relative flex flex-col items-center text-center group">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-background bg-card shadow-xl transition-transform group-hover:scale-110 group-hover:border-primary/20">
                  <step.icon className="h-8 w-8 text-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm max-w-[250px]">
                  {step.description}
                </p>

                {index < STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-6 top-10 -translate-y-1/2 text-muted-foreground/30 hidden md:block h-6 w-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
