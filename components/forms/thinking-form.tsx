"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Save, Info } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveApplicationStep } from "@/lib/supabase/actions";

interface ThinkingFormProps {
  application: Record<string, unknown>;
  onNext?: () => void;
  onBack?: () => void;
}

type SavedThinking = Partial<{
  biggestProblem: string;
  recentGrowth: string;
}>;

export function ThinkingForm({ application, onNext, onBack }: ThinkingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const thinking = (application?.essays || {}) as SavedThinking;

  const handleSave = async (
    e: React.FormEvent | React.MouseEvent<HTMLButtonElement>,
    isNext = false
  ) => {
    e.preventDefault();
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
      const thinkingResponses = {
        biggestProblem: getString("biggestProblem"),
        recentGrowth: getString("recentGrowth"),
      };
      const { error } = await saveApplicationStep(3, thinkingResponses, isNext);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Progress saved");
      if (isNext) {
        if (onNext) onNext();
        else router.push("/application/step-4");
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
              Answer honestly and in your own words.
            </p>
          </div>

          <div className="p-5 space-y-7">
            {/* Biggest problem */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  National Outlook
                </span>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="biggestProblem" className="text-xs">
                  What do you think is the biggest problem holding back capable
                  people in Nigeria? *
                </Label>
                <Textarea
                  id="biggestProblem"
                  name="biggestProblem"
                  defaultValue={thinking.biggestProblem || ""}
                  className="min-h-[140px] resize-y text-sm leading-relaxed"
                  required
                />
              </div>
            </div>

            {/* Recent growth */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Personal Growth
                </span>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="recentGrowth" className="text-xs">
                  What have you done in the last 6–12 months to improve
                  yourself? *
                </Label>
                <Textarea
                  id="recentGrowth"
                  name="recentGrowth"
                  defaultValue={thinking.recentGrowth || ""}
                  className="min-h-[140px] resize-y text-sm leading-relaxed"
                  required
                />
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
                <Link href="/application/step-2">
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
