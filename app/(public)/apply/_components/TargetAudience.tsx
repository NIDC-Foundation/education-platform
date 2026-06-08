import { CheckCircle2, XCircle } from "lucide-react";

const idealCandidates = [
  "Take responsibility for their growth",
  "Are willing to commit long-term",
  "Want to build real capability not just gain access",
  "Are ready to contribute, not just participate"
];

const nonIdealCandidates = [
  "Are looking for quick opportunities",
  "Want passive support without effort",
  "Are not ready for structured development"
];

export default function TargetAudience() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <div className="nidc-eyebrow mb-4">Alignment</div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Who This Is For
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We are looking for a specific mindset. This system requires deep commitment and a structured approach to growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Who This Is For Card */}
          <div className="nidc-surface bg-background border-primary/20 p-8 sm:p-10 relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="w-32 h-32 bg-primary rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                This is for individuals who:
              </h3>
              
              <ul className="space-y-5">
                {idealCandidates.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-foreground/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Who This Is NOT For Card */}
          <div className="nidc-surface bg-background border-destructive/20 p-8 sm:p-10 relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="w-32 h-32 bg-destructive rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <XCircle className="h-6 w-6 text-destructive" />
                This is NOT for individuals who:
              </h3>
              
              <ul className="space-y-5">
                {nonIdealCandidates.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                      <XCircle className="h-3 w-3 text-destructive" />
                    </span>
                    <span className="text-foreground/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
