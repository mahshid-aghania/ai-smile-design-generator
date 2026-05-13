"use client";

import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type LoadingStateProps = {
  active: boolean;
};

export function LoadingState({ active }: LoadingStateProps) {
  if (!active) return null;

  return (
    <Card className="border-[var(--primary)]/25 bg-teal-50/60">
      <CardContent className="flex items-center gap-3 py-4">
        <Loader2 className="size-5 shrink-0 animate-spin text-[var(--primary)]" aria-hidden />
        <p className="text-sm font-medium text-[var(--foreground)]">
          Generating your AI smile preview...
        </p>
      </CardContent>
    </Card>
  );
}
