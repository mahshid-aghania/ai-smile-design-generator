"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { TreatmentId } from "@/lib/treatment-prompts";
import { TREATMENT_DESCRIPTIONS, TREATMENT_IDS, TREATMENT_LABELS } from "@/lib/treatment-prompts";

type TreatmentSelectorProps = {
  value: TreatmentId;
  onChange: (value: TreatmentId) => void;
  disabled?: boolean;
};

export function TreatmentSelector({ value, onChange, disabled }: TreatmentSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">Choose a treatment direction</legend>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as TreatmentId)}
        disabled={disabled}
        className="grid gap-3"
      >
        {TREATMENT_IDS.map((id) => (
          <label
            key={id}
            htmlFor={id}
            className="flex min-h-14 cursor-pointer items-start gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 transition-all duration-200 hover:border-[var(--primary)]/40 hover:bg-[var(--primary-soft)]/40 has-[:checked]:border-[var(--primary)] has-[:checked]:bg-[var(--primary-soft)]/60 has-[:checked]:shadow-[0_8px_20px_-14px_rgba(13,148,136,0.7)] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45"
          >
            <RadioGroupItem value={id} id={id} className="mt-0.5" />
            <span className="space-y-0.5">
              <span className="block text-sm font-semibold text-[var(--foreground)]">
                {TREATMENT_LABELS[id]}
              </span>
              <span className="block text-xs leading-relaxed text-[var(--foreground-muted)]">
                {TREATMENT_DESCRIPTIONS[id]}
              </span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
