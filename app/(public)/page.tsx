import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, Building2, Cog, Factory, Monitor, ShieldCheck, Target, Users, Zap } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";
import { Button } from "@/components/ui/button";
import HeroSection from "./_components/HeroSection";
import CorePropositionCards from "./_components/CorePropositionSection";
import ProblemSection from "./_components/ProblemSection";
import SolutionSection from "./_components/SolutionSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import Ecosystem from "./_components/Ecosystem";

const systemSteps = [
  {
    label: "Step 1",
    title: "Selection",
    description:
      "We identify a limited number of individuals who demonstrate seriousness, discipline, and willingness to grow.",
    icon: Target,
  },
  {
    label: "Step 2",
    title: "Development",
    description:
      "Participants go through a structured process focused on building real skills, direction, and accountability.",
    icon: BookOpen,
  },
  {
    label: "Step 3",
    title: "Growth & Opportunities",
    description:
      "As individuals develop, they gain access to aligned opportunities, including learning pathways, exposure, and support.",
    icon: Briefcase,
  },
  {
    label: "Step 4",
    title: "Contribution",
    description:
      "Participants apply their capabilities within real systems, supporting projects, others, and a growing network.",
    icon: Building2,
  },
];



const focusAreas = [
  "Industrialization",
  "Digitalization",
  "Energy Reform",
  "Security Systems",
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <CorePropositionCards />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <Ecosystem />

     



      <SectionWrapper
        className="border-b bg-foreground text-background"
        title="Strategic Focus Areas"
        description="The system is oriented toward the sectors where coordinated capability can create long-term national impact."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area) => (
            <div
              key={area}
              className="rounded-[calc(var(--radius)+0.35rem)] border border-background/10 bg-background/5 p-6"
            >
              <div className="mb-4 h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{area}</h3>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-background"
        title="Why It Matters"
        description="Building the people who will build Nigeria."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="nidc-surface p-6 md:p-8">
            <p className="text-base leading-8 text-muted-foreground">
              Long-term development requires more than resources. It requires
              coordinated human capacity.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              This system exists to ensure that individuals are not just
              trained, but positioned where their skills can create real impact.
            </p>
            <p className="mt-4 text-base font-medium leading-8 text-foreground">
              The goal is not just personal success, but meaningful contribution
              at scale.
            </p>
          </div>

          <div className="nidc-surface-muted p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Built for Transparency and Long-Term Impact
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              NIDC is being established as a Company Limited by Guarantee,
              ensuring strong governance, accountability, and sustainability.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The system is designed to operate with clarity, measurable
              outcomes, and long-term institutional integrity.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <CTABlock
        title="Be Part of What We're Building"
        description="If you are serious about developing yourself and contributing to something meaningful, there is a place for you in this system."
        primaryActionLabel="Join the First Cohort"
        primaryActionHref="/apply"
        secondaryActionLabel="Learn How It Works"
        secondaryActionHref="/how-it-works"
      />
    </div>
  );
}
