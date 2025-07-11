"use client";

import { useTranslations } from "next-intl";
import { VendorHeroSection } from "@/components/VendorHero";

import carRentalPoster from "../assets/vendor-car-rental-poster.jpg";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function VendorCarRentalHero({ onSearch }: HeroSectionProps) {
  const t = useTranslations("carRentalHero");

  return (
    <VendorHeroSection
      title={t("ongoingRequestsTitle")}
      subtitle={t("ongoingRequestsSubtitle")}
      poster={carRentalPoster}
      onSearch={(query) => onSearch?.(query)}
    />
  );
}
