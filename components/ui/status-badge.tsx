import { cn } from "@/lib/utils";

export type BadgeStatus =
    | "active"
    | "inactive"
    | "pending"
    | "submitted"
    | "draft"
    | "verified"
    | "approved"
    | "rejected"
    | "expiring"
    | "flagged"
    | "completed"
    | "in-progress"
    | "upcoming"
    | "archived"
    | "closed"
    | "graduated"
    | "suspended"
    | "scheduled"
    | "processing";

interface StatusBadgeProps {
    status: BadgeStatus;
    className?: string;
}

// Four token-driven tones, reused across every status. Statuses that mean the
// same thing (a good outcome, an in-progress state, a dormant record, a
// negative outcome) share a tone rather than each getting a unique hue — the
// label text is what tells adjacent statuses apart, not color alone. See
// ui-registry.md for the full rationale (chart-N tokens are not used here
// because they intentionally rotate hue between light/dark mode for chart
// variety, which breaks a fixed status meaning).
const positiveTone = "bg-primary/10 text-primary dark:bg-primary/20";
const progressTone = "bg-secondary text-secondary-foreground";
const negativeTone = "bg-destructive/10 text-destructive dark:bg-destructive/20";
const dormantTone = "bg-muted text-muted-foreground";

const statusConfig: Record<BadgeStatus, { label: string; className: string }> = {
    active: { label: "Active", className: positiveTone },
    verified: { label: "Verified", className: positiveTone },
    approved: { label: "Approved", className: positiveTone },
    completed: { label: "Completed", className: positiveTone },
    graduated: { label: "Graduated", className: positiveTone },

    pending: { label: "Pending Review", className: progressTone },
    submitted: { label: "Submitted", className: progressTone },
    "in-progress": { label: "In Progress", className: progressTone },
    upcoming: { label: "Upcoming", className: progressTone },
    scheduled: { label: "Scheduled", className: progressTone },
    processing: { label: "Processing", className: progressTone },

    rejected: { label: "Rejected", className: negativeTone },
    expiring: { label: "Expiring", className: negativeTone },
    flagged: { label: "Flagged", className: negativeTone },
    suspended: { label: "Suspended", className: negativeTone },

    inactive: { label: "Inactive", className: dormantTone },
    draft: { label: "Draft", className: dormantTone },
    archived: { label: "Archived", className: dormantTone },
    closed: { label: "Closed", className: dormantTone },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status];

    if (!config) return null;

    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                config.className,
                className
            )}
        >
            {config.label}
        </span>
    );
}
