"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ArrowRight, Camera, Check, ImageUp, RotateCcw } from "lucide-react";

import { CameraCapture } from "@/components/CameraCapture";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MAX_BYTES = 12 * 1024 * 1024;

const GUIDELINES = [
  "Face the camera straight on, in even lighting",
  "Smile naturally so your front teeth are visible",
  "Keep your whole mouth in frame — no filters",
] as const;

type PhotoStepProps = {
  /** Confirmed photo, if the user already picked one. */
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  onConfirm: () => void;
  onError: (message: string) => void;
};

type Mode = "choose" | "camera";

export function PhotoStep({ value, onChange, onConfirm, onError }: PhotoStepProps) {
  const [mode, setMode] = useState<Mode>("choose");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        onError("That file isn't an image. Please choose a JPG, PNG, or HEIC photo.");
        return;
      }
      if (file.size > MAX_BYTES) {
        onError("That image is larger than 12 MB. Please choose a smaller photo.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onChange(reader.result);
          setMode("choose");
        } else {
          onError("Could not read that image. Please try another file.");
        }
      };
      reader.onerror = () => onError("Could not read that image. Please try another file.");
      reader.readAsDataURL(file);
    },
    [onChange, onError]
  );

  const handleCapture = useCallback(
    (dataUrl: string) => {
      onChange(dataUrl);
      setMode("choose");
    },
    [onChange]
  );

  const reset = useCallback(() => {
    onChange(null);
    setMode("choose");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [onChange]);

  if (mode === "camera") {
    return (
      <CameraCapture
        onCapture={handleCapture}
        onError={(m) => {
          setMode("choose");
          onError(m);
        }}
        onCancel={() => setMode("choose")}
      />
    );
  }

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-semibold tracking-tight">Add your smile photo</CardTitle>
        <CardDescription>
          Use your camera or upload an existing photo. A clear, front-facing smile gives the best
          preview.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {value ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--primary-soft)]/50 p-4 sm:flex-row sm:items-center">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)]">
                <Image
                  src={value}
                  alt="Preview of the smile photo you selected"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)]">
                  <Check className="size-4 text-[var(--primary)]" aria-hidden strokeWidth={3} />
                  Photo ready
                </p>
                <p className="text-pretty text-xs leading-relaxed text-[var(--foreground-muted)]">
                  Make sure your teeth are clearly visible, then continue to generate your preview.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Button type="button" size="lg" className="w-full sm:flex-1" onClick={onConfirm}>
                Continue
                <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={reset}
              >
                <RotateCcw className="size-4" aria-hidden />
                Change photo
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <ul className="space-y-2" role="list">
              {GUIDELINES.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--foreground-muted)]"
                >
                  <span
                    className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)]"
                    aria-hidden
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {tip}
                </li>
              ))}
            </ul>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                size="lg"
                className="h-auto w-full flex-col gap-1.5 py-4"
                onClick={() => setMode("camera")}
              >
                <Camera className="size-5" aria-hidden />
                Use camera
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-auto w-full flex-col gap-1.5 py-4"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageUp className="size-5" aria-hidden />
                Upload photo
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              aria-label="Upload a smile photo"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
