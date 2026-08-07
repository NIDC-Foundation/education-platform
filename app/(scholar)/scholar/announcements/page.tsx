import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bell, Calendar, Pin } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ScholarAnnouncementsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: announcements, error } = await supabase
    .from("announcements")
    .select("*, profiles(first_name, last_name)")
    .or("audience.eq.all,audience.eq.scholars")
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching announcements:", error);
  const list = announcements || [];

  return (
    <PageContainer
      title="Announcements"
      section="Scholar Portal"
      description="Important updates, events, and notices from the programme office."
    >
      <div className="space-y-4">
        {list.length > 0 ? (
          list.map((a) => {
            const isPinned = a.is_pinned || a.isPinned;
            const createdAt = a.created_at || a.createdAt;
            const authorName = a.profiles
              ? `${a.profiles.first_name || ""} ${a.profiles.last_name || ""}`.trim()
              : a.author || "Programme Office";

            return (
              <Card
                key={a.id}
                className={isPinned ? "border-primary/30 bg-primary/5" : "border-border/60"}
              >
                <CardHeader className="gap-2 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {isPinned ? (
                        <Pin className="h-4 w-4 text-primary shrink-0" />
                      ) : (
                        <Bell className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                      <p className="text-sm font-semibold">{a.title}</p>
                    </div>
                    {isPinned && <Badge>Pinned</Badge>}
                  </div>
                  <p className="flex items-center gap-2 pl-6 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    <span className="text-muted-foreground/40">·</span>
                    {authorName || "Programme Office"}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                    {a.body}
                  </p>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="border-dashed border-border/60">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <Bell className="mb-3 h-7 w-7 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                No announcements at this time.
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Check back later for updates from the programme office.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
