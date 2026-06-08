import ApplyHero from "./_components/ApplyHero";
import TargetAudience from "./_components/TargetAudience";
import HowEntryWorks from "./_components/HowEntryWorks";
import Expectations from "./_components/Expectations";
import ApplyCTA from "./_components/ApplyCTA";

export const metadata = {
  title: "Apply | NIDC Foundation",
  description: "Apply to enter a system designed to develop and deploy individuals toward real-world contribution.",
};

export default function ApplyPage() {
  return (
    <div className="flex flex-col w-full">
      <ApplyHero />
      <TargetAudience />
      <HowEntryWorks />
      <Expectations />
      <ApplyCTA />
    </div>
  );
}