import { NextResponse } from "next/server";

import { generateSmileWithReplicate } from "@/lib/replicate-smile";
import { parseReplicateSeedFromEnv } from "@/lib/replicate-seed";
import { isTreatmentId, TREATMENT_PROMPTS } from "@/lib/treatment-prompts";

export const runtime = "nodejs";
export const maxDuration = 120;

async function messageFromUnknownError(err: unknown): Promise<string> {
  if (!(err instanceof Error)) {
    return "Unexpected error";
  }
  if (err.name === "ApiError" && "response" in err) {
    const response = (err as { response?: Response }).response;
    if (response) {
      try {
        const cloned = response.clone();
        const data = (await cloned.json()) as { detail?: unknown };
        if (typeof data.detail === "string") {
          return data.detail;
        }
        if (Array.isArray(data.detail)) {
          const parts = data.detail.map((d) =>
            typeof d === "object" && d && "msg" in d ? String((d as { msg: unknown }).msg) : ""
          );
          const joined = parts.filter(Boolean).join(" ");
          if (joined) return joined;
        }
      } catch {
        /* ignore parse errors */
      }
    }
  }
  return err.message || "Unexpected error";
}

function parseImagePayload(imageBase64: string): { buffer: Buffer; mimeType: string } {
  const trimmed = imageBase64.trim();
  const dataUrl = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(trimmed);
  if (dataUrl) {
    return {
      mimeType: dataUrl[1],
      buffer: Buffer.from(dataUrl[2], "base64"),
    };
  }
  return {
    mimeType: "image/jpeg",
    buffer: Buffer.from(trimmed, "base64"),
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      imageBase64?: string;
      treatmentId?: string;
      /** When true, apply `REPLICATE_SEED` from the server if it parses to a valid integer. */
      useConsistentSeed?: unknown;
    };

    if (!body.imageBase64 || typeof body.imageBase64 !== "string") {
      return NextResponse.json(
        { error: { code: "INVALID_BODY", message: "Missing imageBase64 string." } },
        { status: 400 }
      );
    }

    if (!body.treatmentId || typeof body.treatmentId !== "string" || !isTreatmentId(body.treatmentId)) {
      return NextResponse.json(
        { error: { code: "INVALID_TREATMENT", message: "Unknown or missing treatment option." } },
        { status: 400 }
      );
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        {
          error: {
            code: "MISSING_ENV",
            message:
              "The server is not configured with REPLICATE_API_TOKEN. Add it to .env.local and restart the dev server.",
          },
        },
        { status: 503 }
      );
    }

    const { buffer, mimeType } = parseImagePayload(body.imageBase64);
    if (buffer.length === 0) {
      return NextResponse.json(
        { error: { code: "INVALID_IMAGE", message: "The image payload was empty." } },
        { status: 400 }
      );
    }

    const prompt = TREATMENT_PROMPTS[body.treatmentId];

    const useConsistentSeed = body.useConsistentSeed === true;
    const parsedSeed = parseReplicateSeedFromEnv();
    const seed = useConsistentSeed && parsedSeed !== undefined ? parsedSeed : undefined;

    const resultUrl = await generateSmileWithReplicate({
      imageBuffer: buffer,
      mimeType,
      prompt,
      ...(seed !== undefined ? { seed } : {}),
    });

    return NextResponse.json({ resultUrl });
  } catch (err: unknown) {
    const code = err instanceof Error && "code" in err ? String((err as Error & { code?: string }).code) : "";

    if (code === "MISSING_ENV") {
      return NextResponse.json(
        {
          error: {
            code: "MISSING_ENV",
            message:
              "The server is not configured with REPLICATE_API_TOKEN. Add it to .env.local and restart the dev server.",
          },
        },
        { status: 503 }
      );
    }

    const message = await messageFromUnknownError(err);

    console.error("[generate-smile]", err);

    return NextResponse.json(
      {
        error: {
          code: "GENERATION_FAILED",
          message:
            message.length > 0
              ? message
              : "The AI service could not generate an image. Try again in a moment.",
        },
      },
      { status: 502 }
    );
  }
}
