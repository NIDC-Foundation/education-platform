"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  SunMedium,
  UsersRound,
} from "lucide-react";

type PropositionImage = {
  src: string;
  alt: string;
};

type PropositionContent = {
  mainImage: PropositionImage;
  cohortImage: PropositionImage;
  mentorImage: PropositionImage;
  continuityImage: PropositionImage;
};

const propositionContent: PropositionContent = {
  mainImage: {
    src: "/feature-01.png",
    alt: "Focused African learner in a modern education environment",
  },
  cohortImage: {
    src: "/images/nidc2.jpeg",
    alt: "Small selected cohort learning together",
  },
  mentorImage: {
    src: "/feature-03.png",
    alt: "Mentor guiding a young learner",
  },
  continuityImage: {
    src: "/feature-04.png",
    alt: "Students presenting measurable learning outcomes",
  },
};

export default function CorePropositionCards() {
  return (
    <section className="relative overflow-hidden bg-border px-4 py-20 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative grid min-h-[520px] gap-4 lg:grid-cols-12 lg:items-end">
          {/* Decorative marks */}
          <Sparkles className="absolute left-0 top-2 hidden size-8 text-foreground/80 lg:block" />
          <span className="absolute left-[24%] top-[28%] hidden text-3xl text-foreground/80 lg:block">
            ✦
          </span>

          {/* LEFT IMAGE CARD */}
          <article className="relative overflow-hidden rounded-2xl bg-primary/25 p-3 shadow-sm lg:col-span-3 lg:h-97.5">
            <div className="relative h-65 overflow-hidden rounded-xl bg-muted lg:h-72.5">
              <Image
                src={propositionContent.mainImage.src}
                alt={propositionContent.mainImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-full bg-background px-3 py-3 shadow-sm">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>

              <span className="text-xs font-semibold">Develop Potential</span>
            </div>
          </article>

          {/* SMALL TOP PILL + STATEMENT CARD */}
          <div className="flex flex-col gap-3 lg:col-span-3 lg:mb-0">
            <div className="rounded-full bg-muted px-5 py-4 text-center text-xs font-medium text-muted-foreground shadow-sm">
              Core premise for long-term development
            </div>

            <article className="rounded-2xl bg-primary/25 p-6 shadow-sm lg:min-h-57.5">
              <p className="mb-6 text-5xl font-semibold tracking-tight">01</p>

              <h3 className="mb-3 text-lg font-semibold">
                Potential becomes valuable
              </h3>

              <p className="text-sm leading-6 text-muted-foreground">
                Only when it is developed, directed, and applied through a
                structured learning pathway.
              </p>
            </article>

            <div className="relative hidden h-30 overflow-hidden rounded-2xl bg-muted lg:block">
              <Image
                src={propositionContent.cohortImage.src}
                alt={propositionContent.cohortImage.alt}
                fill
                sizes="25vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
          </div>

          {/* CENTER FEATURE CARD */}
          <div className="flex flex-col gap-3 lg:col-span-3 lg:self-center">
            <article className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl bg-primary/25 p-6 text-center shadow-sm">
              <SunMedium className="mb-8 size-8 text-foreground" />

              <h3 className="mb-3 text-lg font-semibold">
                Selective by Design
              </h3>

              <p className="max-w-[250px] text-sm leading-6 text-muted-foreground">
                A limited cohort built around seriousness, discipline, and
                long-term commitment.
              </p>
            </article>

            <div className="rounded-full bg-muted px-5 py-4 text-center text-xs font-medium shadow-sm">
              Limited Cohort <ArrowUpRight className="ml-1 inline size-3" />
            </div>

            <div className="relative h-[120px] overflow-hidden rounded-2xl bg-muted lg:hidden">
              <Image
                src={propositionContent.mentorImage.src}
                alt={propositionContent.mentorImage.alt}
                fill
                sizes="100vw"
                className="object-cover grayscale"
              />
            </div>
          </div>

          {/* RIGHT IMAGE + CONTENT CARD */}
          <div className="flex flex-col gap-3 lg:col-span-3 lg:-mt-10 lg:self-start">
            <div className="rounded-full bg-muted px-5 py-4 text-center text-xs font-medium shadow-sm">
              Built to continue <ArrowUpRight className="ml-1 inline size-3" />
            </div>

            <article className="rounded-2xl bg-primary/25 p-4 shadow-sm">
              <div className="relative h-[185px] overflow-hidden rounded-xl bg-muted">
                <Image
                  src={propositionContent.continuityImage.src}
                  alt={propositionContent.continuityImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>

              <div className="px-2 pb-2 pt-5">
                <div className="mb-4 flex size-9 items-center justify-center rounded-full bg-background text-primary shadow-sm">
                  <ShieldCheck className="size-4" />
                </div>

                <h3 className="mb-2 text-base font-semibold">
                  Built for Continuity
                </h3>

                <p className="text-sm leading-6 text-muted-foreground">
                  Structured with governance, accountability, and measurable
                  long-term outcomes in mind.
                </p>
              </div>
            </article>

            <div className="relative hidden h-[120px] overflow-hidden rounded-2xl bg-muted lg:block">
              <Image
                src={propositionContent.mentorImage.src}
                alt={propositionContent.mentorImage.alt}
                fill
                sizes="25vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
