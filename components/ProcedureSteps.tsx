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
                    currentStep > index ? "bg-blue-300" : "bg-slate-200"
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
                    isCurrent && "border-blue-500 bg-blue-50 text-blue-700 shadow-[0_0_16px_-4px_rgba(59,130,246,0.4)]",
                    isComplete && !isCurrent && "border-blue-300 bg-blue-50 text-blue-500",
                    !isActive && "border-slate-200 bg-white text-slate-400"
                  )}
                >
                  {step.id}
                </div>
                <span
                  className={cn(
                    "max-w-[5.5rem] text-center text-[10px] font-medium uppercase tracking-[0.12em] sm:text-[11px] sm:tracking-[0.14em]",
                    isCurrent && "text-blue-600",
                    isComplete && !isCurrent && "text-blue-400",
                    !isActive && "text-slate-400"
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
