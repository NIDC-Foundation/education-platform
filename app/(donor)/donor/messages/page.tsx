import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getDonorMessageThreads } from "@/lib/supabase/actions";
import { DonorMessagesWorkspace } from "@/components/donor/messages-workspace";

export default async function DonorMessagesPage() {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const threads = await getDonorMessageThreads(user.id);

    return <DonorMessagesWorkspace threads={threads} currentUserId={user.id} />;
}
