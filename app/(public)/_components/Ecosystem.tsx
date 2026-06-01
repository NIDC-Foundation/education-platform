import React from "react";
import Image from "next/image";
import { Zap, Factory, Monitor, Cog } from "lucide-react";

const HUB_AREAS = [
  {
    title: "Energy Systems",
    description: "Focused on the development and deployment of scalable energy solutions.",
    icon: Zap,
    image: "/energy.png",
  },
  {
    title: "Manufacturing & Industrial Systems",
    description: "Environments where ideas translate into physical output through applied engineering and production.",
    icon: Factory,
    image: "/images/hub-manufacturing.webp",
  },
  {
    title: "Digital Infrastructure",
    description: "Systems that enable coordination, data, and technology development across the ecosystem.",
    icon: Monitor,
    image: "/images/hub-digital.webp",
  },
  {
    title: "Advanced Materials",
    description: "Exploratory environments focused on next-generation industrial capabilities.",
    icon: Cog,
    image: "/images/hub-materials.webp",
    isFutureExpansion: true,
  },
];

const Ecosystem = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-24 md:px-8 lg:py-32">
      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] nidc-grid" />
      
      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* Header Section */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-6 flex">
              <span className="nidc-eyebrow">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Applied Development Hubs
              </span>
            </div>
            <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              From Talent to <br className="hidden lg:block" />
              <span className="text-muted-foreground">Real-World Systems.</span>
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-xl">
              NIDC operates as an interconnected system where talent is not only developed, but supported, integrated, and deployed into environments where real work happens.
            </p>
          </div>
          
          <div className="flex flex-col justify-end space-y-4">
             <div className="rounded-[2rem] border border-border/50 bg-card p-6 md:p-8 shadow-sm dark:bg-card/40">
              <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
                We are building structured environments that bridge the gap between learning and real-world contribution.
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                These hubs operate as part of a coordinated system where talent, infrastructure, and real-world challenges intersect—enabling individuals to move beyond theory and engage directly with systems that drive development.
              </p>
            </div>
          </div>
        </div>

        {/* Grid of Hubs */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {HUB_AREAS.map((hub) => {
            const Icon = hub.icon;
            return (
              <div
                key={hub.title}
                className="group relative min-h-[400px] overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30"
              >
                {/* Background Image */}
                <Image
                  src={hub.image}
                  alt={hub.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/10 dark:from-background/95 dark:via-background/70 dark:to-background/20" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/20 text-primary backdrop-blur-md">
                    <Icon className="size-6" strokeWidth={2} />
                  </div>
                  
                  <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                    {hub.title}
                  </h3>
                  
                  <p className="text-[0.95rem] leading-relaxed text-foreground/80 md:text-base dark:text-muted-foreground">
                    {hub.description}
                  </p>

                  {hub.isFutureExpansion && (
                    <div className="mt-6 inline-flex">
                      <span className="rounded-full bg-background/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md border border-border/50">
                        Future Expansion
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
