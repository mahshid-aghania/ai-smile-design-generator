export type PatientIntake = {
  fullName: string;
  email: string;
  phone: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

/**
 * Validates patient contact fields for intake + API.
 * Returns trimmed strings when valid.
 */
export function validatePatientIntake(
  raw: unknown
): { ok: true; patient: PatientIntake } | { ok: false; message: string } {
  if (raw === null || typeof raw !== "object") {
    return { ok: false, message: "Patient information is required." };
  }

  const o = raw as Record<string, unknown>;
  const fullName = typeof o.fullName === "string" ? o.fullName.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim().toLowerCase() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";

  if (fullName.length < 2 || fullName.length > 120) {
    return { ok: false, message: "Please enter your full name (2–120 characters)." };
  }
  if (email.length < 5 || email.length > 254 || !EMAIL_RE.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  const phoneDigits = digitsOnly(phone);
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return {
      ok: false,
      message: "Please enter a valid phone number (at least 10 digits).",
    };
  }

  return {
    ok: true,
    patient: { fullName, email, phone },
  };
}
