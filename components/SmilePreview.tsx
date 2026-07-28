"use client";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SmilePreviewProps = {
  originalSrc: string;
  enhancedSrc: string | null;
  /** Rendered directly under the original photo (e.g. Generate button). */
  belowOriginal?: React.ReactNode;
};

export function SmilePreview({ originalSrc, enhancedSrc, belowOriginal }: SmilePreviewProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
            Before
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]">
            <Image
              src={originalSrc}
              alt="Your original smile photo"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {belowOriginal ? <div className="w-full">{belowOriginal}</div> : null}
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-[var(--border)]">
        <CardHeader>
          <CardTitle className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
            After · AI preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]">
            {enhancedSrc ? (
              <Image
                src={enhancedSrc}
                alt="AI generated preview of your enhanced smile"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--primary-soft)]/50 p-6 text-center text-sm leading-relaxed text-[var(--foreground-muted)]">
                Your enhanced smile will appear here after you generate.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
