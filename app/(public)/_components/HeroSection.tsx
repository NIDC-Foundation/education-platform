import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Cpu,
  Zap,
} from "lucide-react";

const focusAreas = [
  {
    label: "Energy",
    icon: Zap,
  },
  {
    label: "Manufacturing",
    icon: Factory,
  },
  {
    label: "Digital Infrastructure",
    icon: Cpu,
  },
];

const systemPoints = [
  "Real capability",
  "Structured development",
  "Real-world impact",
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Background grid + glow */}
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

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        {/* Content */}
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
            NIDC Foundation
          </div>

          <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
            Building Systems.{" "}
            <span className="text-primary">
              Developing the People Who Run Them.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
            NIDC is building a system that develops people and builds real
            systems at the same time, across Energy, Manufacturing, and Digital
            Infrastructure.
          </p>

          <p className="mt-5 max-w-2xl border-l-2 border-primary pl-4 text-sm leading-7 text-foreground/80 sm:text-base">
            This goes beyond scholarships. It is a long-term system for building
            real capability and real-world impact.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/apply"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_18px_55px_rgba(33,209,0,0.28)] transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Join the First Cohort
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5"
            >
              Learn How It Works
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {systemPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {focusAreas.map((area) => (
              <div
                key={area.label}
                className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur"
              >
                <area.icon className="mb-4 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">
                  {area.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Strategic development area
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image / visual card */}
        <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto">
          <div className="absolute -left-4 top-14 z-20 hidden rounded-3xl border border-border bg-background/90 p-4 shadow-xl backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Parallel development
                </p>
                <p className="text-xs text-muted-foreground">
                  People + systems grow together
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-muted shadow-2xl">
            <Image
              src="/feature-03.png"
              alt="Mentor guiding a young African learner in a modern innovation workspace"
              width={900}
              height={1100}
              priority
              className="h-[560px] w-full object-cover object-center sm:h-[650px]"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/15 bg-black/45 p-5 text-white shadow-xl backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  System status
                </p>

                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Building
                </span>
              </div>

              <h2 className="text-xl font-semibold tracking-tight">
                Development and execution are happening at the same time.
              </h2>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {["Select", "Develop", "Deploy"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-center text-xs font-medium text-white/85"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-x-10 -bottom-8 -z-10 h-32 rounded-full bg-primary/25 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
