"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { PatientIntake } from "@/lib/patient-intake";

type PatientInfoFormProps = {
  value: PatientIntake;
  onChange: (next: PatientIntake) => void;
  disabled?: boolean;
};

export function PatientInfoForm({ value, onChange, disabled }: PatientInfoFormProps) {
  const patch = (partial: Partial<PatientIntake>) => {
    onChange({ ...value, ...partial });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="patient-name">Full name</Label>
          <Input
            id="patient-name"
            name="fullName"
            autoComplete="name"
            placeholder="Jane Doe"
            value={value.fullName}
            onChange={(e) => patch({ fullName: e.target.value })}
            disabled={disabled}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patient-email">Email</Label>
          <Input
            id="patient-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={value.email}
            onChange={(e) => patch({ email: e.target.value })}
            disabled={disabled}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patient-phone">Phone</Label>
          <Input
            id="patient-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            value={value.phone}
            onChange={(e) => patch({ phone: e.target.value })}
            disabled={disabled}
            required
          />
        </div>
      </div>
      <p className="text-xs leading-relaxed text-[var(--foreground-muted)]">
        Demo only: sample intake for prototyping. This starter app does not save your details unless
        you wire up a webhook (see README).
      </p>
    </div>
  );
}
