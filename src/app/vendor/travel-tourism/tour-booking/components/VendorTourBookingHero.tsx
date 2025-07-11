"use client";

import { useTranslations } from "next-intl";
import { VendorHeroSection } from "@/components/VendorHero";

import tourBookingPoster from "../assets/vendor-tour-booking-poster.jpg";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function VendorTourBookingHero({ onSearch }: HeroSectionProps) {
  const t = useTranslations("tourBookingHero");

  return (
    <VendorHeroSection
      title={t("ongoingRequestsTitle")}
      subtitle={t("ongoingRequestsSubtitle")}
      poster={tourBookingPoster}
      onSearch={(query) => onSearch?.(query)}
    />
  );
}
