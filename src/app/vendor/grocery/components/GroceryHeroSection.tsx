"use client";

import { useTranslations } from "next-intl";
import { VendorHeroSection } from "@/components/VendorHero";

import groceryPoster from "../assets/vendor-grocery-poster.jpg";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function GroceryHeroSection({ onSearch }: HeroSectionProps) {
  const t = useTranslations("groceryHero");

  return (
    <VendorHeroSection
      title={t("ongoingOrdersTitle")}
      subtitle={t("ongoingOrdersSubtitle")}
      poster={groceryPoster}
      onSearch={(query) => onSearch?.(query)}
      onSort={() => console.log("Sort options clicked")}
    />
  );
}
