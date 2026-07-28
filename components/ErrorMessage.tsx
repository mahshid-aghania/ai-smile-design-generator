"use client";

import { AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type ErrorMessageProps = {
  message: string | null;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <Card
      role="alert"
      aria-live="polite"
      className="mx-auto max-w-xl border-red-200 bg-red-50 shadow-none"
    >
      <CardContent className="flex gap-3 py-4">
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" aria-hidden />
        <p className="text-sm leading-relaxed text-red-900">{message}</p>
      </CardContent>
    </Card>
  );
}
