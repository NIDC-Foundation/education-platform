import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";

// Reads as a single-direction pipeline (draft -> submitted -> under_review ->
// shortlisted -> interview_stage -> accepted), plus a negative terminal state
// (rejected). Adjacent stages intentionally share a tone rather than each
// getting a unique hue that would need reinventing in dark mode — see
// ui-registry.md. The label text differentiates neighboring stages; the tone
// signals which broad phase the application is in.
export const applicationStatusConfig: Record<ApplicationStatus, { label: string; className: string; dotColor: string }> = {
    draft: {
        label: "Draft",
        className: "bg-muted text-muted-foreground border-border",
        dotColor: "bg-muted-foreground",
    },
    submitted: {
        label: "Submitted",
        className: "bg-secondary text-secondary-foreground border-transparent",
        dotColor: "bg-secondary-foreground",
    },
    under_review: {
        label: "Under Review",
        className: "bg-secondary text-secondary-foreground border-transparent",
        dotColor: "bg-secondary-foreground",
    },
    shortlisted: {
        label: "Shortlisted",
        className: "bg-primary/10 text-primary border-primary/20 dark:bg-primary/20",
        dotColor: "bg-primary",
    },
    interview_stage: {
        label: "Interview Stage",
        className: "bg-primary/10 text-primary border-primary/20 dark:bg-primary/20",
        dotColor: "bg-primary",
    },
    accepted: {
        label: "Accepted",
        className: "bg-primary text-primary-foreground border-transparent",
        dotColor: "bg-primary-foreground",
    },
    rejected: {
        label: "Rejected",
        className: "bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20",
        dotColor: "bg-destructive",
    },
};

interface ApplicationStatusBadgeProps {
    status: ApplicationStatus;
    className?: string;
    showDot?: boolean;
}

export function ApplicationStatusBadge({ status, className, showDot = true }: ApplicationStatusBadgeProps) {
    const config = applicationStatusConfig[status];
    if (!config) return null;
    return (
        <span className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
            config.className,
            className
        )}>
            {showDot && <span className={cn("h-1.5 w-1.5 rounded-full", config.dotColor)} />}
            {config.label}
        </span>
    );
}
