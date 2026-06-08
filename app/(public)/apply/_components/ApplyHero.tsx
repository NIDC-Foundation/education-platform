import { AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ApplyHero() {
  return (
    <section className="relative isolate overflow-hidden bg-background pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
        <div className="nidc-grid absolute inset-0 opacity-[0.04]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-8 items-center">
          
          {/* Main Content */}
          <div className="max-w-3xl">
            <div className="nidc-eyebrow mb-6">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_var(--primary)] animate-pulse" />
              Selective Entry
            </div>

            <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6">
              Enter the <span className="text-primary">System</span>
            </h1>

            <div className="space-y-6 text-lg leading-8 text-muted-foreground max-w-2xl">
              <p>
                <strong className="text-foreground font-semibold">This is not an open-access program.</strong> It is a structured entry point into a system designed to develop and deploy individuals toward real-world contribution.
              </p>
              <p className="border-l-2 border-primary/40 pl-4 text-base italic text-foreground/80">
                Application is selective. Participation is intentional.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#application-form"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_rgba(22,46,32,0.3)] transition-all hover:-translate-y-1 hover:bg-primary/90 hover:shadow-[0_15px_50px_rgba(22,46,32,0.4)]"
              >
                Apply Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Callout Card / Visual */}
          <div className="relative w-full max-w-lg mx-auto lg:ml-auto mt-8 lg:mt-0">
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            
            <div className="nidc-surface p-8 relative z-10 border-primary/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Important Note</h3>
                  <p className="text-xs text-muted-foreground">Read before proceeding</p>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-foreground/80">
                <p>
                  You are <strong className="text-foreground">not</strong> applying to be "prepared" for something in the future.
                </p>
                <p>
                  You are applying to enter a system that is <strong className="text-foreground">already being built</strong>, where your development will align with real work over time.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground uppercase tracking-widest">Status</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Intake Open</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
