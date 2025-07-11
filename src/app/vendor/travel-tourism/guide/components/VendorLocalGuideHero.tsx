"use client";

import { useTranslations } from "next-intl";
import { VendorHeroSection } from "@/components/VendorHero";

import vendorLocalGuideHeroPoster from "../assets/local-guide-poster.jpg";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function VendorLocalGuideHero({ onSearch }: HeroSectionProps) {
  const t = useTranslations("localGuide");

  return (
    <VendorHeroSection
      title={t("ongoingRequestsTitle")}
      subtitle={t("ongoingRequestsSubtitle")}
      poster={vendorLocalGuideHeroPoster}
      onSearch={(query) => onSearch?.(query)}
    />
  );
}
