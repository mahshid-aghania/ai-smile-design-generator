"use client";

import { Fragment } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1 as const, label: "Your Info" },
  { id: 2 as const, label: "Treatment" },
  { id: 3 as const, label: "Photo" },
  { id: 4 as const, label: "Preview" },
];

export type ProcedureStepId = (typeof STEPS)[number]["id"];

type ProcedureStepsProps = {
  currentStep: ProcedureStepId;
  className?: string;
};

/**
 * Numbered 1–4 progress indicator: teal accent on active/complete steps.
 */
export function ProcedureSteps({ currentStep, className }: ProcedureStepsProps) {
  return (
    <div className={cn("mx-auto w-full max-w-lg px-2", className)}>
      <ol className="flex w-full items-start" aria-label="Smile preview steps">
        {STEPS.map((step, index) => {
          const isComplete = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isActive = isComplete || isCurrent;

          return (
            <Fragment key={step.id}>
              {index > 0 && (
                <div
                  className={cn(
                    "mt-[18px] h-0.5 min-w-[8px] flex-1 rounded-full transition-colors sm:mt-5",
                    currentStep > index ? "bg-[var(--primary)]" : "bg-[var(--border-subtle)]"
                  )}
                  aria-hidden
                />
              )}
              <li
                className="flex w-16 shrink-0 flex-col items-center gap-2 sm:w-20"
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold tabular-nums transition-all sm:size-10 sm:text-sm",
                    isCurrent &&
                      "border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_8px_18px_-8px_rgba(13,148,136,0.7)]",
                    isComplete &&
                      !isCurrent &&
                      "border-[var(--primary)]/40 bg-[var(--primary-soft)] text-[var(--primary-hover)]",
                    !isActive &&
                      "border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--foreground-muted)]/70"
                  )}
                >
                  {isComplete && !isCurrent ? (
                    <>
                      <Check className="size-4" aria-hidden strokeWidth={3} />
                      <span className="sr-only">Completed</span>
                    </>
                  ) : (
                    step.id
                  )}
                </span>
                <span
                  className={cn(
                    "max-w-[5.5rem] text-center text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-[11px]",
                    isCurrent && "text-[var(--primary-hover)]",
                    isComplete && !isCurrent && "text-[var(--primary)]",
                    !isActive && "text-[var(--foreground-muted)]/70"
                  )}
                >
                  {step.label}
                </span>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}
