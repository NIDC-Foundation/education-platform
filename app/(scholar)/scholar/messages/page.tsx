import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarMessageThreads } from "@/lib/supabase/actions";
import { ScholarMessagesWorkspace } from "@/components/scholar/messages-workspace";

export default async function ScholarMessagesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const threads = await getScholarMessageThreads(user.id);

  return <ScholarMessagesWorkspace threads={threads} currentUserId={user.id} />;
}
