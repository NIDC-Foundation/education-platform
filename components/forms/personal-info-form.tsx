"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, Save, ArrowRight } from "lucide-react";
import { currentStatusOptions } from "@/constants/application";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveApplicationStep } from "@/lib/supabase/actions";

interface PersonalInfoFormProps {
  application: Record<string, unknown>;
  profile: Record<string, unknown>;
  onNext?: () => void;
}

type SavedPersonalInfo = Partial<{
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  currentStatus: string;
}>;

type ApplicantProfile = Partial<
  Record<"first_name" | "last_name" | "email" | "phone", string | null>
>;

export function PersonalInfoForm({
  application,
  profile,
  onNext,
}: PersonalInfoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const pi = (application?.personal_info || {}) as SavedPersonalInfo;
  const profileData = profile as ApplicantProfile;
  const defaultFullName =
    pi.fullName ||
    [profileData.first_name, profileData.last_name].filter(Boolean).join(" ");

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
      const personalInfo = {
        fullName: getString("fullName"),
        email: pi.email || profileData.email || "",
        phone: getString("phone"),
        city: getString("city"),
        country: getString("country"),
        currentStatus: getString("currentStatus"),
      };
      const { error } = await saveApplicationStep(1, personalInfo, isNext);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Progress saved");
      if (isNext) {
        if (onNext) onNext();
        else router.push("/application/step-2");
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
            {/* Basic Details */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Basic Details
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="fullName" className="text-xs">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    className="h-9 text-sm"
                    defaultValue={defaultFullName}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-9 text-sm"
                    defaultValue={pi.email || profileData.email || ""}
                    disabled
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="h-9 text-sm"
                    defaultValue={pi.phone || profileData.phone || ""}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Current Location */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Current Location
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="city" className="text-xs">
                    City *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    className="h-9 text-sm"
                    defaultValue={pi.city || ""}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="country" className="text-xs">
                    Country *
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    className="h-9 text-sm"
                    defaultValue={pi.country || ""}
                    placeholder="Country"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Current Status
                </span>
              </div>
              <div className="space-y-1.5 sm:max-w-xs">
                <Label htmlFor="currentStatus" className="text-xs">
                  What best describes you right now? *
                </Label>
                <Select name="currentStatus" defaultValue={pi.currentStatus}>
                  <SelectTrigger id="currentStatus" className="h-9 text-sm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border/50 bg-muted/20">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 rounded-md"
              onClick={(e) => handleSave(e, false)}
              disabled={loading}
            >
              <Save className="h-3.5 w-3.5" /> Save Progress
            </Button>
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
