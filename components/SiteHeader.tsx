"use client";

import { useEffect, useState } from "react";
import { Phone, Sparkles } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [compressed, setCompressed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompressed(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-[var(--surface)]/85 backdrop-blur-xl transition-all duration-300",
        compressed
          ? "border-[var(--border-subtle)] shadow-[0_1px_16px_-8px_rgba(15,43,49,0.25)]"
          : "border-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6",
          compressed ? "py-2.5 sm:py-3" : "py-3.5 sm:py-5"
        )}
      >
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-[0_6px_16px_-6px_rgba(13,148,136,0.6)] transition-all duration-300",
              compressed ? "size-8" : "size-9 sm:size-10"
            )}
            aria-hidden
          >
            <Sparkles className="size-[17px]" strokeWidth={2.25} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-[var(--foreground)] sm:text-base">
              Dentin Family Dentistry
            </p>
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--primary)] sm:text-[11px] sm:tracking-[0.2em]">
              AI Smile Preview
              <span className="hidden xs:inline"> · Vaughan, ON</span>
            </p>
          </div>
        </div>

        <a
          href="tel:+14379002200"
          onClick={() => trackEvent("call_click", { location: "header" })}
          aria-label="Call Dentin Family Dentistry at 437-900-2200"
          className={cn(
            "inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--primary)] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(13,148,136,0.6)] transition-all duration-200 hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
            compressed ? "h-9 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm" : "h-10 px-3.5 text-xs sm:h-11 sm:px-5 sm:text-sm"
          )}
        >
          <Phone className="size-4 shrink-0" aria-hidden strokeWidth={2.25} />
          <span className="hidden sm:inline">437-900-2200</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  );
}
