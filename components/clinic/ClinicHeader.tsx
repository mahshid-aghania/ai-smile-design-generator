"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { CLINIC, NAV_ITEMS } from "@/lib/clinic/content";
import { cn } from "@/lib/utils";

export function ClinicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--clinic-border)] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/clinic/logo.png"
            alt={CLINIC.name}
            width={180}
            height={75}
            className="h-12 w-auto sm:h-14"
            priority
          />
        </Link>

        <a
          href={CLINIC.phoneHref}
          className="hidden items-center gap-2 text-sm font-semibold text-[var(--clinic-navy)] lg:flex"
        >
          <Phone className="size-4 text-[var(--clinic-gold)]" aria-hidden />
          {CLINIC.phone}
        </a>

        <button
          type="button"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--clinic-navy)]"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="clinic-mobile-nav"
        >
          Menu
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <nav
        id="clinic-mobile-nav"
        className={cn(
          "border-t border-[var(--clinic-border)] bg-white lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <ul className="mx-auto max-w-7xl divide-y divide-[var(--clinic-border)] px-4 py-2 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block py-3 text-sm font-medium text-[var(--clinic-navy)]"
                onClick={() => setOpen(false)}
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </Link>
              {"children" in item && item.children && (
                <ul className="mb-2 ml-4 space-y-1 border-l border-[var(--clinic-border)] pl-3">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className="block py-1.5 text-sm text-[var(--clinic-muted)] hover:text-[var(--clinic-gold)]"
                        onClick={() => setOpen(false)}
                        target={child.href.startsWith("http") ? "_blank" : undefined}
                        rel={child.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <a
              href={CLINIC.phoneHref}
              className="flex items-center gap-2 py-3 text-sm font-semibold text-[var(--clinic-gold)]"
            >
              <Phone className="size-4" aria-hidden />
              {CLINIC.phone}
            </a>
          </li>
          <li>
            <Link
              href="/smile-preview"
              className="block py-3 text-sm font-medium text-[var(--clinic-muted)]"
              onClick={() => setOpen(false)}
            >
              AI Smile Preview (demo)
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
