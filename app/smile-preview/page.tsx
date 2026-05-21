"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, Camera, Sparkles } from "lucide-react";

import { CameraCapture } from "@/components/CameraCapture";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingState } from "@/components/LoadingState";
import { PatientInfoForm } from "@/components/PatientInfoForm";
import { ProcedureSteps, type ProcedureStepId } from "@/components/ProcedureSteps";
import { SmilePreview } from "@/components/SmilePreview";
import { TreatmentSelector } from "@/components/TreatmentSelector";
import { WizardHero } from "@/components/WizardHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PatientIntake } from "@/lib/patient-intake";
import { validatePatientIntake } from "@/lib/patient-intake";
import { TREATMENT_LABELS, type TreatmentId } from "@/lib/treatment-prompts";

const emptyPatient: PatientIntake = {
  fullName: "",
  email: "",
  phone: "",
};

export default function Home() {
  const [procedureStep, setProcedureStep] = useState<ProcedureStepId>(1);
  const [captured, setCaptured] = useState<string | null>(null);
  const [patient, setPatient] = useState<PatientIntake>(emptyPatient);
  const [treatmentId, setTreatmentId] = useState<TreatmentId>("natural_smile_enhancement");
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const goToTreatment = useCallback(() => {
    const check = validatePatientIntake(patient);
    if (!check.ok) {
      setError(check.message);
      return;
    }
    setError(null);
    setProcedureStep(2);
  }, [patient]);

  const goToPhoto = useCallback(() => {
    setError(null);
    setProcedureStep(3);
  }, []);

  const handleCapture = useCallback((dataUrl: string) => {
    setCaptured(dataUrl);
    setProcedureStep(4);
    setEnhancedUrl(null);
    setError(null);
  }, []);

  const handleCameraError = useCallback((message: string) => {
    setError(message);
    setProcedureStep(2);
  }, []);

  const retakePhoto = useCallback(() => {
    setCaptured(null);
    setEnhancedUrl(null);
    setError(null);
    setProcedureStep(3);
  }, []);

  const backToInfo = useCallback(() => {
    setError(null);
    setProcedureStep(1);
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
          patient,
          imageBase64: captured,
          treatmentId,
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
  }, [captured, patient, treatmentId]);

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-[var(--border-subtle)] bg-[var(--surface)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-emerald-950 shadow-[0_0_24px_-6px_rgba(16,185,129,0.65)]">
              <Sparkles className="size-[18px]" aria-hidden strokeWidth={2.25} />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-emerald-400/90">
                Smile Dental Arts Centre
              </p>
              <p className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                AI Smile Preview
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12">
        <div className="space-y-10">
          <WizardHero
            eyebrow="AI Smile Generator"
            title="Design Your Dream Smile"
            subtitle="Follow the simple steps below to generate your personalized smile preview — no commitment required."
          />
          <ProcedureSteps currentStep={procedureStep} />
        </div>

        {procedureStep === 1 && (
          <section className="space-y-6">
            <Card className="mx-auto max-w-xl border-emerald-500/15 bg-[var(--surface-elevated)]/90">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-medium tracking-tight">Your information</CardTitle>
                <CardDescription className="text-[var(--foreground-muted)]">
                  Demo fields only—nothing is saved in this sample unless you add a webhook.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <PatientInfoForm value={patient} onChange={setPatient} disabled={false} />
                <ErrorMessage message={error} />
                <Button type="button" size="lg" className="w-full sm:w-auto" onClick={goToTreatment}>
                  Continue
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        {procedureStep === 2 && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="ghost" size="sm" className="gap-1.5 px-2" onClick={backToInfo}>
                <ArrowLeft className="size-4" aria-hidden />
                Back
              </Button>
            </div>
            <ErrorMessage message={error} />
            <Card className="mx-auto max-w-xl border-emerald-500/15 bg-[var(--surface-elevated)]/90">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-medium tracking-tight">Treatment direction</CardTitle>
                <CardDescription className="text-[var(--foreground-muted)]">
                  Choose the style you would like to preview. You can change this later before
                  generating.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <TreatmentSelector
                  value={treatmentId}
                  onChange={setTreatmentId}
                  disabled={loading}
                />
                <Button type="button" size="lg" className="w-full sm:w-auto" onClick={goToPhoto}>
                  <Camera className="size-5" aria-hidden />
                  Open camera
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        {procedureStep === 3 && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="ghost" size="sm" className="gap-1.5 px-2" onClick={() => setProcedureStep(2)}>
                <ArrowLeft className="size-4" aria-hidden />
                Back
              </Button>
            </div>
            <ErrorMessage message={error} />
            <CameraCapture
              onCapture={handleCapture}
              onError={handleCameraError}
              onCancel={() => setProcedureStep(2)}
            />
          </section>
        )}

        {procedureStep === 4 && captured && (
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-medium tracking-tight text-[var(--foreground)]">
                  Your photo is ready
                </h2>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Treatment:{" "}
                  <span className="text-emerald-400/90">{TREATMENT_LABELS[treatmentId]}</span>
                  {" · "}
                  <button
                    type="button"
                    className="text-emerald-500/80 underline-offset-2 hover:text-emerald-400 hover:underline"
                    onClick={() => setProcedureStep(2)}
                    disabled={loading}
                  >
                    Change
                  </button>
                </p>
                <p className="text-xs text-[var(--foreground-muted)]">
                  <span className="text-emerald-500/80">Demo intake: </span>
                  {patient.fullName} · {patient.email} · {patient.phone}
                </p>
              </div>
              <Button type="button" variant="secondary" onClick={retakePhoto} disabled={loading}>
                Retake photo
              </Button>
            </div>

            <ErrorMessage message={error} />

            <SmilePreview
              originalSrc={captured}
              enhancedSrc={enhancedUrl}
              belowOriginal={
                <div className="space-y-3">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full"
                    onClick={() => void generate()}
                    disabled={loading}
                  >
                    <Sparkles className="size-4" aria-hidden />
                    Generate AI preview
                  </Button>
                  <LoadingState active={loading} />
                </div>
              }
            />
          </section>
        )}

        <footer className="mt-auto border-t border-[var(--border-subtle)] pt-10 text-center">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-[var(--foreground-muted)]">
            Demo prototype. This AI smile preview is for visualization only and is not a diagnosis or
            treatment plan. Please consult a licensed dentist for clinical recommendations.
          </p>
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-600/70">
            Smile Dental Arts Centre
          </p>
        </footer>
      </main>
    </div>
  );
}
