import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { FileText, Shield, Upload } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarDocuments } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";

type ScholarDocument = {
  id: string;
  name: string;
  type: string;
  status: BadgeStatus;
  updated_on: string;
  expires_on?: string | null;
  owner: string;
};

const DocCard = ({
  title,
  icon: Icon,
  type,
  scholarDocuments,
}: {
  title: string;
  icon: React.ElementType;
  type: string;
  scholarDocuments: ScholarDocument[];
}) => {
  const docs = scholarDocuments.filter(
    (d: ScholarDocument) =>
      d.type === type || (type === "Identity" && d.type === "Compliance")
  );
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {docs.map((doc: ScholarDocument) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-lg border bg-muted/20 p-3"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm font-medium">{doc.name}</span>
            </div>
            <StatusBadge status={doc.status} />
          </div>
        ))}
        {docs.length === 0 && (
          <p className="py-2 text-sm italic text-muted-foreground">
            No {title.toLowerCase()} found.
          </p>
        )}
      </CardContent>
    </Card>
  );
};


export default async function DocumentsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const scholarDocuments = await getScholarDocuments(user.id);
  return (
    <PageContainer
      title="Documents & Compliance"
      section="Scholar Portal"
      description="Manage your scholarship records, identity verification, and programme compliance documents."
      action={
        <Button size="sm" className="gap-2 rounded-md">
          <Upload className="h-3.5 w-3.5" /> Upload Document
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <DocCard title="Identity & Profile" icon={Shield} type="Identity" scholarDocuments={scholarDocuments} />
          <DocCard title="Academic Records" icon={FileText} type="Academic" scholarDocuments={scholarDocuments} />
        </div>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Document Ledger</CardTitle>
            <CardDescription>
              Full register of all uploaded files and verification status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scholarDocuments.map((doc: ScholarDocument) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium text-sm">
                      {doc.name}
                    </TableCell>
                    <TableCell className="text-sm">{doc.type}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(doc.updated_on).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {doc.expires_on
                        ? new Date(doc.expires_on).toLocaleDateString()
                        : "—"}
                    </TableCell>
                    <TableCell className="text-sm">{doc.owner}</TableCell>
                    <TableCell>
                      <StatusBadge status={doc.status} />
                    </TableCell>
                  </TableRow>
                ))}
                {scholarDocuments.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-sm text-muted-foreground"
                    >
                      No documents recorded in the ledger.
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
