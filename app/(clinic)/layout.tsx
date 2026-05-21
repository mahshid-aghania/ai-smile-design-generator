import { ClinicFooter } from "@/components/clinic/ClinicFooter";
import { ClinicHeader } from "@/components/clinic/ClinicHeader";
import { CdcpBanner } from "@/components/clinic/CdcpBanner";

export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-clinic flex min-h-dvh flex-col">
      <ClinicHeader />
      <main className="flex-1">{children}</main>
      <ClinicFooter />
      <CdcpBanner />
    </div>
  );
}
