"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightLeft, Handshake, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CollaborationSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-6">
            Collaboration & <span className="text-primary">Alignment</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            At the current stage, NIDC operates through a combination of direct collaboration and strategic alignment.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="nidc-surface p-8 flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Supported Pathways</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Participants are supported to pursue development pathways through universities and training institutions that align with the system’s focus areas.
            </p>
          </div>

          {/* Card 2 */}
          <div className="nidc-surface p-8 flex flex-col items-center text-center group hover:border-secondary/50 transition-colors md:-translate-y-4">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ArrowRightLeft className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Flexible Guidance</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              They are not restricted to a fixed set of institutions, but are guided toward pathways that support their growth and contribution.
            </p>
          </div>

          {/* Card 3 */}
          <div className="nidc-surface p-8 flex flex-col items-center text-center group hover:border-accent/50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Handshake className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-4">Future Formalization</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              As the system develops, formal institutional partnerships will be established to strengthen coordination and expand access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
