import { CTABlock } from "@/components/sections/cta-block";
import AboutHero from "./_components/AboutHero";
import TheProblem from "./_components/TheProblem";
import WhatThisIs from "./_components/WhatThisIs";
import HowItThinks from "./_components/HowItThinks";
import TheDifference from "./_components/TheDifference";
import LongTermVision from "./_components/LongTermVision";

export const metadata = {
  title: "About | NIDC Foundation",
  description: "Learn about why NIDC exists and our structural approach to developing individuals for real-world impact.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <AboutHero />
      <TheProblem />
      <WhatThisIs />
      <HowItThinks />
      <TheDifference />
      <LongTermVision />
      
      <CTABlock
        title="Ready to Build with Us?"
        description="Join a structured system designed to help you grow, connect, and make real contributions."
        primaryActionLabel="Apply Now"
        primaryActionHref="/apply"
        secondaryActionLabel="Learn How It Works"
        secondaryActionHref="/how-it-works"
      />
    </div>
  );
}
