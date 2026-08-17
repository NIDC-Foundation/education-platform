"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createCohort } from "@/lib/supabase/actions";
import { Loader2, Plus } from "lucide-react";

interface Program {
    id: string;
    name: string;
}

interface CreateCohortDialogProps {
    programs: Program[];
}

const READINESS_OPTIONS = ["planned", "review", "live", "closed"];

export function CreateCohortDialog({ programs }: CreateCohortDialogProps) {
    const [open, setOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [phase, setPhase] = useState("");
    const [programId, setProgramId] = useState("none");
    const [fundingReleased, setFundingReleased] = useState("");
    const [readinessStatus, setReadinessStatus] = useState("planned");

    const resetForm = () => {
        setYear(new Date().getFullYear().toString());
        setPhase("");
        setProgramId("none");
        setFundingReleased("");
        setReadinessStatus("planned");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            if (!phase.trim()) {
                throw new Error("Please enter a phase for this cohort.");
            }

            const { error: submitError } = await createCohort({
                year,
                phase,
                programId: programId === "none" ? undefined : programId,
                fundingReleased: fundingReleased || undefined,
                readinessStatus,
            });

            if (submitError) throw new Error(submitError);

            setOpen(false);
            resetForm();
            router.refresh();
        } catch (err) {
            setError((err as Error).message || "Failed to create cohort.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Cohort
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Cohort</DialogTitle>
                        <DialogDescription>
                            Set up a new cohort cycle. You can attach it to a program now or later.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {error && <p className="text-sm font-medium text-destructive">{error}</p>}

                        <div className="space-y-2">
                            <Label htmlFor="year">Year</Label>
                            <Input
                                id="year"
                                type="number"
                                min="2000"
                                max="2100"
                                step="1"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="e.g. 2026"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phase">Phase</Label>
                            <Input
                                id="phase"
                                value={phase}
                                onChange={(e) => setPhase(e.target.value)}
                                placeholder="e.g. Applications open"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="program">Program (Optional)</Label>
                            <Select value={programId} onValueChange={setProgramId}>
                                <SelectTrigger id="program">
                                    <SelectValue placeholder="Select associated program..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {programs.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="readiness">Readiness Status</Label>
                            <Select value={readinessStatus} onValueChange={setReadinessStatus}>
                                <SelectTrigger id="readiness">
                                    <SelectValue placeholder="Select readiness status..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {READINESS_OPTIONS.map((status) => (
                                        <SelectItem key={status} value={status} className="capitalize">
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fundingReleased">Funding Released (₦, Optional)</Label>
                            <Input
                                id="fundingReleased"
                                type="number"
                                min="0"
                                step="1000"
                                value={fundingReleased}
                                onChange={(e) => setFundingReleased(e.target.value)}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Cohort
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
