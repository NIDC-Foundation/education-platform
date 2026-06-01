import { BookOpen, BriefcaseBusiness, Building2, Target } from "lucide-react";
import Image from "next/image";

const SolutionSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32">
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="mb-6 flex">
            <span className="nidc-eyebrow">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              The Solution
            </span>
          </div>
          <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            A system for turning <br className="hidden md:block" />
            <span className="text-muted-foreground">potential into capability.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3 md:gap-6">
          
          {/* Box 1 (Hero Intro) - Spans 2x2 */}
          <div className="group relative min-h-[400px] overflow-hidden rounded-[2rem] border border-border/50 bg-card p-0 shadow-sm transition-all duration-300 md:col-span-2 md:row-span-2">
            <Image
              src="/collaboration.png"
              alt="NIDC talents and mentors collaborating"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent dark:from-background/95 dark:via-background/60" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <p className="max-w-xl text-lg font-medium leading-relaxed text-foreground md:text-2xl">
                NIDC is designed as a long-term system for developing and deploying talent into areas that matter. We build a structured pathway that connects growth to real-world contribution.
              </p>
            </div>
          </div>

          {/* Box 2 (Structured growth) */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md dark:bg-card/40 dark:hover:bg-card/80">
            <div className="absolute right-0 top-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20">
            </div>
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="size-6" strokeWidth={2} />
              </div>
              <div className="mt-auto">
                <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">Structured growth</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  Development is intentional, tracked, and tied to clear standards.
                </p>
              </div>
            </div>
          </div>

          {/* Box 3 (Capability first) */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md dark:bg-card/40 dark:hover:bg-card/80">
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="size-6" strokeWidth={2} />
              </div>
              <div className="mt-auto">
                <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">Capability first</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  The focus is on building people who can do real work, not just complete a program.
                </p>
              </div>
            </div>
          </div>

          {/* Box 4 (Aligned opportunities) */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md dark:bg-card/40 dark:hover:bg-card/80">
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BriefcaseBusiness className="size-6" strokeWidth={2} />
              </div>
              <div className="mt-auto">
                <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">Aligned opportunities</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  Growth opens access to learning pathways, exposure, and support that fit the system.
                </p>
              </div>
            </div>
          </div>

          {/* Box 5 (Real-world contribution) - Spans 2 cols */}
          <div className="group relative min-h-[250px] overflow-hidden rounded-[2rem] border border-border/50 bg-card p-0 shadow-sm transition-all duration-300 md:col-span-2">
             <Image
              src="/focused.png"
              alt="Talent actively applying capabilities"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent dark:from-background/95 dark:via-background/70" />
            
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
               <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary backdrop-blur-sm">
                <Building2 className="size-6" strokeWidth={2} />
              </div>
              <div className="max-w-md">
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground">Real-world contribution</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
                  Participants are positioned to apply what they build within functioning systems, generating real impact.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
