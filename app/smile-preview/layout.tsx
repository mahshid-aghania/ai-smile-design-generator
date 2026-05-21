import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Smile Preview | Smile Dental Arts Centre",
  description:
    "Visualize smile enhancements with AI. Capture a photo, choose a treatment direction, and preview a concept to discuss with your dentist.",
};

export default function SmilePreviewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="theme-wizard flex min-h-dvh flex-1 flex-col">{children}</div>;
}
