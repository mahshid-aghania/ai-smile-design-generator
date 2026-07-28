"use client";

import Image from "next/image";
import { Check, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const BULLETS = [
  "Natural appearance and function",
  "Advanced 3D digital planning",
  "Ideal for missing teeth or denture wearers",
  "Flexible financing, no hidden fees",
] as const;

const IMPLANT_PARTS = ["Crown", "Abutment", "Titanium Post"] as const;

export function FinancingPromoBanner() {
  return (
    <section
      aria-label="Limited-time dental implant financing offer"
      className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-[var(--shadow-lift)]"
    >
      {/* Soft clinical wash */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--primary-soft)] via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative grid gap-10 px-6 py-9 sm:px-10 sm:py-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12">
        <div className="space-y-6">
          {/* Badge */}
          <p className="inline-flex items-center rounded-full border border-[var(--primary)]/25 bg-[var(--primary-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--primary-hover)]">
            Limited-Time Offer
          </p>

          {/* Headline + subheadline */}
          <div className="space-y-3">
            <h1 className="font-display text-balance text-[2rem] font-normal leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-4xl md:text-[2.75rem]">
              Dental Implants from $299/month
            </h1>
            <p className="text-pretty text-base font-semibold text-[var(--primary-hover)] sm:text-lg">
              Only $500 down payment · 12-month financing on approved credit
            </p>
          </div>

          {/* Benefit checklist */}
          <ul className="grid gap-2.5 sm:grid-cols-2" role="list">
            {BULLETS.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--foreground-muted)]"
              >
                <span
                  className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)]"
                  aria-hidden
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href="tel:+14379002200"
                onClick={() => trackEvent("call_click", { location: "hero" })}
                aria-label="Call Dentin Family Dentistry at 437-900-2200"
              >
                <Phone className="size-4" aria-hidden strokeWidth={2.25} />
                Call 437-900-2200
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <a href="#smile-wizard" onClick={() => trackEvent("scroll_to_wizard")}>
                See Your New Smile →
              </a>
            </Button>
          </div>

          {/* Practice attribution */}
          <p className="text-xs font-medium tracking-wide text-[var(--foreground-muted)]">
            Dentin Family Dentistry · Vaughan, ON ·{" "}
            <a
              href="https://dfdentistry.ca"
              className="text-[var(--primary)] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              dfdentistry.ca
            </a>
          </p>

          {/* Fine print */}
          <p className="text-[11px] leading-relaxed text-[var(--foreground-muted)]/80">
            *Financing available on approved credit. Terms and payments may vary based on treatment
            complexity.
          </p>
        </div>

        {/* Implant diagram */}
        <figure className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]">
            <Image
              src="/dental-implant-diagram.png"
              alt="3D illustration of a dental implant showing the ceramic crown, abutment connector and threaded titanium post anchored in the jawbone"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-contain p-2"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-muted)]">
            {IMPLANT_PARTS.map((part, i) => (
              <span key={part} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-[var(--primary)]/50">·</span>}
                {part}
              </span>
            ))}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
