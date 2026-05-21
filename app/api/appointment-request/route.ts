import { NextResponse } from "next/server";

type AppointmentBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  currentPatient?: string;
  preferredDays?: string;
  preferredTime?: string;
  reason?: string;
  details?: string;
};

export async function POST(request: Request) {
  let body: AppointmentBody;
  try {
    body = (await request.json()) as AppointmentBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = body.fullName?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();

  if (!fullName || !email || !phone) {
    return NextResponse.json(
      { error: "Full name, email, and phone are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Demo: log only. Wire PATIENT_INTAKE_WEBHOOK_URL or email service for production.
  console.info("[appointment-request]", {
    fullName,
    email,
    phone,
    currentPatient: body.currentPatient,
    preferredDays: body.preferredDays,
    preferredTime: body.preferredTime,
    reason: body.reason,
    details: body.details,
  });

  return NextResponse.json({
    message:
      "Thank you! Your appointment request has been received. Our team will contact you shortly.",
  });
}
