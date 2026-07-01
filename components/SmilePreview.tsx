"use client";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SmilePreviewProps = {
  originalSrc: string;
  enhancedSrc: string | null;
  belowOriginal?: React.ReactNode;
};

export function SmilePreview({ originalSrc, enhancedSrc, belowOriginal }: SmilePreviewProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
      <Card className="overflow-hidden border-blue-100">
        <CardHeader>
          <CardTitle className="text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
            Original
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-slate-50">
            <Image
              src={originalSrc}
              alt="Your captured smile"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {belowOriginal ? <div className="w-full">{belowOriginal}</div> : null}
        </CardContent>
      </Card>
      <Card className="overflow-hidden border-blue-100">
        <CardHeader>
          <CardTitle className="text-xs font-medium uppercase tracking-[0.2em] text-blue-500">
            AI Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-slate-50">
            {enhancedSrc ? (
              <Image
                src={enhancedSrc}
                alt="AI enhanced smile preview"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-6 text-center text-sm leading-relaxed text-[var(--foreground-muted)]">
                Your enhanced smile will appear here after you generate.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
