"use client";

import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type LoadingStateProps = {
  active: boolean;
};

export function LoadingState({ active }: LoadingStateProps) {
  if (!active) return null;

  return (
    <Card className="border-emerald-500/25 bg-emerald-500/[0.06] shadow-[0_0_32px_-12px_rgba(16,185,129,0.25)]">
      <CardContent className="flex items-center gap-3 py-4">
        <Loader2 className="size-5 shrink-0 animate-spin text-emerald-400" aria-hidden />
        <p className="text-sm font-medium text-[var(--foreground)]">
          Generating your AI smile preview...
        </p>
      </CardContent>
    </Card>
  );
}
