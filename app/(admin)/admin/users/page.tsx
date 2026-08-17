import Link from "next/link";
import { MetricCard } from "@/components/cards/metric-card";
import { HorizontalBarChart } from "@/components/donor/transparency-charts";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Shield, UserCheck, Users } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminUsers } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";
import { UserDirectoryTable } from "@/components/admin/user-directory-table";

type UserEntry = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
};


function getUserStatusVariant(status: string) {
    if (status === "active") return "default" as const;
    if (status === "pending") return "secondary" as const;
    return "destructive" as const;
}

export default async function UserManagementPage() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const allUsers = await getAdminUsers();

    const roleCounts = allUsers.reduce((acc: Record<string, number>, curr: UserEntry) => {
        const role = curr.role || "applicant";
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {});

    const userRoleBreakdown = [
        { label: "Applicants", value: roleCounts.applicant || 0, color: "var(--chart-1)" },
        { label: "Scholars", value: roleCounts.scholar || 0, color: "var(--chart-2)" },
        { label: "Reviewers", value: roleCounts.reviewer || 0, color: "var(--chart-3)" },
        { label: "Admins", value: roleCounts.admin || 0, color: "var(--chart-5)" },
    ];

    const privilegedUsers = allUsers.filter((u: UserEntry) => ["admin", "reviewer", "partner"].includes(u.role));
    const pendingUsers = allUsers.filter((u: UserEntry) => u.status === "pending");

    const userMetrics = [
        { title: "Total Users", value: allUsers.length.toString(), description: "All registered accounts", icon: Users },
        { title: "Privileged Access", value: privilegedUsers.length.toString(), description: "Admins, reviewers, partners", icon: Shield },
        { title: "Pending Accounts", value: pendingUsers.length.toString(), description: "Awaiting confirmation", icon: UserCheck },
        { title: "MFA Coverage", value: "92%", description: "Estimated across staff", icon: KeyRound },
    ];

    const displayUsers = allUsers.slice(0, 10); // Show latest 10 for performance

    return (
        <PageContainer
            title="User Management"
            description="Manage platform users, operational roles, access levels, and account state."
            action={
                <Button asChild variant="outline">
                    <Link href="/admin/settings">Open System Settings</Link>
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {userMetrics.map((metric) => (
                        <MetricCard
                            key={metric.title}
                            title={metric.title}
                            value={metric.value}
                            description={metric.description}
                            icon={metric.icon}
                            className="border-border/60"
                        />
                    ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                    <Card className="border-border/60">
                        <CardHeader>
                            <CardTitle>User Role Mix</CardTitle>
                            <CardDescription>Distribution of operational access across platform teams.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <HorizontalBarChart items={userRoleBreakdown} valueSuffix="" />
                        </CardContent>
                    </Card>

                    <Card className="border-border/60">
                        <CardHeader>
                            <CardTitle>Access Overview</CardTitle>
                            <CardDescription>Role, account type, and current state for core operating accounts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {displayUsers.map((u: UserEntry) => (
                                <div key={u.id} className="rounded-xl border bg-background p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="font-medium">{u.first_name} {u.last_name}</p>
                                            <p className="mt-1 text-sm text-muted-foreground">{u.role} · {u.email}</p>
                                        </div>
                                        <Badge variant={getUserStatusVariant(u.status)}>
                                            {u.status}
                                        </Badge>
                                    </div>
                                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Joined {new Date(u.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-border/60">
                    <CardHeader>
                        <CardTitle>User Directory</CardTitle>
                        <CardDescription>Admin view of account ownership, access scope, and current account status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UserDirectoryTable users={allUsers} />
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    );
}
