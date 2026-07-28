"use client";

import { cn } from "@/lib/utils";

type WizardHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  className?: string;
  as?: "h1" | "h2";
};

export function WizardHero({ eyebrow, title, subtitle, className, as: Heading = "h1" }: WizardHeroProps) {
  return (
    <div className={cn("space-y-4 text-center", className)}>
      {eyebrow ? (
        <p className="inline-flex items-center rounded-full border border-[var(--primary)]/25 bg-[var(--primary-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--primary-hover)] sm:text-[11px]">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="font-display text-balance text-3xl font-normal tracking-tight text-[var(--foreground)] sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
        {title}
      </Heading>
      <p className="mx-auto max-w-lg text-pretty text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}
