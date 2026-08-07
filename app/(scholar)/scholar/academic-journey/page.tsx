import { MetricCard } from "@/components/cards/metric-card";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarAcademicJourney } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";

type TermEntry = {
  id: string;
  term: string;
  gpa: string | number;
  highlight: string;
  focus: string;
};

type CourseEntry = {
  id: string;
  title: string;
  credits: number;
  note: string;
  status: string;
  score?: string | number | null;
};


const capabilityGrowth = [
  {
    label: "Technical depth",
    value: 91,
    detail: "Applied modelling and research methods are strong.",
  },
  {
    label: "Policy communication",
    value: 82,
    detail: "Improving translation of evidence into decision-ready narratives.",
  },
  {
    label: "Placement readiness",
    value: 78,
    detail: "Portfolio is strong; interview storytelling is next.",
  },
];

const metricIcons = [GraduationCap, Award, BookOpen, Briefcase];

export default async function AcademicJourneyPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { profile, courses, terms } = await getScholarAcademicJourney(user.id);
  const fullName = profile
    ? `${profile.first_name} ${profile.last_name}`
    : "Scholar Name";

  const metrics = [
    {
      label: "Current CGPA",
      value: profile?.cgpa || "N/A",
      sub: "Updated this term",
    },
    {
      label: "Credits Completed",
      value: profile?.credits_completed || 0,
      sub: "Cumulative",
    },
    {
      label: "Courses Done",
      value: courses.length.toString(),
      sub: "This academic year",
    },
    {
      label: "Terms Active",
      value: terms.length.toString(),
      sub: "In-programme",
    },
  ];

  return (
    <PageContainer
      title="Academic Journey"
      section="Scholar Portal"
      description="A live view of academic growth, coursework, and readiness for deployment."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((m, i) => (
            <MetricCard
              key={m.label}
              title={m.label}
              value={m.value}
              description={m.sub}
              icon={metricIcons[i]}
              className="border-border/60"
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Term Timeline</CardTitle>
              <CardDescription>
                Performance and learning focus across the active academic cycles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {terms.map((term: TermEntry, index: number) => (
                  <div key={term.id} className="flex gap-4">
                    <div className="mt-1 flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      {index < terms.length - 1 && (
                        <div className="mt-2 h-16 w-px bg-border" />
                      )}
                    </div>
                    <div className="pb-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold">{term.term}</p>
                        <Badge variant="outline">GPA {term.gpa}</Badge>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {term.highlight}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
                        {term.focus}
                      </p>
                    </div>
                  </div>
                ))}
                {terms.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No academic terms recorded yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Current Coursework</CardTitle>
              <CardDescription>
                Modules shaping current academic growth and research readiness.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {courses.map((course: CourseEntry) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between gap-3 px-6 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.credits} credits · {course.note}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="capitalize">
                        {course.status}
                      </Badge>
                      <span className="text-sm font-semibold">
                        {course.score || "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
                {courses.length === 0 && (
                  <p className="px-6 py-4 text-sm text-muted-foreground">
                    No courses logged yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Capability Growth</CardTitle>
              <CardDescription>
                How academic development is translating into real deployment readiness.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {capabilityGrowth.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                Applied Learning Focus
              </CardTitle>
              <CardDescription>
                What the current academic year is preparing you to do next.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  label: "Research direction",
                  value:
                    profile?.research_direction ||
                    "Applied research tied to national development and sector-specific performance outcomes.",
                },
                {
                  label: "Placement objective",
                  value:
                    profile?.placement_objective ||
                    "Move into a high-impact role where technical depth and leadership can drive systemic change.",
                },
                {
                  label: "Scholarship expectation",
                  value:
                    profile?.scholarship_expectation ||
                    "Maintain excellent academic standing while documenting visible national service outputs each cycle.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border bg-muted/20 p-4"
                >
                  <p className="mb-1.5 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                Current scholar: {fullName} · {profile?.level || "Scholar"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
