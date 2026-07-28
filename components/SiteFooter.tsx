"use client";

import { MapPin, Phone } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

export function SiteFooter() {
  return (
    <footer className="mt-4 border-t border-[var(--border-subtle)] bg-[var(--surface)]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-5">
          <p className="text-pretty text-xs leading-relaxed text-[var(--foreground-muted)]">
            *Financing available on approved credit. Terms and payments may vary based on treatment
            complexity. Dental implant treatment requires a clinical assessment; individual results
            and eligibility vary.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-[var(--border-subtle)] pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
              Dentin Family Dentistry · Vaughan, ON
            </p>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-[var(--foreground-muted)]">
              <MapPin className="mt-px size-3.5 shrink-0 text-[var(--primary)]" aria-hidden />
              3300 Steeles Ave W Unit #6, Vaughan, ON L4K 2Y4
            </p>
            <p className="text-xs text-[var(--foreground-muted)]">Mon–Sat · 9:00 AM – 9:00 PM</p>
            <a
              href="https://dfdentistry.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-medium text-[var(--primary)] underline-offset-2 hover:underline"
            >
              dfdentistry.ca
            </a>
          </div>

          <a
            href="tel:+14379002200"
            onClick={() => trackEvent("call_click", { location: "footer" })}
            aria-label="Call Dentin Family Dentistry at 437-900-2200"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-semibold text-[var(--primary-hover)] transition-colors hover:bg-[var(--primary-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
          >
            <Phone className="size-4" aria-hidden strokeWidth={2.25} />
            437-900-2200
          </a>
        </div>

        <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--foreground-muted)]/70">
          AI Smile Preview · Collaboration microsite
        </p>
      </div>
    </footer>
  );
}
