"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { TreatmentId } from "@/lib/treatment-prompts";
import { TREATMENT_IDS, TREATMENT_LABELS } from "@/lib/treatment-prompts";

type TreatmentSelectorProps = {
  value: TreatmentId;
  onChange: (value: TreatmentId) => void;
  disabled?: boolean;
};

export function TreatmentSelector({ value, onChange, disabled }: TreatmentSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base">Treatment option</Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as TreatmentId)}
        disabled={disabled}
        className="grid gap-3"
      >
        {TREATMENT_IDS.map((id) => (
          <label
            key={id}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--border)] bg-white p-3 shadow-sm transition hover:border-[var(--primary)]/40 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60"
          >
            <RadioGroupItem value={id} id={id} className="mt-1" />
            <div className="space-y-0.5">
              <span className="text-sm font-medium text-[var(--foreground)]">
                {TREATMENT_LABELS[id]}
              </span>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
