import { FileText, Search, Target, Combine } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Application",
    icon: FileText,
    content: (
      <>
        <p className="mb-3">You submit your details, background, and intent.</p>
        <p className="mb-3 text-foreground/80">This is not about perfect qualifications.</p>
        <p className="font-medium text-foreground">It is about clarity, seriousness, and direction.</p>
      </>
    )
  },
  {
    number: "02",
    title: "Review",
    icon: Search,
    content: (
      <>
        <p className="mb-3">Applications are reviewed based on:</p>
        <ul className="space-y-2 text-foreground/80 list-disc pl-4 marker:text-primary">
          <li>Alignment with the system</li>
          <li>Evidence of discipline and consistency</li>
          <li>Long-term intent</li>
        </ul>
      </>
    )
  },
  {
    number: "03",
    title: "Selection",
    icon: Target,
    content: (
      <>
        <p className="mb-3">A limited number of individuals are selected into the initial cohort.</p>
        <p className="font-medium text-primary mt-4">This is not mass entry.</p>
      </>
    )
  },
  {
    number: "04",
    title: "Integration",
    icon: Combine,
    content: (
      <>
        <p className="mb-3">Selected individuals are:</p>
        <ul className="space-y-2 text-foreground/80 list-disc pl-4 marker:text-primary">
          <li>Placed within a structured development pathway</li>
          <li>Aligned with real system activity</li>
          <li>Integrated progressively as they grow</li>
        </ul>
      </>
    )
  }
];

export default function HowEntryWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <div className="nidc-eyebrow mb-4">Process</div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How Entry Works
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A structured, multi-step process to ensure alignment and intent.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[5.5rem] left-[10%] right-[10%] h-px bg-border/60 -z-10" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                
                {/* Number & Icon Header */}
                <div className="mb-8 flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="relative w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(22,46,32,0.1)] transition-all bg-background shadow-sm">
                    <step.icon className="h-6 w-6 text-primary" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                </div>

                {/* Content Card */}
                <div className="nidc-surface-muted p-6 h-[calc(100%-8rem)] text-sm leading-relaxed border-transparent hover:border-border transition-colors">
                  {step.content}
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
