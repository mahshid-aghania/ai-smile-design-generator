import Replicate from "replicate";

/**
 * Default: FLUX.1 Kontext [max] on Replicate (image editing).
 * @see https://replicate.com/black-forest-labs/flux-kontext-max/api
 *
 * Input schema (image-to-image): prompt, input_image (URL), aspect_ratio, seed (optional).
 *
 * Seeds: When `seed` is passed, sampling is fixed for that value (see `lib/replicate-seed.ts`).
 * When omitted, each run uses fresh randomness from the provider — expect visual variation.
 */
const DEFAULT_MODEL = "black-forest-labs/flux-kontext-max";

function normalizeImageOutput(output: unknown): string {
  if (typeof output === "string" && output.startsWith("http")) {
    return output;
  }
  if (Array.isArray(output)) {
    const first = output[0];
    if (typeof first === "string" && first.startsWith("http")) {
      return first;
    }
  }
  throw new Error("Unexpected output from Replicate: expected an image URL string.");
}

export async function generateSmileWithReplicate(params: {
  imageBuffer: Buffer;
  mimeType: string;
  prompt: string;
  /** If set, forwarded to Replicate for reproducible sampling (same model + inputs → same output). */
  seed?: number;
}): Promise<string> {
  const token = process.env.REPLICATE_API_TOKEN;
  const model = (process.env.REPLICATE_MODEL ?? DEFAULT_MODEL).trim();

  if (!token) {
    const err = new Error("Server is missing REPLICATE_API_TOKEN.");
    (err as Error & { code: string }).code = "MISSING_ENV";
    throw err;
  }

  const replicate = new Replicate({ auth: token });

  const bytes = new Uint8Array(params.imageBuffer);
  const blob = new Blob([bytes], { type: params.mimeType });
  const ext =
    params.mimeType.includes("png") ? "png" : params.mimeType.includes("webp") ? "webp" : "jpg";
  const file = new File([blob], `capture.${ext}`, { type: params.mimeType });

  const uploaded = (await replicate.files.create(file)) as {
    urls?: { get?: string };
  };
  const imageUrl = uploaded.urls?.get;
  if (!imageUrl) {
    throw new Error("Could not upload image to Replicate (missing file URL).");
  }

  const composedPrompt = [
    params.prompt,
    "Preserve the same person's identity, face shape, lips, skin tone, lighting, and camera angle; restrict visible edits to the teeth and smile area only.",
  ].join("\n\n");

  const input: Record<string, string | number> = {
    prompt: composedPrompt,
    input_image: imageUrl,
    aspect_ratio: "match_input_image",
  };

  if (params.seed !== undefined) {
    input.seed = params.seed;
  }

  const output = await replicate.run(model as `${string}/${string}`, {
    input,
  });

  return normalizeImageOutput(output);
}
