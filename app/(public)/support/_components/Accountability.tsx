import React from "react";
import { ShieldCheck } from "lucide-react";

export default function Accountability() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="h-10 w-10" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-8">
          Accountability
        </h2>
        
        <p className="text-xl text-muted-foreground leading-relaxed mb-16">
          The Foundation is committed to responsible financial management and transparency. We maintain structured records of all financial activities and operate under a governance framework that ensures funds are used solely to advance our mission.
        </p>

        <div className="relative py-12 border-t border-b border-primary/20 bg-primary/5">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-primary/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full" />
          </div>
          
          <h3 className="text-2xl md:text-4xl font-bold text-foreground">
            This is not a funding cycle.
          </h3>
          <p className="text-xl md:text-2xl mt-4 text-primary font-medium">
            It is a system designed to build and sustain national capacity.
          </p>
          
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-background border border-primary/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
