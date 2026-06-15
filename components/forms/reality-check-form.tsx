"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Save, Info } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveApplicationStep } from "@/lib/supabase/actions";

interface RealityCheckFormProps {
  application: Record<string, unknown>;
  onNext?: () => void;
  onBack?: () => void;
}

type SavedRealityCheck = Partial<{
  firstBuild: string;
  readyForCommitment: "yes" | "no";
}>;

export function RealityCheckForm({ application, onNext, onBack }: RealityCheckFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const saved = (application?.reality_check || {}) as SavedRealityCheck;
  const [readyForCommitment, setReadyForCommitment] = useState(
    saved.readyForCommitment || ""
  );

  const handleSave = async (
    e: React.FormEvent | React.MouseEvent<HTMLButtonElement>,
    isNext = false
  ) => {
    e.preventDefault();

    if (isNext && !readyForCommitment) {
      toast.error("Please let us know if you're prepared for this commitment.");
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
      const realityCheck: SavedRealityCheck = {
        firstBuild: getString("firstBuild"),
      };
      if (readyForCommitment) {
        realityCheck.readyForCommitment = readyForCommitment as "yes" | "no";
      }
      const { error } = await saveApplicationStep(5, realityCheck, isNext);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Progress saved");
      if (isNext) {
        if (onNext) onNext();
        else router.push("/application/step-6");
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
            {/* First build */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  In Practice
                </span>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="firstBuild" className="text-xs">
                  If you were asked to build something small today in your area
                  of interest, what would you start with? *
                </Label>
                <Textarea
                  id="firstBuild"
                  name="firstBuild"
                  defaultValue={saved.firstBuild || ""}
                  className="min-h-[140px] resize-y text-sm leading-relaxed"
                  required
                />
              </div>
            </div>

            {/* Commitment confirmation */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Commitment Check
                </span>
              </div>
              <div className="space-y-2.5">
                <Label className="text-xs">
                  This system requires consistency and long-term commitment. Are
                  you prepared for that? *
                </Label>
                <RadioGroup
                  value={readyForCommitment}
                  onValueChange={(value) =>
                    setReadyForCommitment(value as "yes" | "no")
                  }
                  className="gap-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <RadioGroupItem value="yes" id="readyForCommitment-yes" />
                    <Label
                      htmlFor="readyForCommitment-yes"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RadioGroupItem value="no" id="readyForCommitment-no" />
                    <Label
                      htmlFor="readyForCommitment-no"
                      className="text-sm font-normal cursor-pointer"
                    >
                      No
                    </Label>
                  </div>
                </RadioGroup>
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
                <Link href="/application/step-4">
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
