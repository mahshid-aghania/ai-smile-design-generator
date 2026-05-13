"use client";

import { useCallback, useState } from "react";
import { Camera, Sparkles } from "lucide-react";

import { CameraCapture } from "@/components/CameraCapture";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingState } from "@/components/LoadingState";
import { SmilePreview } from "@/components/SmilePreview";
import { TreatmentSelector } from "@/components/TreatmentSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { TreatmentId } from "@/lib/treatment-prompts";

export default function Home() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);
  const [treatmentId, setTreatmentId] = useState<TreatmentId>("natural_smile_enhancement");
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useConsistentSeed, setUseConsistentSeed] = useState(false);

  const openCamera = useCallback(() => {
    setError(null);
    setEnhancedUrl(null);
    setCameraOpen(true);
  }, []);

  const handleCapture = useCallback((dataUrl: string) => {
    setCaptured(dataUrl);
    setCameraOpen(false);
    setEnhancedUrl(null);
    setError(null);
  }, []);

  const handleCameraError = useCallback((message: string) => {
    setError(message);
    setCameraOpen(false);
  }, []);

  const retake = useCallback(() => {
    setCaptured(null);
    setEnhancedUrl(null);
    setError(null);
    setCameraOpen(true);
  }, []);

  const generate = useCallback(async () => {
    if (!captured) return;
    setLoading(true);
    setError(null);
    setEnhancedUrl(null);
    try {
      const res = await fetch("/api/generate-smile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: captured,
          treatmentId,
          useConsistentSeed,
        }),
      });
      const data = (await res.json()) as {
        resultUrl?: string;
        error?: { code?: string; message?: string };
      };

      if (!res.ok) {
        const msg =
          data.error?.message ??
          (res.status === 503
            ? "Server configuration is incomplete. Add REPLICATE_API_TOKEN to .env.local."
            : "Something went wrong while generating your preview.");
        setError(msg);
        return;
      }

      if (data.resultUrl) {
        setEnhancedUrl(data.resultUrl);
      } else {
        setError("The server returned an unexpected response.");
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [captured, treatmentId, useConsistentSeed]);

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-[var(--border)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
              <Sparkles className="size-4" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                AI Smile Design Generator
              </p>
              <p className="text-xs text-[var(--foreground-muted)]">Dental visualization studio</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6">
        {!cameraOpen && !captured && (
          <section className="space-y-8">
            <div className="space-y-4 text-center sm:text-left">
              <p className="text-sm font-medium uppercase tracking-wider text-teal-700">
                Premium smile preview
              </p>
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
                See your smile in a new light—before you visit the chair.
              </h1>
              <p className="max-w-2xl text-pretty text-base text-[var(--foreground-muted)] sm:text-lg">
                Capture a quick selfie, pick a treatment direction, and preview an AI-enhanced smile
                that keeps your face, lighting, and expression consistent while focusing changes on
                the teeth.
              </p>
            </div>

            <Card className="mx-auto max-w-xl border-teal-100/80 bg-white">
              <CardHeader>
                <CardTitle className="text-xl">Get started</CardTitle>
                <CardDescription>
                  Use your device camera for best results in good, even lighting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button type="button" size="lg" className="w-full sm:w-auto" onClick={openCamera}>
                  <Camera className="size-5" aria-hidden />
                  Take a Photo
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        {cameraOpen && !captured && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Camera</h2>
            <CameraCapture
              onCapture={handleCapture}
              onError={handleCameraError}
              onCancel={() => setCameraOpen(false)}
            />
          </section>
        )}

        {captured && (
          <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Your capture</h2>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Choose a treatment style, then generate your preview.
                </p>
              </div>
              <Button type="button" variant="secondary" onClick={retake}>
                Retake photo
              </Button>
            </div>

            <SmilePreview originalSrc={captured} enhancedSrc={enhancedUrl} />

            <Card>
              <CardContent className="space-y-6 pt-6">
                <TreatmentSelector
                  value={treatmentId}
                  onChange={setTreatmentId}
                  disabled={loading}
                />

                <div className="flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1 pr-4">
                    <Label htmlFor="consistent-seed" className="text-base">
                      Use Consistent Results
                    </Label>
                    <p
                      id="consistent-seed-desc"
                      className="text-xs leading-relaxed text-[var(--foreground-muted)]"
                    >
                      When on, the server sends your configured{" "}
                      <code className="rounded bg-white px-1 py-0.5 text-[11px] text-teal-900">
                        REPLICATE_SEED
                      </code>{" "}
                      so runs can repeat the same look. When off, each generation uses random
                      sampling for natural variation. Seeds help repeatability for the same model
                      and inputs; provider or model updates can still change outputs over time.
                    </p>
                  </div>
                  <Switch
                    id="consistent-seed"
                    className="shrink-0"
                    checked={useConsistentSeed}
                    onCheckedChange={setUseConsistentSeed}
                    disabled={loading}
                    aria-describedby="consistent-seed-desc"
                  />
                </div>

                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => void generate()}
                  disabled={loading}
                >
                  <Sparkles className="size-4" aria-hidden />
                  Generate AI preview
                </Button>
              </CardContent>
            </Card>

            <LoadingState active={loading} />
            <ErrorMessage message={error} />
          </section>
        )}

        <footer className="mt-auto border-t border-[var(--border)] pt-8 text-center text-xs text-[var(--foreground-muted)]">
          <p className="mx-auto max-w-2xl leading-relaxed">
            This AI smile preview is for visualization only and is not a diagnosis or treatment
            plan. Please consult a licensed dentist for clinical recommendations.
          </p>
        </footer>
      </main>
    </div>
  );
}
