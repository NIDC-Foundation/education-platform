import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplyCTA() {
  return (
    <section className="py-24 bg-background relative isolate">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="nidc-grid absolute inset-0 opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl" id="application-form">
        
        {/* Form Assessment Info Box */}
        <div className="nidc-surface border-border bg-card p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <div className="w-40 h-40 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight">The Application</h3>
              <p className="text-muted-foreground text-lg italic">
                "This is not a test."
              </p>
              <p className="text-muted-foreground">
                Take your time. Be clear. It is an assessment of:
              </p>
              <ul className="space-y-3 mt-4 text-foreground/90 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> How you think
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> How you approach growth
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Whether you are aligned with this system
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="bg-muted/50 rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-3 text-primary font-semibold">
                  <Info className="w-5 h-5" />
                  Important Note
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Supporting documents (such as academic records or certificates) are <strong className="text-foreground">not required</strong> at this stage.
                </p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed border-t border-border/50 pt-3">
                  They will only be requested from shortlisted applicants during the review process.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            If this aligns with how you think — <span className="text-primary italic">apply.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/application" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 rounded-full text-base font-semibold shadow-[0_10px_30px_rgba(22,46,32,0.2)] transition-transform hover:-translate-y-1">
                Apply Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Link href="/how-it-works" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full text-base font-semibold border-border hover:bg-muted/50 hover:border-primary/30 transition-colors">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
