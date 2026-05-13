export const TREATMENT_IDS = [
  "natural_smile_enhancement",
  "dental_veneers_preview",
  "missing_tooth_replacement",
  "teeth_whitening",
  "full_smile_makeover",
] as const;

export type TreatmentId = (typeof TREATMENT_IDS)[number];

export const TREATMENT_LABELS: Record<TreatmentId, string> = {
  natural_smile_enhancement: "Natural Smile Enhancement",
  dental_veneers_preview: "Dental Veneers Preview",
  missing_tooth_replacement: "Missing Tooth Replacement",
  teeth_whitening: "Teeth Whitening",
  full_smile_makeover: "Full Smile Makeover",
};

export const TREATMENT_PROMPTS: Record<TreatmentId, string> = {
  natural_smile_enhancement:
    "Enhance only the teeth and smile area. Keep the same person, same face, same lips, same skin tone, same lighting, and same background. Make the teeth look healthy, natural, symmetrical, and realistic. Do not change facial identity.",

  dental_veneers_preview:
    "Create a realistic dental veneers preview. Improve tooth shape, alignment, symmetry, and brightness while keeping the same person, same lips, same gums, same face, same skin tone, and same lighting. Make the veneers look premium but natural, not fake.",

  missing_tooth_replacement:
    "If there is a missing tooth, realistically recreate the missing tooth to match the person's natural teeth, gum line, smile shape, color, and lighting. Keep the same face and identity. Only edit the dental area.",

  teeth_whitening:
    "Whiten the teeth naturally while preserving realistic enamel texture, shadows, gums, lips, and facial identity. Do not over-whiten.",

  full_smile_makeover:
    "Create a realistic full smile makeover preview with improved tooth color, shape, alignment, and symmetry. Preserve the same person, face, lips, gums, lighting, and background. Only edit the smile and teeth area.",
};

export function isTreatmentId(value: string): value is TreatmentId {
  return (TREATMENT_IDS as readonly string[]).includes(value);
}
