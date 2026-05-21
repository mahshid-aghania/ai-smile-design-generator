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

function isImageUrlString(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:");
}

/**
 * `replicate.run` may return a plain URL string, a `data:` URI, an array of those,
 * or (by default) a Replicate `FileOutput` stream object whose `toString()` is the URL.
 */
function normalizeImageOutput(output: unknown): string {
  if (typeof output === "string" && isImageUrlString(output)) {
    return output;
  }

  if (output !== null && typeof output === "object") {
    if ("url" in output && typeof (output as { url?: unknown }).url === "function") {
      try {
        const u = (output as { url: () => URL }).url();
        if (u instanceof URL && isImageUrlString(u.href)) {
          return u.href;
        }
      } catch {
        /* ignore */
      }
    }
    if (typeof (output as { toString?: () => unknown }).toString === "function") {
      const s = (output as { toString: () => unknown }).toString();
      if (typeof s === "string" && isImageUrlString(s)) {
        return s;
      }
    }
  }

  if (Array.isArray(output)) {
    for (const item of output) {
      try {
        return normalizeImageOutput(item);
      } catch {
        /* try next */
      }
    }
  }

  const preview =
    output === null || output === undefined
      ? String(output)
      : typeof output === "object"
        ? `[object type=${(output as object).constructor?.name ?? "Object"}]`
        : String(output).slice(0, 120);
  throw new Error(
    `Unexpected output from Replicate: expected an image URL string. Received: ${preview}`
  );
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

  const replicate = new Replicate({
    auth: token,
    // Return plain https URLs from `run()` instead of FileOutput streams (easier to forward to the client).
    useFileOutput: false,
  });

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
