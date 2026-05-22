import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-1 flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Light theme background image */}
      <Image
        src="/hero-bg-light.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center dark:hidden"
      />

      {/* Dark theme background image */}
      <Image
        src="/hero-bg-dark.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 hidden object-cover object-center dark:block"
      />

      {/* Background overlay for text readability */}
      <div className="absolute inset-0 z-1 bg-background/55 dark:bg-background/65" />

      {/* Soft center blur/glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-2 h-105 w-180 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/45 blur-3xl dark:bg-background/55" />

      {/* Main Center Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="mb-6 text-4xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-[4rem]">
          Building Systems. Developing the People Who Run Them.
        </h1>

        <div className="mx-auto mb-10 max-w-3xl space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground md:text-[1.1rem]">
            NIDC is building a system that develops people and builds real
            systems at the same time, across Energy, Manufacturing, and Digital
            Infrastructure.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground md:text-[1.1rem]">
            This goes beyond scholarships. It is a long-term system for building
            real capability and real-world impact. Development and execution are
            happening at the same time.
          </p>
        </div>

        <Button className="h-12 rounded-full px-6 text-sm font-semibold">
          <span className="flex items-center gap-2">
            Donate Now
            <ArrowUpRight className="size-5" />
          </span>
        </Button>
      </div>

      <div className="absolute inset-0 z-[1] bg-black/45 dark:bg-black/55" />
    </section>
  );
};

export default HeroSection;