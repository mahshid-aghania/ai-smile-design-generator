# AI Smile Design Generator

A modern Next.js (App Router) app for **dental-style AI smile previews**: capture a selfie in the browser, choose a treatment direction, and call **Replicate** to generate an edited image with your configured model.

## Prerequisites

- **Node.js 20.9+** (recommended; Next.js 16 expects Node 20+)
- A [Replicate](https://replicate.com) account and API token

## Setup

1. Copy environment variables:

   ```bash
   cp .env.local.example .env.local
   ```

2. Set `REPLICATE_API_TOKEN` in `.env.local` (never commit real tokens).

3. **Patient intake (demo):** The form collects name, email, and phone for a realistic flow. Values are sent with the generate request and validated on the server; nothing is stored unless you set optional **`PATIENT_INTAKE_WEBHOOK_URL`** (e.g. Zapier) for your own demo backend.

4. Optionally set `REPLICATE_MODEL` to a model slug you control. The default integration targets **`black-forest-labs/flux-kontext-max`** with inputs:

   - `prompt` — treatment-specific dental instruction plus a short identity-preservation line (see `lib/replicate-smile.ts`)
   - `input_image` — your uploaded capture (via Replicate Files)
   - `aspect_ratio` — `match_input_image`

   If you switch models, confirm its OpenAPI input schema matches or adjust `lib/replicate-smile.ts`.

## Run locally

With [pnpm](https://pnpm.io/installation):

```bash
pnpm install
pnpm dev
```

If you use npm instead:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/page.tsx` — Wizard flow: patient intake → treatment → camera → preview + generate
- `app/api/generate-smile/route.ts` — Validates patient + image; runs Replicate; optional intake webhook
- `components/PatientInfoForm.tsx` — Name, email, phone fields
- `components/ProcedureSteps.tsx` — Step 1–4 indicator (Your Info → Treatment → Photo → Preview)
- `components/WizardHero.tsx` — Serif headline + eyebrow + subtitle
- `components/CameraCapture.tsx` — `getUserMedia` preview and capture
- `components/TreatmentSelector.tsx` — Treatment radio options
- `components/SmilePreview.tsx` — Before / after layout
- `components/LoadingState.tsx` — Generation loading copy
- `components/ErrorMessage.tsx` — Inline errors (camera, API, env)
- `lib/patient-intake.ts` — Patient object type + validation
- `lib/patient-webhook.ts` — Optional demo webhook (`PATIENT_INTAKE_WEBHOOK_URL`)
- `lib/replicate-smile.ts` — Replicate file upload + `replicate.run`
- `lib/treatment-prompts.ts` — Treatment IDs and exact prompts

## AI behavior note

Prompts are written to **preserve identity, face, lips, skin tone, lighting, and background** and to **focus edits on the teeth/smile**. Final adherence depends on the model you configure on Replicate.

## Disclaimer

This app shows **visualization only**—not a diagnosis or treatment plan. Always follow advice from a licensed dentist.
