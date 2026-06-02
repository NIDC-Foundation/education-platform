import React from "react";
import { ShieldCheck } from "lucide-react";

const Structure = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-16 md:px-8 lg:py-24">
      <div className="relative mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-card/40 md:p-12 lg:p-16">
          {/* Subtle Background Accent */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
          
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            
            {/* Left Column: Title & Icon */}
            <div className="flex flex-col justify-center">
              <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="size-7" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Built for Transparency and Long-Term Impact
              </h2>
            </div>

            {/* Right Column: Text */}
            <div className="flex flex-col justify-center space-y-6 lg:border-l lg:border-border/50 lg:pl-12">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
                NIDC is being established as a Company Limited by Guarantee, ensuring strong governance, accountability, and sustainability.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
                The system is designed to operate with clarity, clear processes, accountability and long-term stability.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Structure;