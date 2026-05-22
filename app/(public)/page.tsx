import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, Building2, Cog, Factory, Monitor, ShieldCheck, Target, Users, Zap } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";
import { Button } from "@/components/ui/button";
import HeroSection from "./_components/HeroSection";
import CorePropositionCards from "./_components/CorePropositionSection";
import ProblemSection from "./_components/ProblemSection";
import SolutionSection from "./_components/SolutionSection";

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

const hubAreas = [
  {
    title: "Energy Systems",
    description:
      "Focused on the development and deployment of scalable energy solutions.",
    icon: Zap,
  },
  {
    title: "Manufacturing & Industrial Systems",
    description:
      "Environments where ideas translate into physical output through applied engineering and production.",
    icon: Factory,
  },
  {
    title: "Digital Infrastructure",
    description:
      "Systems that enable coordination, data, and technology development across the ecosystem.",
    icon: Monitor,
  },
  {
    title: "Advanced Materials",
    description:
      "Exploratory environments focused on next-generation industrial capabilities.",
    icon: Cog,
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
      <SolutionSection/>

      <SectionWrapper
        className="border-b bg-background"
        title="How the System Works"
        description="This is a system designed to connect individual growth to real-world impact."
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {systemSteps.map((step) => (
            <div key={step.title} className="nidc-surface p-6">
              <div className="flex items-start justify-between gap-4">
                <step.icon className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  {step.label}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-muted/30"
        title="From Talent to Real-World Systems"
        description="NIDC operates as an interconnected system where talent is not only developed, but supported, integrated, and deployed into environments where real work happens."
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="nidc-surface p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                Applied Development Hubs
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                We are building structured environments that bridge the gap
                between learning and real-world contribution.
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Each hub enables individuals to move beyond theory and engage
                directly with systems that drive development.
              </p>
            </div>
            <div className="nidc-surface-muted p-6">
              <p className="text-sm leading-7 text-foreground/85">
                These hubs operate as part of a coordinated system where talent,
                infrastructure, and real-world challenges intersect.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {hubAreas.map((hub) => (
              <div key={hub.title} className="nidc-surface p-5">
                <hub.icon className="h-5 w-5 text-primary mb-4" />
                <h3 className="text-base font-semibold">{hub.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {hub.description}
                </p>
                {hub.title === "Advanced Materials" ? (
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    Future Expansion
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

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
