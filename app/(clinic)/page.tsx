import { HeroCarousel } from "@/components/clinic/HeroCarousel";
import {
  AppointmentSection,
  BookCtaSection,
  FamilySection,
  GettingHereSection,
  HighlightServicesSection,
  IntroSection,
  ServiceCardsSection,
  ServiceIconsSection,
  WhyChooseSection,
} from "@/components/clinic/HomeSections";
import { TestimonialsCarousel } from "@/components/clinic/TestimonialsCarousel";

export default function ClinicHomePage() {
  return (
    <>
      <HeroCarousel />
      <IntroSection />
      <HighlightServicesSection />
      <WhyChooseSection />
      <FamilySection />
      <BookCtaSection />
      <ServiceCardsSection />
      <ServiceIconsSection />
      <AppointmentSection />
      <TestimonialsCarousel />
      <GettingHereSection />
    </>
  );
}
