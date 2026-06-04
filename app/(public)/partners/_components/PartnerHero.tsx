"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PartnerHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const glow1 = useRef<HTMLDivElement | null>(null);
  const glow2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, { y: 60, opacity: 0, duration: 1 })
        .from(
          subtitleRef.current?.children || [],
          { y: 30, opacity: 0, stagger: 0.15, duration: 0.8 },
          "-=0.6"
        );

      gsap.to(glow1.current, {
        x: 50,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(glow2.current, {
        x: -40,
        y: 40,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 nidc-hero-backdrop flex flex-col items-center text-center"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          ref={glow1}
          className="absolute top-10 left-10 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 blur-[100px] rounded-full"
        />
        <div
          ref={glow2}
          className="absolute bottom-10 right-10 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-secondary/20 blur-[100px] rounded-full"
        />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Editorial label */}
        <p className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-3 justify-center mb-6">
          <ShieldCheck className="w-4 h-4" />
          Partnership
        </p>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-8"
        >
          Build Capacity. <br />
          <span className="text-muted-foreground font-medium">Not Just Programs.</span>
        </h1>

        <div
          ref={subtitleRef}
          className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed space-y-4"
        >
          <p>
            NIDC is designed as a structured system built to develop and deploy talent into areas that drive real-world impact.
          </p>
          <p>
            This system does not operate in isolation. It grows through collaboration with institutions and organizations that understand the importance of building long-term capacity.
          </p>
        </div>
      </div>
    </section>
  );
}
