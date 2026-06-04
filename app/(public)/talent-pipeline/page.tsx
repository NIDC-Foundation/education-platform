import { CTABlock } from "@/components/sections/cta-block";
import TalentPipelineHero from "./_components/TalentPipelineHero";
import CoreIdea from "./_components/CoreIdea";
import PipelinePhases from "./_components/PipelinePhases";
import ReceiveAndExpect from "./_components/ReceiveAndExpect";
import CurrentStage from "./_components/CurrentStage";

export const metadata = {
  title: "Talent Pipeline | NIDC Foundation",
  description: "A structured pathway designed to develop individuals and position them for real-world impact.",
};

export default function TalentPipelinePage() {
  return (
    <div className="flex flex-col w-full">
      <TalentPipelineHero />
      <CoreIdea />
      <PipelinePhases />
      <ReceiveAndExpect />
      <CurrentStage />
      
      <CTABlock
        title="Enter the System"
        description="If you are serious about becoming capable and applying that capability where it matters, you can apply to be part of the first cohort."
        primaryActionLabel="Apply to Join"
        primaryActionHref="/apply"
        secondaryActionLabel="Learn How It Works"
        secondaryActionHref="/how-it-works"
      />
    </div>
  );
}