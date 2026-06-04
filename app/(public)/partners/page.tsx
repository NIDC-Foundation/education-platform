import { Metadata } from "next";
import PartnerHero from "./_components/PartnerHero";
import CollaborationSection from "./_components/CollaborationSection";
import EcosystemSection from "./_components/EcosystemSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import WhyPartnerSection from "./_components/WhyPartnerSection";
import PartnerCTA from "./_components/PartnerCTA";

export const metadata: Metadata = {
  title: "Partnership | NIDC",
  description: "Join NIDC to build long-term capacity. We grow through collaboration with institutions and organizations that understand the importance of building a structured system.",
};

export default function PartnershipPage() {
  return (
    <main className="min-h-screen bg-background">
      <PartnerHero />
      <CollaborationSection />
      <EcosystemSection />
      <HowItWorksSection />
      <WhyPartnerSection />
      <PartnerCTA />
    </main>
  );
}