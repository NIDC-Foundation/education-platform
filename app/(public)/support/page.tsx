import { CTABlock } from "@/components/sections/cta-block";
import SupportHero from "./_components/SupportHero";
import FundingSources from "./_components/FundingSources";
import Allocation from "./_components/Allocation";
import Deployment from "./_components/Deployment";
import Sustainability from "./_components/Sustainability";
import Accountability from "./_components/Accountability";

export const metadata = {
  title: "Funding Model | NIDC Foundation",
  description: "Learn about how the NIDC Foundation is funded and our structured approach to ensuring sustainability and impact.",
};

export default function SupportPage() {
  return (
    <div className="flex flex-col w-full">
      <SupportHero />
      <FundingSources />
      <Allocation />
      <Deployment />
      <Sustainability />
      <Accountability />
      
      <CTABlock
        title="Contribute to the System"
        description="Support the development of talent, infrastructure, and real-world projects that build long-term capacity."
        primaryActionLabel="Support Us"
        primaryActionHref="/donate"
        secondaryActionLabel="Partner With Us"
        secondaryActionHref="/partnerships"
      />
    </div>
  );
}