import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DonateHero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Background styling matching NIDC Hero Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_var(--primary)] animate-pulse" />
          Support the System
        </div>

        <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Build the systems for <br className="hidden sm:block" />
          <span className="text-primary">national progress.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Your support enables the development of talent, infrastructure, and systems required for Nigeria’s long-term industrial growth.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 h-12 text-base w-full sm:w-auto group">
            <Link href="#ways-to-contribute">
              Support Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base w-full sm:w-auto border-primary/20 hover:bg-primary/5 text-foreground">
            <Link href="mailto:partnerships@nidcfoundation.org">
              Partner With Us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
