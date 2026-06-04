"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WhyPartnerSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(listRef.current?.children || [], {
        x: -40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    "Access to a structured and developing talent pipeline",
    "Alignment with long-term capacity building efforts",
    "Opportunity to contribute to measurable and sustained impact",
    "Participation in a system designed for growth and continuity"
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-secondary/5 -z-10" />
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary mb-6">
            Benefits
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-6">
            Why <span className="text-secondary">Partner</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8">
            Join a system that goes beyond isolated programs to create lasting capacity and sustainable growth.
          </p>
        </div>

        <div className="lg:w-1/2 w-full">
          <ul ref={listRef} className="space-y-4">
            {benefits.map((benefit, index) => (
              <li 
                key={index} 
                className="nidc-surface p-6 flex items-start gap-4 hover:border-secondary/30 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                <span className="text-base md:text-lg font-medium text-foreground">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
