import React from "react";
import { ShieldCheck } from "lucide-react";

export default function TheDifference() {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-950 px-4 py-24 md:px-8 lg:py-32 dark:bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
        </div>

        <h2 className="mb-8 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-tight">
          This is not built for <br className="hidden md:block"/> mass participation.
        </h2>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-2xl font-light">
          It is designed for individuals who are willing to take responsibility for their growth and commit to a structured process.
        </p>

        <div className="mt-12 inline-block">
          <div className="h-1 w-24 bg-primary rounded-full mx-auto" />
        </div>
      </div>
    </section>
  );
}
