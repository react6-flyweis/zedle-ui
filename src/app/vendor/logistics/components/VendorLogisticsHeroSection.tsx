"use client";

import { useTranslations } from "next-intl";
import { VendorHeroSection } from "@/components/VendorHero";

import vendorLogisticsHeroPoster from "../assets/vendor-logistics-hero-poster.jpg";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function VendorLogisticsHeroSection({ onSearch }: HeroSectionProps) {
  const t = useTranslations("logisticsHero");

  return (
    <VendorHeroSection
      title={t("ongoingOrdersTitle")}
      subtitle={t("ongoingOrdersSubtitle")}
      poster={vendorLogisticsHeroPoster}
      onSearch={(query) => onSearch?.(query)}
      onSort={() => {}}
    />
  );
}
