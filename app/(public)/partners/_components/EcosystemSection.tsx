"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Briefcase, Factory, Banknote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function EcosystemSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current?.children || [], {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const partners = [
    {
      title: "Universities and Training Institutions",
      description: "Supporting development pathways aligned with system priorities",
      icon: Building2,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50"
    },
    {
      title: "Private Sector Organizations",
      description: "Providing exposure, experience, and real-world application environments",
      icon: Briefcase,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "hover:border-primary/50"
    },
    {
      title: "Industry and Sector Bodies",
      description: "Ensuring alignment with real needs across critical sectors",
      icon: Factory,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "hover:border-orange-500/50"
    },
    {
      title: "Funding and Capital Partners",
      description: "Supporting the development and sustainability of the system",
      icon: Banknote,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "hover:border-green-500/50"
    }
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-end mb-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-4">
              Ecosystem Partners & <br className="hidden md:block" /> Alignment
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              We engage with organizations across different layers of the system.
            </p>
          </div>
          <div className="hidden md:block w-32 h-px bg-border" />
        </div>

        <div ref={itemsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className={`nidc-surface-muted p-6 md:p-8 flex flex-col group transition-all duration-300 ${partner.border}`}
              >
                <div className={`w-12 h-12 rounded-xl ${partner.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${partner.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-3 leading-tight">{partner.title}</h3>
                <p className="text-sm text-muted-foreground mt-auto">
                  {partner.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
