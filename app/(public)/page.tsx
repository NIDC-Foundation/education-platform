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
import FocusAreas from "./_components/FocusAreas";
import WhyItMatters from "./_components/WhyItMatters";
import Structure from "./_components/Structure";

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





export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <CorePropositionCards />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <Ecosystem />
      <FocusAreas />
      <WhyItMatters />
      <Structure />
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
