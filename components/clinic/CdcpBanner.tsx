"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { CLINIC } from "@/lib/clinic/content";

export function CdcpBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("cdcp-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-[var(--clinic-border)] bg-white p-5 shadow-2xl sm:bottom-6 sm:right-6"
      role="dialog"
      aria-labelledby="cdcp-title"
    >
      <button
        type="button"
        className="absolute right-2 top-2 rounded-full bg-[var(--clinic-navy)] p-1 text-white"
        onClick={() => {
          sessionStorage.setItem("cdcp-dismissed", "1");
          setVisible(false);
        }}
        aria-label="Close"
      >
        <X className="size-4" />
      </button>
      <h2 id="cdcp-title" className="pr-8 text-lg font-bold text-[var(--clinic-navy)]">
        Canadian Dental Care Plan (CDCP)
      </h2>
      <p className="mt-2 text-sm font-bold uppercase text-[var(--clinic-text)]">
        We are accepting Canadian Dental Care Plan
      </p>
      <p className="mt-2 text-sm">
        <Link href={CLINIC.external.cdcp} className="clinic-link font-medium" target="_blank">
          Click Here
        </Link>{" "}
        to learn more!
      </p>
    </div>
  );
}
