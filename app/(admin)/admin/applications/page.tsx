import Link from "next/link";
import { MetricCard } from "@/components/cards/metric-card";
import { HorizontalBarChart } from "@/components/donor/transparency-charts";
import { PageContainer } from "@/components/layout/page-container";
import { ApplicationStatusBadge } from "@/components/ui/application-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarClock, ClipboardCheck, ClipboardList, Users } from "lucide-react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminApplications } from "@/lib/supabase/actions";
import { resolveUserRoleForSession } from "@/lib/auth/roles";
import { redirect } from "next/navigation";

type AdminApplication = Awaited<
  ReturnType<typeof getAdminApplications>
>[number];

function isPendingReviewStatus(status: string) {
  return status === "submitted" || status === "under_review";
}
function isInterviewStageStatus(status: string) {
  return status === "interview_stage";
}
function isDecisionReadyStatus(status: string) {
  return status === "shortlisted";
}
function getScoreLabel(score: unknown) {
  return typeof score === "number" && Number.isFinite(score)
    ? `${score}/100`
    : "Awaiting";
}
function getCohortLabel(cohortYear: unknown) {
  return typeof cohortYear === "number" || typeof cohortYear === "string"
    ? `Cohort ${cohortYear}`
    : "Unassigned";
}

const metricIcons = [Users, ClipboardList, CalendarClock, ClipboardCheck];

export default async function ApplicationsManagementPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const role = await resolveUserRoleForSession(supabase, user);
  if (role !== "admin" && role !== "reviewer") redirect("/admin");

  const applications = await getAdminApplications();
  const vis = applications.filter(
    (a: AdminApplication) => a.status !== "draft"
  );

  const totalApplicants = vis.length;
  const pendingReview = vis.filter((a: AdminApplication) =>
    isPendingReviewStatus(a.status)
  ).length;
  const interviewStage = vis.filter((a: AdminApplication) =>
    isInterviewStageStatus(a.status)
  ).length;
  const decisionReady = vis.filter((a: AdminApplication) =>
    isDecisionReadyStatus(a.status)
  ).length;

  const metrics = [
    {
      title: "Total Applicants",
      value: totalApplicants.toLocaleString(),
      description: "Across open application windows",
    },
    {
      title: "Pending Review",
      value: pendingReview.toString(),
      description: "Need reviewer assignment",
    },
    {
      title: "Interviews Active",
      value: interviewStage.toString(),
      description: "Currently in interview cycle",
    },
    {
      title: "Decision Ready",
      value: decisionReady.toString(),
      description: "Awaiting final approval",
    },
  ];

  const pipelineData = [
    { label: "Intake", value: totalApplicants > 0 ? 100 : 0, color: "var(--chart-1)" },
    {
      label: "Screening",
      value: Math.round(
        (vis.filter((a: AdminApplication) => !["submitted"].includes(a.status))
          .length /
          (totalApplicants || 1)) *
          100
      ),
      color: "var(--chart-2)",
    },
    {
      label: "Interview",
      value: Math.round(
        (vis.filter((a: AdminApplication) =>
          ["interview_stage", "shortlisted", "accepted"].includes(a.status)
        ).length /
          (totalApplicants || 1)) *
          100
      ),
      color: "var(--chart-3)",
    },
    {
      label: "Offer",
      value: Math.round(
        (vis.filter((a: AdminApplication) => a.status === "accepted").length /
          (totalApplicants || 1)) *
          100
      ),
      color: "var(--chart-5)",
    },
  ];

  return (
    <PageContainer
      title="Applications Management"
      section="Admin"
      description="Monitor intake volume, reviewer queues, scoring progress, interviews, and final decisions."
      action={
        <Button asChild size="sm" className="rounded-md">
          <Link href="/admin/applications/review">Open Review</Link>
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((m, i) => (
            <MetricCard
              key={m.title}
              title={m.title}
              value={m.value}
              description={m.description}
              icon={metricIcons[i]}
              className="border-border/60"
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Application Pipeline</CardTitle>
              <CardDescription>
                Conversion from intake through final decision issuance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HorizontalBarChart items={pipelineData} valueSuffix="%" />
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Reviewer Load</CardTitle>
              <CardDescription>
                Current reviewer queues, specialisations, and turnaround.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-muted/20 p-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold">System Auto-Review</p>
                  <span className="text-sm font-semibold">
                    {pendingReview} in queue
                  </span>
                </div>
                <p className="mb-3 text-xs text-muted-foreground">
                  Initial screening and scoring
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  SLA: 24 Hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Applications Queue</CardTitle>
              <CardDescription>
                Live queue for reviewer assignment, scoring, and interview
                coordination.
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/applications/review">Review featured</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cohort</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vis.map((a: AdminApplication) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <p className="font-medium text-sm">
                        {a.profiles?.first_name} {a.profiles?.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {a.id.slice(0, 8)}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {a.profiles?.email || "—"}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{getCohortLabel(a.cohort_year)}</p>
                      <p className="text-xs text-muted-foreground">
                        Step {a.current_step ?? "N/A"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <ApplicationStatusBadge status={a.status} />
                    </TableCell>
                    <TableCell className="text-sm">
                      {getScoreLabel(a.score)}
                    </TableCell>
                  </TableRow>
                ))}
                {vis.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-8 text-center text-sm text-muted-foreground"
                    >
                      No applications submitted yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
