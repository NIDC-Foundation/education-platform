"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, AppWindow, Network, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      
      if (items) {
        gsap.from(items, {
          x: -50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "Talent Development",
      description: "Supporting education, training, and skill development",
      icon: GraduationCap,
    },
    {
      title: "Real-world application",
      description: "Providing environments where talent can apply what they learn",
      icon: AppWindow,
    },
    {
      title: "Sector alignment",
      description: "Ensuring that development matches real sector needs",
      icon: Network,
    },
    {
      title: "Long-term support",
      description: "Enabling scale through funding and strategic support",
      icon: TrendingUp,
    }
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 nidc-grid opacity-30 -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-4">
            How Partnership Works
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Partnership within NIDC is structured around contribution to different parts of the system.
          </p>
        </div>

        <div ref={timelineRef} className="relative border-l border-primary/20 ml-6 md:ml-12 space-y-12 pb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="timeline-item relative pl-8 md:pl-12">
                {/* Connector Dot */}
                <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10" />
                
                <div className="nidc-surface p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
