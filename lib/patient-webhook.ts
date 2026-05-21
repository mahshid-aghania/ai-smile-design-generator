import type { PatientIntake } from "@/lib/patient-intake";

/**
 * Optional demo hook: POST intake + preview URL somewhere you control (e.g. Zapier).
 * Failures are logged only; the UI still shows the preview if Replicate succeeds.
 */
export async function forwardPatientIntakeToWebhook(payload: {
  patient: PatientIntake;
  treatmentId: string;
  previewImageUrl: string;
}): Promise<void> {
  const url = process.env.PATIENT_INTAKE_WEBHOOK_URL?.trim();
  if (!url) {
    return;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) {
      console.warn("[patient-intake-webhook] Non-OK response:", res.status);
    }
  } catch (e) {
    console.warn("[patient-intake-webhook] Request failed:", e);
  }
}
