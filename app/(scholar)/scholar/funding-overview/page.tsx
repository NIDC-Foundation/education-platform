import { MetricCard } from "@/components/cards/metric-card";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import type { BadgeStatus } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Banknote, CheckCircle2, Clock3 } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarDashboardData } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";

type FundingRecord = {
  id: string;
  status: BadgeStatus;
  amount: number | string;
  category: string;
  disbursement_date?: string | null;
  created_at: string;
  reference_number?: string | null;
};


const fundingBreakdownArr = [
  {
    label: "Tuition & academic fees",
    note: "Covers core fees, lab access, and project supervision.",
    allocated: "₦2.9M",
    used: "₦2.2M",
    utilisation: 76,
  },
  {
    label: "Living stipend",
    note: "Monthly stipends are on schedule with one pending cycle.",
    allocated: "₦1.1M",
    used: "₦800k",
    utilisation: 73,
  },
  {
    label: "Research support",
    note: "Includes dataset access and field transport.",
    allocated: "₦500k",
    used: "₦280k",
    utilisation: 56,
  },
];

export default async function FundingOverviewPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { profile, fundingRecords } = await getScholarDashboardData(user.id);

  const toAmount = (value: number | string | null | undefined) => {
    const amount = Number(value);
    return Number.isFinite(amount) ? amount : 0;
  };
  const fmt = (value: number | string | null | undefined) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(toAmount(value));
  const totalApproved = toAmount(profile?.approved_funding || 4800000);
  const totalDisbursed = fundingRecords.reduce(
    (acc: number, r: FundingRecord) =>
      acc + (r.status === "completed" ? toAmount(r.amount) : 0),
    0
  );
  const nextStipend =
    toAmount(fundingRecords.find((r: FundingRecord) => r.status === "pending")?.amount || 350000);

  const ledger = fundingRecords.map((r: FundingRecord) => ({
    id: r.id,
    date: new Date(r.disbursement_date || r.created_at).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    ),
    category: r.category,
    amount: fmt(r.amount),
    reference: r.reference_number || `REF-${r.id.slice(0, 8)}`,
    status: r.status,
  }));

  const metrics = [
    {
      label: "Approved Support",
      value: fmt(totalApproved),
      sub: "Full scholarship commitment",
      icon: Banknote,
    },
    {
      label: "Disbursed",
      value: fmt(totalDisbursed),
      sub: "Released to date",
      icon: CheckCircle2,
    },
    {
      label: "Next Stipend",
      value: fmt(nextStipend),
      sub: nextStipend > 0 ? "Upcoming release" : "No pending stipends",
      icon: Clock3,
    },
  ];

  return (
    <PageContainer
      title="Funding Overview"
      section="Scholar Portal"
      description="See scholarship disbursements, support categories, and the current funding runway."
      action={
        <Button size="sm" className="rounded-md">
          Download Funding Statement
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {metrics.map((m) => (
            <MetricCard
              key={m.label}
              title={m.label}
              value={m.value}
              description={m.sub}
              icon={m.icon}
              className="border-border/60"
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Funding Breakdown</CardTitle>
              <CardDescription>
                How approved support is allocated across the scholar experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {fundingBreakdownArr.map((line) => (
                <div key={line.label} className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{line.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {line.note}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold">{line.used}</p>
                      <p className="text-xs text-muted-foreground">
                        of {line.allocated}
                      </p>
                    </div>
                  </div>
                  <Progress value={line.utilisation} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Funding Health</CardTitle>
              <CardDescription>
                Compliance and release signals for the current cycle.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Tuition obligations are current and institution invoices are reconciled.",
                "Living stipend releases are on schedule with one pending payout cycle.",
                "Research support remains available for approved fieldwork and conference needs.",
                "Impact evidence and report submission are current, keeping funding status healthy.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border bg-muted/20 p-3.5 text-sm leading-relaxed text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Disbursement Ledger</CardTitle>
            <CardDescription>
              Chronological record of approved funding support.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledger.map((d: { id: string, date: string, category: string, amount: string, reference: string, status: BadgeStatus }) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium text-sm">
                      {d.date}
                    </TableCell>
                    <TableCell className="text-sm">{d.category}</TableCell>
                    <TableCell className="text-sm">{d.amount}</TableCell>
                    <TableCell className="text-sm">{d.reference}</TableCell>
                    <TableCell>
                      <StatusBadge status={d.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {ledger.length === 0 && (
              <div className="border-t border-dashed border-border/50 py-10 text-center text-sm text-muted-foreground">
                No disbursement records found.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
