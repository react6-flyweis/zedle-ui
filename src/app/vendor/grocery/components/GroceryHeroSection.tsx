"use client";

import { useTranslations } from "next-intl";
import { VendorHeroSection } from "@/components/VendorHero";

import groceryPoster from "../assets/vendor-grocery-poster.jpg";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function GroceryHeroSection({ onSearch }: HeroSectionProps) {
  const t = useTranslations("groceryHero");

  // Define sort options as translation keys
  const sortOptions = [
    "vegetablesFruits",
    "dairyProducts",
    "homeCare",
    "chipsBeverages",
    "otherCategory",
  ];

  return (
    <VendorHeroSection
      title={t("ongoingOrdersTitle")}
      subtitle={t("ongoingOrdersSubtitle")}
      poster={groceryPoster}
      onSearch={(query) => onSearch?.(query)}
      sortOptions={sortOptions}
      onSort={() => {}}
    />
  );
}
