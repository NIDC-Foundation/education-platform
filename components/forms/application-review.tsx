"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  AlertCircle,
  FileText,
  Target,
  Brain,
  HeartHandshake,
  Hammer,
  Edit,
  Send,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { submitApplication } from "@/lib/supabase/actions";
import { commitmentOptions } from "@/constants/application";
import type {
  PersonalInfo,
  DirectionFocus,
  ThinkingResponses,
  CommitmentResponse,
  RealityCheckResponse,
} from "@/types";

type ReviewProfile = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
};

type ReviewApplication = {
  program_id?: string | null;
  program_name?: string | null;
  personal_info?: Partial<PersonalInfo> | null;
  academic_background?: Partial<DirectionFocus> | null;
  essays?: Partial<ThinkingResponses> | null;
  commitment?: Partial<CommitmentResponse> | null;
  reality_check?: Partial<RealityCheckResponse> | null;
};

interface ApplicationReviewProps {
  profile: ReviewProfile | null;
  application: ReviewApplication | null;
  onBack?: () => void;
  onEdit?: (step: number) => void;
}

function ReviewSection({
  title,
  icon: Icon,
  editStep,
  onEdit,
  children,
}: {
  title: string;
  icon: LucideIcon;
  editStep?: number;
  onEdit?: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold">{title}</span>
        </div>
        {editStep && onEdit ? (
          <button
            onClick={() => onEdit(editStep)}
            className="text-xs font-medium text-primary flex items-center gap-1 hover:underline"
          >
            <Edit className="h-3 w-3" /> Edit
          </button>
        ) : editStep ? (
          <Link href={`/application/step-${editStep}`}>
            <button className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
              <Edit className="h-3 w-3" /> Edit
            </button>
          </Link>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 py-2 border-b border-border/50 last:border-0">
      <span className="text-[11px] text-muted-foreground min-w-[180px] shrink-0 pt-px">
        {label}
      </span>
      <span className="text-sm font-medium">
        {value || (
          <span className="text-muted-foreground/40 text-xs italic">
            Not provided
          </span>
        )}
      </span>
    </div>
  );
}

function TextBlock({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {value ? (
        <p className="text-sm text-foreground/80 bg-muted/30 p-3 rounded-lg border leading-relaxed whitespace-pre-wrap">
          {value}
        </p>
      ) : (
        <div className="flex items-center gap-2 text-amber-600 text-xs">
          <AlertCircle className="h-3.5 w-3.5" /> Not completed
        </div>
      )}
    </div>
  );
}

function toOptionalString(value?: string | null) {
  return value ?? undefined;
}

export function ApplicationReview({
  profile,
  application,
  onBack,
  onEdit,
}: ApplicationReviewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async () => {
    if (!agreed) {
      toast.error("Please agree to the declaration");
      return;
    }
    setLoading(true);
    try {
      const { error } = await submitApplication();
      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Application submitted successfully!");
      router.push("/status");
      router.refresh();
    } catch {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pi: ReviewProfile = profile ?? {};
  const personalInfo: Partial<PersonalInfo> = application?.personal_info ?? {};
  const directionFocus: Partial<DirectionFocus> =
    application?.academic_background ?? {};
  const thinking: Partial<ThinkingResponses> = application?.essays ?? {};
  const commitment: Partial<CommitmentResponse> = application?.commitment ?? {};
  const realityCheck: Partial<RealityCheckResponse> =
    application?.reality_check ?? {};

  const location = [personalInfo.city, personalInfo.country]
    .filter(Boolean)
    .join(", ");

  const currentStatusLabel = personalInfo.currentStatus
    ? personalInfo.currentStatus.charAt(0).toUpperCase() +
      personalInfo.currentStatus.slice(1)
    : undefined;

  const commitmentTypeLabels = (commitment.commitmentTypes ?? [])
    .map(
      (value) => commitmentOptions.find((opt) => opt.value === value)?.label
    )
    .filter(Boolean)
    .join(", ");

  const readyForCommitmentLabel =
    realityCheck.readyForCommitment === "yes"
      ? "Yes"
      : realityCheck.readyForCommitment === "no"
        ? "No"
        : undefined;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">
            Final Submission — No Revisions After Submit
          </p>
          <p className="mt-0.5 text-amber-700">
            Once you click &quot;Submit Application&quot;, your application is
            locked and forwarded to the Selection Board.
          </p>
        </div>
      </div>

      {/* Basic Info Review */}
      <ReviewSection
        title="Basic Info"
        icon={FileText}
        editStep={1}
        onEdit={onEdit}
      >
        <div className="space-y-3">
          <InfoRow
            label="Full Name"
            value={toOptionalString(personalInfo.fullName)}
          />
          <InfoRow
            label="Email Address"
            value={toOptionalString(personalInfo.email ?? pi.email)}
          />
          <InfoRow
            label="Phone Number"
            value={toOptionalString(personalInfo.phone ?? pi.phone)}
          />
          <Separator />
          <InfoRow label="Current Location" value={location || undefined} />
          <InfoRow label="Current Status" value={currentStatusLabel} />
        </div>
      </ReviewSection>

      {/* Direction & Focus Review */}
      <ReviewSection
        title="Direction & Focus"
        icon={Target}
        editStep={2}
        onEdit={onEdit}
      >
        <div className="space-y-4">
          <InfoRow
            label="Area of Interest"
            value={toOptionalString(directionFocus.areaOfInterest)}
          />
          <TextBlock
            label="Why this area?"
            value={directionFocus.whyThisArea}
          />
        </div>
      </ReviewSection>

      {/* Thinking Review */}
      <ReviewSection
        title="Thinking"
        icon={Brain}
        editStep={3}
        onEdit={onEdit}
      >
        <div className="space-y-4">
          <TextBlock
            label="What do you think is the biggest problem holding back capable people in Nigeria?"
            value={thinking.biggestProblem}
          />
          <Separator />
          <TextBlock
            label="What have you done in the last 6–12 months to improve yourself?"
            value={thinking.recentGrowth}
          />
        </div>
      </ReviewSection>

      {/* Commitment Review */}
      <ReviewSection
        title="Commitment"
        icon={HeartHandshake}
        editStep={4}
        onEdit={onEdit}
      >
        <div className="space-y-4">
          <TextBlock label="Why do you want to be part of this system?" value={commitment.whyJoin} />
          <Separator />
          <InfoRow
            label="Willing to Commit"
            value={commitmentTypeLabels || undefined}
          />
          {commitment.commitmentTypes?.includes("time") && (
            <InfoRow
              label="Weekly Hours"
              value={toOptionalString(commitment.weeklyHours)}
            />
          )}
        </div>
      </ReviewSection>

      {/* Reality Check Review */}
      <ReviewSection
        title="Reality Check"
        icon={Hammer}
        editStep={5}
        onEdit={onEdit}
      >
        <div className="space-y-4">
          <TextBlock
            label="If you were asked to build something small today in your area of interest, what would you start with?"
            value={realityCheck.firstBuild}
          />
          <Separator />
          <InfoRow
            label="Ready for long-term commitment?"
            value={readyForCommitmentLabel}
          />
        </div>
      </ReviewSection>

      {/* Declaration */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-5 space-y-4">
          <h3 className="font-bold text-base">Declaration & Agreement</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            By submitting this application, I,{" "}
            <strong>
              {pi.first_name} {pi.last_name}
            </strong>
            , hereby certify that all information provided is true, accurate,
            and complete.
          </p>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="declaration"
              className="mt-1 accent-primary"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label
              htmlFor="declaration"
              className="text-sm font-medium cursor-pointer"
            >
              I confirm the above declaration and consent to the verification of
              all information provided.
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-8">
        {onBack ? (
          <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" /> Back to Reality Check
          </Button>
        ) : (
          <Link href="/application/step-5">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" /> Back to Reality Check
            </Button>
          </Link>
        )}
        <Button
          onClick={handleSubmit}
          className="gap-2 font-semibold h-12 px-8 w-full sm:w-auto"
          size="lg"
          disabled={loading || !agreed}
        >
          {loading ? (
            "Submitting..."
          ) : (
            <>
              <Send className="h-4 w-4" /> Submit Application
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
