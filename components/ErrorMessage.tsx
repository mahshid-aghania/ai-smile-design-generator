"use client";

import { AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type ErrorMessageProps = {
  message: string | null;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <Card className="border-red-200 bg-red-50/80">
      <CardContent className="flex gap-3 py-4">
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600" aria-hidden />
        <p className="text-sm text-red-900">{message}</p>
      </CardContent>
    </Card>
  );
}
