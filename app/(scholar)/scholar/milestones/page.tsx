import { MetricCard } from "@/components/cards/metric-card";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import type { BadgeStatus } from "@/components/ui/status-badge";
import { Calendar, CheckCircle2, Clock, Flag, Target } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarDashboardData } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";

type MilestoneEntry = {
  id: string;
  title: string;
  category: string;
  status: BadgeStatus;
  due_date: string;
  owner?: string | null;
  impact_description?: string | null;
  evidence_link?: string | null;
};


const categoryCompletion = [
  { label: "Course completion", value: 100 },
  { label: "Internships", value: 65 },
  { label: "Research", value: 72 },
  { label: "National service contributions", value: 92 },
  { label: "Industry placements", value: 40 },
];

const statIcons = [CheckCircle2, Clock, Calendar];

export default async function MilestonesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { milestones } = await getScholarDashboardData(user.id);
  const milestonesList = milestones.map((m: MilestoneEntry) => ({
    id: m.id,
    title: m.title,
    category: m.category,
    status: m.status,
    dueDate: new Date(m.due_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    owner: m.owner || "Program Office",
    impact: m.impact_description || "Public-sector and research impact",
    evidence: m.evidence_link || "Pending upload",
  }));

  const stats = [
    {
      label: "Completed",
      value: milestonesList.filter((m: { status: BadgeStatus }) => m.status === "completed").length,
      detail: "Milestones already delivered",
    },
    {
      label: "In progress",
      value: milestonesList.filter((m: { status: BadgeStatus }) => m.status === "active").length,
      detail: "Current milestones under execution",
    },
    {
      label: "Upcoming",
      value: milestonesList.filter((m: { status: BadgeStatus }) => m.status === "upcoming").length,
      detail: "Milestones queued for the next cycle",
    },
  ];

  return (
    <PageContainer
      title="Milestones"
      section="Scholar Portal"
      description="Track course completion, internships, research, national service contributions, and industry placements."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <MetricCard
              key={s.label}
              title={s.label}
              value={s.value}
              description={s.detail}
              icon={statIcons[i]}
              className="border-border/60"
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Category Completion
              </CardTitle>
              <CardDescription>
                Required milestone areas across the scholar journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryCompletion.map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium">{item.label}</p>
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
                <Flag className="h-4 w-4 text-primary" />
                Milestone Board
              </CardTitle>
              <CardDescription>
                Delivery detail, evidence, and impact for each core milestone.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {milestonesList.map((m: { id: string, title: string, category: string, status: BadgeStatus, dueDate: string, owner: string, impact: string, evidence: string }) => (
                  <div key={m.id} className="p-6">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold">{m.title}</p>
                          <Badge variant="outline" className="capitalize">
                            {m.category}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {m.impact}
                        </p>
                      </div>
                      <StatusBadge status={m.status} />
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {[
                        { label: "Due date", value: m.dueDate },
                        { label: "Owner", value: m.owner },
                        { label: "Evidence", value: m.evidence },
                      ].map((cell) => (
                        <div
                          key={cell.label}
                          className="rounded-lg border bg-muted/20 p-3"
                        >
                          <p className="mb-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {cell.label}
                          </p>
                          <p className="text-xs font-medium">{cell.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {milestonesList.length === 0 && (
                  <p className="m-6 rounded-xl border border-dashed border-border/50 px-5 py-8 text-center text-sm text-muted-foreground">
                    No milestones found.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
