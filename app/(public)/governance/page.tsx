import { CTABlock } from "@/components/sections/cta-block";
import GovernanceHero from "./_components/GovernanceHero";
import GovernanceStructure from "./_components/GovernanceStructure";
import FinancialsAndLegal from "./_components/FinancialsAndLegal";
import GovernanceClosing from "./_components/GovernanceClosing";

export const metadata = {
  title: "Governance | NIDC Foundation",
  description: "Learn about our structure, accountability, and long-term sustainability goals.",
};

export default function GovernancePage() {
  return (
    <div className="flex flex-col w-full">
      <GovernanceHero />
      <GovernanceStructure />
      <FinancialsAndLegal />
      <GovernanceClosing />
      
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
