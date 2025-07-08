"use client";

import { useTranslations } from "next-intl";
import { VendorHeroSection } from "@/components/VendorHero";

import vendorEnterprisePoster from "../assets/vendor-enterprise-poster.jpg";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function VendorEnterpriseHero({ onSearch }: HeroSectionProps) {
  const t = useTranslations("enterpriseHero");

  // Define sort options as translation keys
  const sortOptions = ["dateWise", "moneyWise"];

  return (
    <VendorHeroSection
      title={t("ongoingRequestsTitle")}
      subtitle={t("ongoingRequestsSubtitle")}
      poster={vendorEnterprisePoster}
      onSearch={(query) => onSearch?.(query)}
      sortOptions={sortOptions}
      onSort={() => {}}
    />
  );
}
