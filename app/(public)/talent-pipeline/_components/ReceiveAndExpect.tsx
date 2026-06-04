import React from "react";
import { Gift, ShieldCheck } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";

export default function ReceiveAndExpect() {
  return (
    <SectionWrapper className="bg-muted/30">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        
        {/* What You Receive */}
        <div className="nidc-surface-muted p-8 sm:p-10 transition-transform duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">What You Receive</h2>
          </div>
          <ul className="space-y-5">
            {[
              "Clear development direction",
              "Structured pathway for growth",
              "Access to aligned opportunities",
              "Integration into a growing system"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What Is Expected */}
        <div className="nidc-surface p-8 sm:p-10 transition-transform duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-foreground" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">What Is Expected</h2>
          </div>
          <ul className="space-y-5">
            {[
              "Consistency in effort",
              "Personal accountability",
              "Willingness to grow over time",
              "Commitment to contribution, not just participation"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/50 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </SectionWrapper>
  );
}
