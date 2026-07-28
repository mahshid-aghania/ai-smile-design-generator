"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight, Phone, Sparkles } from "lucide-react";

import { ErrorMessage } from "@/components/ErrorMessage";
import { FinancingPromoBanner } from "@/components/FinancingPromoBanner";
import { LoadingState } from "@/components/LoadingState";
import { PatientInfoForm } from "@/components/PatientInfoForm";
import { PhotoStep } from "@/components/PhotoStep";
import { ProcedureSteps, type ProcedureStepId } from "@/components/ProcedureSteps";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SmilePreview } from "@/components/SmilePreview";
import { TreatmentSelector } from "@/components/TreatmentSelector";
import { TrustStrip } from "@/components/TrustStrip";
import { WizardHero } from "@/components/WizardHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
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
    trackEvent("wizard_step_complete", { step: 1, name: "your_info" });
    setProcedureStep(2);
  }, [patient]);

  const goToPhoto = useCallback(() => {
    setError(null);
    trackEvent("wizard_step_complete", { step: 2, name: "treatment", treatment: treatmentId });
    setProcedureStep(3);
  }, [treatmentId]);

  const goToPreview = useCallback(() => {
    setError(null);
    setEnhancedUrl(null);
    trackEvent("wizard_step_complete", { step: 3, name: "photo" });
    setProcedureStep(4);
  }, []);

  const handlePhotoChange = useCallback((dataUrl: string | null) => {
    setCaptured(dataUrl);
    setEnhancedUrl(null);
    setError(null);
    if (dataUrl) trackEvent("photo_selected");
  }, []);

  const generate = useCallback(async () => {
    if (!captured) return;
    setLoading(true);
    setError(null);
    setEnhancedUrl(null);
    trackEvent("preview_generate_start", { treatment: treatmentId });
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
            ? "Our preview service isn't configured yet. Please call 437-900-2200 and we'll help right away."
            : "Something went wrong while generating your preview. Please try again.");
        setError(msg);
        trackEvent("preview_generate_error", { status: res.status });
        return;
      }

      if (data.resultUrl) {
        setEnhancedUrl(data.resultUrl);
        trackEvent("preview_generate_success", { treatment: treatmentId });
      } else {
        setError("The server returned an unexpected response. Please try again.");
        trackEvent("preview_generate_error", { status: 200, reason: "no_result" });
      }
    } catch {
      setError("Network error. Check your connection and try again.");
      trackEvent("preview_generate_error", { reason: "network" });
    } finally {
      setLoading(false);
    }
  }, [captured, patient, treatmentId]);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
        <FinancingPromoBanner />
        <TrustStrip />

        <section id="smile-wizard" className="space-y-8 pt-6">
          <WizardHero
            as="h2"
            eyebrow="AI Smile Generator"
            title="Design Your Dream Smile"
            subtitle="Follow the simple steps below to generate your personalized smile preview — no commitment required."
          />
          <ProcedureSteps currentStep={procedureStep} />

          {procedureStep === 1 && (
            <div className="space-y-4">
              <ErrorMessage message={error} />
              <Card className="mx-auto max-w-xl">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl font-semibold tracking-tight">
                    Your information
                  </CardTitle>
                  <CardDescription>
                    So we can send your preview and answer any questions about financing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <PatientInfoForm value={patient} onChange={setPatient} disabled={false} />
                  <Button type="button" size="lg" className="w-full" onClick={goToTreatment}>
                    Continue
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {procedureStep === 2 && (
            <div className="space-y-4">
              <div className="mx-auto max-w-xl">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 px-2"
                  onClick={() => {
                    setError(null);
                    setProcedureStep(1);
                  }}
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  Back
                </Button>
              </div>
              <ErrorMessage message={error} />
              <Card className="mx-auto max-w-xl">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl font-semibold tracking-tight">
                    Treatment direction
                  </CardTitle>
                  <CardDescription>
                    Choose the result you would like to preview. You can change this before
                    generating.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <TreatmentSelector
                    value={treatmentId}
                    onChange={setTreatmentId}
                    disabled={loading}
                  />
                  <Button type="button" size="lg" className="w-full" onClick={goToPhoto}>
                    Continue
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {procedureStep === 3 && (
            <div className="space-y-4">
              <div className="mx-auto max-w-xl">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 px-2"
                  onClick={() => {
                    setError(null);
                    setProcedureStep(2);
                  }}
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  Back
                </Button>
              </div>
              <ErrorMessage message={error} />
              <PhotoStep
                value={captured}
                onChange={handlePhotoChange}
                onConfirm={goToPreview}
                onError={setError}
              />
            </div>
          )}

          {procedureStep === 4 && captured && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="-ml-2 gap-1.5 px-2"
                    onClick={() => setProcedureStep(3)}
                    disabled={loading}
                  >
                    <ArrowLeft className="size-4" aria-hidden />
                    Back to photo
                  </Button>
                  <p className="text-sm text-[var(--foreground-muted)]">
                    Treatment:{" "}
                    <span className="font-semibold text-[var(--foreground)]">
                      {TREATMENT_LABELS[treatmentId]}
                    </span>
                    {" · "}
                    <button
                      type="button"
                      className="font-medium text-[var(--primary)] underline-offset-2 hover:underline"
                      onClick={() => setProcedureStep(2)}
                      disabled={loading}
                    >
                      Change
                    </button>
                  </p>
                </div>
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
                      {enhancedUrl ? "Generate again" : "Generate AI preview"}
                    </Button>
                    <LoadingState active={loading} />
                  </div>
                }
              />

              {/* Final CTA */}
              <Card className="border-[var(--border)] bg-[var(--primary-soft)]/50">
                <CardContent className="flex flex-col items-center gap-4 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
                  <div className="space-y-1">
                    <p className="text-base font-semibold tracking-tight text-[var(--foreground)]">
                      Ready to make it real?
                    </p>
                    <p className="text-pretty text-sm leading-relaxed text-[var(--foreground-muted)]">
                      Book a consultation with Dr. Mehdi Adibrad, DDS — implants from $299/month with
                      $500 down.*
                    </p>
                  </div>
                  <Button asChild size="lg" className="w-full shrink-0 sm:w-auto">
                    <a
                      href="tel:+14379002200"
                      onClick={() => trackEvent("call_click", { location: "preview_cta" })}
                      aria-label="Call Dentin Family Dentistry at 437-900-2200"
                    >
                      <Phone className="size-4" aria-hidden strokeWidth={2.25} />
                      Call 437-900-2200
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Compliance disclaimer */}
          <p className="mx-auto max-w-xl text-pretty text-center text-xs leading-relaxed text-[var(--foreground-muted)]">
            This AI smile preview is for visualization only and is not a diagnosis or treatment plan.
            Please consult a licensed dentist for clinical recommendations.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
