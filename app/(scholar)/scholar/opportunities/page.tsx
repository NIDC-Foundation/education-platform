import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import type { BadgeStatus } from "@/components/ui/status-badge";
import { ArrowRight, Briefcase, Compass, Target } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarDashboardData } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";
import { scholarOpportunities as opportunities } from "@/lib/constants";

type OpportunityMilestone = {
  category: string;
  title: string;
  status: BadgeStatus;
  impact_description?: string | null;
  evidence_link?: string | null;
};


export default async function OpportunitiesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { profile, milestones } = await getScholarDashboardData(user.id);
  const placementStages = milestones
    .filter(
      (m: OpportunityMilestone) =>
        m.category === "internships" || m.category === "industry placements"
    )
    .map((m: OpportunityMilestone) => ({
      label: m.title,
      status: m.status,
      detail:
        m.impact_description ||
        m.evidence_link ||
        "Placement milestone details",
    }));

  return (
    <PageContainer
      title="Opportunities & Placements"
      section="Scholar Portal"
      description="Track internships, placement matches, and deployment opportunities aligned to your scholar pathway."
      action={
        <Button size="sm" className="gap-2 rounded-md">
          Update Preferences <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      }
    >
      <div className="space-y-6">
        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                {
                  label: "Placement track",
                  value: profile?.program || "Public-sector analytics track",
                  sub: "",
                },
                {
                  label: "Readiness score",
                  value: `${profile?.placement_score || 0}%`,
                  sub: "Interview prep underway",
                },
                {
                  label: "Active matches",
                  value: "3",
                  sub: "Across public analytics and health-tech",
                },
              ].map((item, i) => (
                <div key={item.label} className="rounded-xl border bg-muted/20 p-4">
                  <p className="mb-1.5 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p
                    className={`font-semibold ${
                      i > 0 ? "text-2xl tracking-tight" : "text-base"
                    }`}
                  >
                    {item.value}
                  </p>
                  {item.sub && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Placement Pipeline
              </CardTitle>
              <CardDescription>
                Current step-by-step path toward industry placement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-6 border-l border-border pl-6">
                {placementStages.map((stage) => (
                  <div key={stage.label} className="relative">
                    <div
                      className={`absolute -left-[13px] top-1 h-3 w-3 rounded-full ${
                        stage.status === "completed"
                          ? "bg-primary"
                          : stage.status === "active"
                          ? "bg-accent"
                          : "bg-border"
                      }`}
                    />
                    <div className="mb-0.5 flex items-center gap-2">
                      <p className="text-sm font-medium">{stage.label}</p>
                      <StatusBadge status={stage.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stage.detail}
                    </p>
                  </div>
                ))}
                {placementStages.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No placement milestones found.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                Live Opportunities
              </CardTitle>
              <CardDescription>
                Open roles and programmes currently matched to your profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {opportunities.map((opp) => (
                  <div key={opp.id} className="p-6">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold">{opp.title}</p>
                          <Badge variant="outline">{opp.type}</Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {opp.organisation} · {opp.location}
                        </p>
                      </div>
                      <StatusBadge status={opp.status} />
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                      {opp.summary}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {[
                        { label: "Deadline", value: opp.deadline },
                        { label: "Fit", value: opp.fit },
                      ].map((cell) => (
                        <div
                          key={cell.label}
                          className="rounded-lg border bg-muted/20 p-3"
                        >
                          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {cell.label}
                          </p>
                          <p className="text-xs font-medium">{cell.value}</p>
                        </div>
                      ))}
                      <div className="rounded-lg border bg-muted/20 p-3">
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Readiness
                        </p>
                        <Progress
                          value={opp.status === "active" ? 78 : 56}
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-primary" />
              Career Direction
            </CardTitle>
            <CardDescription>
              What the current opportunity mix is building toward.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-3">
            {[
              "Public-sector analytics roles where modelling directly informs delivery teams.",
              "Health-tech teams that need data translation between product, research, and policy.",
              "Leadership tracks that prepare scholars for visible deployment after graduation.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
