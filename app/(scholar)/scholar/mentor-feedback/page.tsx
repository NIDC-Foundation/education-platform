import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, Target, User } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarDashboardData } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";

type MentorSession = {
  id: string;
  date: string;
  mentor_name: string;
  theme: string;
  sentiment?: string | null;
  summary: string;
  strengths?: string[] | null;
  action_items?: string[] | null;
};

const sentimentVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Strong: "default",
  Positive: "secondary",
  Watch: "destructive",
};

export default async function MentorFeedbackPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { profile, mentorSessions } = await getScholarDashboardData(user.id);
  const sessions = mentorSessions.map((s: MentorSession) => ({
    id: s.id,
    date: new Date(s.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    mentor: s.mentor_name,
    theme: s.theme,
    sentiment: s.sentiment || "Positive",
    summary: s.summary,
    strengths: s.strengths || [],
    actionItems: s.action_items || [],
  }));
  const latestSession = sessions[0];
  const mentorName =
    profile?.mentor_name || latestSession?.mentor || "Assigned Mentor";
  const mentorTitle = profile?.mentor_title || "Program Mentor";

  return (
    <PageContainer
      title="Mentor Feedback"
      section="Scholar Portal"
      description="Session notes, strengths, and action items shaping the scholar's next decisions."
    >
      <div className="space-y-6">
        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-xl border bg-muted/20 p-5">
                {latestSession ? (
                  <>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge variant={sentimentVariant[latestSession.sentiment] || "secondary"}>
                        {latestSession.sentiment}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {latestSession.date}
                      </span>
                    </div>
                    <h2 className="mb-2 text-base font-semibold">
                      {latestSession.theme}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {latestSession.summary}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mb-2 text-sm font-semibold">
                      Mentor session pending
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Once the first mentor session is logged, the latest
                      summary and action items will appear here.
                    </p>
                  </>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { label: "Mentor", value: mentorName, sub: mentorTitle },
                  {
                    label: "Next review focus",
                    value: "Interview narrative and evidence storytelling",
                    sub: "",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border bg-background p-4"
                  >
                    <p className="mb-1.5 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold">{item.value}</p>
                    {item.sub && (
                      <p className="text-xs text-muted-foreground">
                        {item.sub}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Feedback Timeline
              </CardTitle>
              <CardDescription>
                Historical mentor sessions and follow-up guidance.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {sessions.map((session: { id: string, theme: string, sentiment: string, date: string, mentor: string, summary: string, strengths: string[], actionItems: string[] }, index: number) => (
                  <div key={session.id} className="p-6">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold">{session.theme}</p>
                          <Badge variant={sentimentVariant[session.sentiment] || "secondary"}>
                            {session.sentiment}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {session.date} · {session.mentor}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {index === 0 ? "Latest" : "Archived"}
                      </Badge>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                      {session.summary}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Strengths", items: session.strengths },
                        { label: "Action items", items: session.actionItems },
                      ].map((col) => (
                        <div
                          key={col.label}
                          className="rounded-lg border bg-muted/20 p-4"
                        >
                          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {col.label}
                          </p>
                          <ul className="space-y-1.5">
                            {col.items.map((item: string) => (
                              <li
                                key={item}
                                className="flex gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {sessions.length === 0 && (
                  <p className="px-6 py-8 text-center text-sm text-muted-foreground">
                    No mentor feedback logs found.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Accountability List
                </CardTitle>
                <CardDescription>
                  Immediate mentor asks for the current cycle.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {latestSession?.actionItems.length > 0 ? (
                  latestSession.actionItems.map((item: string) => (
                    <div
                      key={item}
                      className="rounded-lg border bg-muted/20 p-3.5 text-sm text-muted-foreground"
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                    No mentor action items available yet.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Mentor Rhythm</CardTitle>
                <CardDescription>
                  How support is being delivered around the scholar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    icon: Calendar,
                    title: "Bi-weekly mentor sessions",
                    body: "Structured around research progress, communication, and placement preparation.",
                  },
                  {
                    icon: User,
                    title: "Quarterly programme reviews",
                    body: "Scholar success staff validate outputs and intervene when momentum drops.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
