"use client";

import { AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type ErrorMessageProps = {
  message: string | null;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <Card className="border-red-500/30 bg-red-950/35 shadow-[0_0_24px_-8px_rgba(239,68,68,0.2)]">
      <CardContent className="flex gap-3 py-4">
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400" aria-hidden />
        <p className="text-sm leading-relaxed text-red-100/95">{message}</p>
      </CardContent>
    </Card>
  );
}
