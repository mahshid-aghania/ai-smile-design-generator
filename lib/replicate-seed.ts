/**
 * Optional Replicate `seed` for FLUX Kontext (and similar) models.
 *
 * Determinism: With a fixed seed, the model’s sampling becomes repeatable for the same
 * model version, inputs (image + prompt), and hardware — you tend to get the same or very
 * similar output. Omitting the seed lets the provider sample randomly, so each run can vary.
 * Note: upstream model or infrastructure updates can still change outputs over time; seeds
 * improve repeatability but are not an absolute guarantee forever.
 */

/**
 * Reads `REPLICATE_SEED` from the environment and returns a safe integer, or `undefined`.
 * Never throws; invalid or empty values are ignored after a console warning.
 */
export function parseReplicateSeedFromEnv(): number | undefined {
  const raw = process.env.REPLICATE_SEED;
  if (raw === undefined || raw === null) {
    return undefined;
  }

  const trimmed = String(raw).trim();
  if (trimmed === "") {
    return undefined;
  }

  // Integer string only (avoids accepting "12abc" as 12 from parseInt)
  if (!/^-?\d+$/.test(trimmed)) {
    console.warn(
      "[replicate-seed] REPLICATE_SEED must be an integer string; got non-integer input. Ignoring."
    );
    return undefined;
  }

  const n = Number(trimmed);
  if (!Number.isFinite(n) || !Number.isInteger(n)) {
    console.warn("[replicate-seed] REPLICATE_SEED could not be parsed as an integer. Ignoring.");
    return undefined;
  }

  if (!Number.isSafeInteger(n)) {
    console.warn(
      "[replicate-seed] REPLICATE_SEED is outside the JavaScript safe integer range. Ignoring."
    );
    return undefined;
  }

  return n;
}
