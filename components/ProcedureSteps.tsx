"use client";

import { Fragment } from "react";

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
 * Horizontal step indicator: emerald accent on the active step, muted zinc for others.
 */
export function ProcedureSteps({ currentStep, className }: ProcedureStepsProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-lg px-2", className)}
      role="list"
      aria-label="Smile preview steps"
    >
      <div className="flex w-full items-start">
        {STEPS.map((step, index) => {
          const isComplete = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isActive = isComplete || isCurrent;

          return (
            <Fragment key={step.id}>
              {index > 0 && (
                <div
                  className={cn(
                    "mt-[18px] h-px min-w-[8px] flex-1 sm:mt-5",
                    currentStep > index ? "bg-emerald-500/40" : "bg-zinc-800"
                  )}
                  aria-hidden
                />
              )}
              <div className="flex w-14 shrink-0 flex-col items-center gap-2 sm:w-16">
                <div
                  role="listitem"
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold tabular-nums transition-colors sm:size-10 sm:text-sm",
                    isCurrent &&
                      "border-emerald-400 text-emerald-300 shadow-[0_0_20px_-6px_rgba(52,211,153,0.45)]",
                    isComplete && !isCurrent && "border-emerald-500/35 bg-emerald-500/15 text-emerald-400/90",
                    !isActive && "border-zinc-700 bg-zinc-900/80 text-zinc-500"
                  )}
                >
                  {step.id}
                </div>
                <span
                  className={cn(
                    "max-w-[5.5rem] text-center text-[10px] font-medium uppercase tracking-[0.12em] sm:text-[11px] sm:tracking-[0.14em]",
                    isCurrent && "text-emerald-400",
                    isComplete && !isCurrent && "text-emerald-500/70",
                    !isActive && "text-zinc-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
