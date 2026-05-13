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

3. Optionally set `REPLICATE_MODEL` to a model slug you control. The default integration targets **`black-forest-labs/flux-kontext-max`** with inputs:

   - `prompt` — treatment-specific dental instruction plus a short identity-preservation line (see `lib/replicate-smile.ts`)
   - `input_image` — your uploaded capture (via Replicate Files)
   - `aspect_ratio` — `match_input_image`

   Optional on the model: `seed` — set `REPLICATE_SEED` in `.env.local` (integer string) and turn on **Use Consistent Results** in the UI to send it; leave the toggle off for random variation each run. Parsing is safe: invalid or missing seeds are ignored without crashing (see `lib/replicate-seed.ts`).

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

- `app/page.tsx` — Landing, camera flow, treatment selection, preview
- `app/api/generate-smile/route.ts` — Server route; uploads image and runs Replicate
- `components/CameraCapture.tsx` — `getUserMedia` preview and capture
- `components/TreatmentSelector.tsx` — Treatment radio options
- `components/SmilePreview.tsx` — Before / after layout
- `components/LoadingState.tsx` — Generation loading copy
- `components/ErrorMessage.tsx` — Inline errors (camera, API, env)
- `lib/replicate-seed.ts` — Parse optional `REPLICATE_SEED` for reproducible runs
- `lib/replicate-smile.ts` — Replicate file upload + `replicate.run`
- `lib/treatment-prompts.ts` — Treatment IDs and exact prompts

## AI behavior note

Prompts are written to **preserve identity, face, lips, skin tone, lighting, and background** and to **focus edits on the teeth/smile**. Final adherence depends on the model you configure on Replicate.

## Disclaimer

This app shows **visualization only**—not a diagnosis or treatment plan. Always follow advice from a licensed dentist.
