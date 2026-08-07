import { redirect } from "next/navigation";
import { PageContainer } from "@/components/layout/page-container";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminMessageThreads } from "@/lib/supabase/actions";
import { resolveUserRoleForSession } from "@/lib/auth/roles";
import { AdminMessagesInbox } from "@/components/admin/messages-inbox";

export default async function AdminMessagesPage() {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const role = await resolveUserRoleForSession(supabase, user);
    if (role !== "admin" && role !== "reviewer") {
        redirect("/admin");
    }

    const threads = await getAdminMessageThreads();

    return (
        <PageContainer
            title="Messages"
            description="All scholar and donor conversations in one shared inbox."
        >
            <AdminMessagesInbox threads={threads} currentUserId={user.id} />
        </PageContainer>
    );
}
