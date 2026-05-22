import { BookOpen, BriefcaseBusiness, Building2, Target } from "lucide-react";
import Image from "next/image";

const SOLUTION_FEATURES = [
  {
    icon: Target,
    title: "Structured growth",
    description:
      "Development is intentional, tracked, and tied to clear standards.",
  },
  {
    icon: BookOpen,
    title: "Capability first",
    description:
      "The focus is on building people who can do real work, not just complete a program.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Aligned opportunities",
    description:
      "Growth opens access to learning pathways, exposure, and support that fit the system.",
  },
  {
    icon: Building2,
    title: "Real-world contribution",
    description:
      "Participants are positioned to apply what they build within functioning systems.",
  },
];

const SolutionSection = () => {
  return (
    <section className="w-full bg-background-foreground px-4 py-16 md:px-8 lg:py-24">
      <div className="mx-auto max-w-[1300px]">
        {/* Top Image + Floating Content */}
        <div className="relative mb-10 md:mb-14">
          <div className="relative h-[250px] overflow-hidden rounded-xl md:h-[390px]">
            <Image
              src="/solution_banner.png"
              alt="NIDC talents and mentors in a structured learning workshop"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1300px"
              className="object-cover object-center"
            />

            {/* Extra lime overlay to match your reference */}
            <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-primary/25" />
          </div>

          {/* Floating Card */}
          <div className="relative z-10 mx-auto -mt-16 max-w-[92%] rounded-xl border border-gray-100/70 bg-white px-6 py-7 text-center shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:-mt-24 md:max-w-4xl md:px-12 md:py-10">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-6 bg-gray-300" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-500">
                The Solution
              </span>
              <span className="h-px w-6 bg-gray-300" />
            </div>

            <h2 className="mb-4 text-2xl font-semibold tracking-[-0.04em] text-[#1a1a1a] md:text-4xl lg:text-5xl">
              A system for turning potential into capability.
            </h2>

            <p className="mx-auto max-w-3xl text-sm leading-7 text-gray-500 md:text-[1rem] md:leading-8">
              NIDC is designed as a long-term system for developing and
              deploying talent into areas that matter. We build a structured
              pathway that connects growth to real-world contribution.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="rounded-xl bg-[background p-5 md:p-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_1fr]">
            {/* Large Statement Card */}
            <article className="bg-white p-8 shadow-sm ring-1 ring-black/5 rounded-xl md:p-10 lg:p-12">
              <div className="space-y-6 text-[1rem] leading-8 text-[#292929] md:text-lg md:leading-9">
                <p>
                  NIDC is designed as a long-term system for developing and
                  deploying talent into areas that matter.
                </p>

                <p>
                  We do not simply provide access or support. We build a
                  structured pathway that connects growth to real-world
                  contribution.
                </p>

                <p className="font-semibold text-[#1a1a1a]">
                  This is not about participation. It is about becoming capable,
                  and applying that capability where it creates impact.
                </p>
              </div>
            </article>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {SOLUTION_FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="group rounded-xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1  md:p-8"
                  >
                    <div className="mb-5 flex size-10 items-center justify-center rounded-full bg-[#21D100]/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      <Icon className="size-5" strokeWidth={2.2} />
                    </div>

                    <h3 className="mb-3 text-lg font-semibold tracking-tight text-[#1a1a1a]">
                      {feature.title}
                    </h3>

                    <p className="text-sm leading-7 text-gray-500 md:text-[0.95rem]">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
