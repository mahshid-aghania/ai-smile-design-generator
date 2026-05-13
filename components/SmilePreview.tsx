"use client";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SmilePreviewProps = {
  originalSrc: string;
  enhancedSrc: string | null;
};

export function SmilePreview({ originalSrc, enhancedSrc }: SmilePreviewProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[var(--foreground-muted)]">Original</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-slate-50">
            <Image
              src={originalSrc}
              alt="Your captured smile"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-[var(--foreground-muted)]">AI preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-slate-50">
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
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50/40 p-6 text-center text-sm text-[var(--foreground-muted)]">
                Your enhanced smile will appear here after generation.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
