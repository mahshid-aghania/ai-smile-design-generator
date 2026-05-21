"use client";

import { cn } from "@/lib/utils";

type WizardHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  className?: string;
};

export function WizardHero({ eyebrow, title, subtitle, className }: WizardHeroProps) {
  return (
    <div className={cn("space-y-4 text-center", className)}>
      {eyebrow ? (
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-emerald-400/90 sm:text-[11px]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-balance text-3xl font-normal tracking-tight text-[var(--foreground)] sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
        {title}
      </h1>
      <p className="mx-auto max-w-lg text-pretty text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}
