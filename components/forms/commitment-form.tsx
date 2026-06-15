"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Save, Info } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveApplicationStep } from "@/lib/supabase/actions";
import { commitmentOptions } from "@/constants/application";

interface CommitmentFormProps {
  application: Record<string, unknown>;
  onNext?: () => void;
  onBack?: () => void;
}

type SavedCommitment = Partial<{
  whyJoin: string;
  commitmentTypes: string[];
  weeklyHours: string;
}>;

export function CommitmentForm({ application, onNext, onBack }: CommitmentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const saved = (application?.commitment || {}) as SavedCommitment;
  const [commitmentTypes, setCommitmentTypes] = useState<string[]>(
    saved.commitmentTypes || []
  );
  const [weeklyHours, setWeeklyHours] = useState(saved.weeklyHours || "");

  const toggleCommitmentType = (value: string, checked: boolean) => {
    setCommitmentTypes((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSave = async (
    e: React.FormEvent | React.MouseEvent<HTMLButtonElement>,
    isNext = false
  ) => {
    e.preventDefault();

    if (isNext && commitmentTypes.length === 0) {
      toast.error("Select at least one commitment.");
      return;
    }

    setLoading(true);
    try {
      const form = formRef.current;
      if (!form) {
        toast.error("Unable to save at the moment.");
        return;
      }
      const formData = new FormData(form);
      const getString = (key: string) => {
        const value = formData.get(key);
        return typeof value === "string" ? value.trim() : "";
      };
      const commitment: SavedCommitment = {
        whyJoin: getString("whyJoin"),
        commitmentTypes,
      };
      if (commitmentTypes.includes("time")) {
        commitment.weeklyHours = weeklyHours.trim();
      }
      const { error } = await saveApplicationStep(4, commitment, isNext);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Progress saved");
      if (isNext) {
        if (onNext) onNext();
        else router.push("/application/step-5");
      }
      else router.refresh();
    } catch {
      toast.error("Failed to save progress. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <form ref={formRef} onSubmit={(e) => handleSave(e, true)}>
        <div className="border border-border/50 rounded-xl overflow-hidden">
          {/* Info banner */}
          <div className="flex items-center gap-2.5 px-5 py-3 bg-muted/30 border-b border-border/50">
            <Info className="h-3.5 w-3.5 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">
              All fields marked * are required.
            </p>
          </div>

          <div className="p-5 space-y-7">
            {/* Why join */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Motivation
                </span>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="whyJoin" className="text-xs">
                  Why do you want to be part of this system? *
                </Label>
                <Textarea
                  id="whyJoin"
                  name="whyJoin"
                  defaultValue={saved.whyJoin || ""}
                  className="min-h-[140px] resize-y text-sm leading-relaxed"
                  required
                />
              </div>
            </div>

            {/* Commitment */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Commitment
                </span>
              </div>
              <div className="space-y-3">
                <Label className="text-xs">
                  If selected, what are you willing to commit? *
                </Label>
                <div className="space-y-2.5">
                  {commitmentOptions.map((option) => (
                    <div key={option.value} className="flex items-center gap-2.5">
                      <Checkbox
                        id={`commitment-${option.value}`}
                        checked={commitmentTypes.includes(option.value)}
                        onCheckedChange={(checked) =>
                          toggleCommitmentType(option.value, checked === true)
                        }
                      />
                      <Label
                        htmlFor={`commitment-${option.value}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>

                {commitmentTypes.includes("time") && (
                  <div className="space-y-1.5 sm:max-w-xs pt-2">
                    <Label htmlFor="weeklyHours" className="text-xs">
                      How many hours per week can you commit? *
                    </Label>
                    <Input
                      id="weeklyHours"
                      name="weeklyHours"
                      type="text"
                      inputMode="numeric"
                      value={weeklyHours}
                      onChange={(e) => setWeeklyHours(e.target.value)}
                      placeholder="e.g. 10"
                      className="h-9 text-sm"
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border/50 bg-muted/20">
            <div className="flex gap-2">
              {onBack ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-md"
                  onClick={onBack}
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </Button>
              ) : (
                <Link href="/application/step-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-md"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </Button>
                </Link>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-2 rounded-md"
                onClick={(e) => handleSave(e, false)}
                disabled={loading}
              >
                <Save className="h-3.5 w-3.5" /> Save
              </Button>
            </div>
            <Button
              type="submit"
              size="sm"
              className="gap-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save & Continue"}{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
