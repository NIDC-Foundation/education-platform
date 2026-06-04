import { CTABlock } from "@/components/sections/cta-block";
import DonateHero from "./_components/DonateHero";
import WhySupport from "./_components/WhySupport";
import AllocationModel from "./_components/AllocationModel";
import ImpactEnabler from "./_components/ImpactEnabler";
import ContributionWays from "./_components/ContributionWays";
import TransparencyAccountability from "./_components/TransparencyAccountability";

export const metadata = {
  title: "Donate | NIDC Foundation",
  description: "Your support enables the development of talent, infrastructure, and systems required for Nigeria's long-term industrial growth.",
};

export default function DonatePage() {
  return (
    <div className="flex flex-col w-full">
      <DonateHero />
      <WhySupport />
      <AllocationModel />
      <ImpactEnabler />
      <ContributionWays />
      <TransparencyAccountability />
      
      <CTABlock
        title="Be Part of the System"
        description="This is an opportunity to contribute to something larger than individual success. It is about building the systems that enable national progress."
        primaryActionLabel="Support Now"
        primaryActionHref="#ways-to-contribute"
        secondaryActionLabel="Partner With Us"
        secondaryActionHref="mailto:partnerships@nidcfoundation.org"
      />
    </div>
  );
}