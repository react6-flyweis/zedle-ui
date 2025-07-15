"use client";

import { useTranslations } from "next-intl";
import { VendorHeroSection } from "@/components/VendorHero";

import foodDeliveryPoster from "../assets/vendor-food-delivery-poster.jpg";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function FoodHeroSection({ onSearch }: HeroSectionProps) {
  const t = useTranslations("foodHero");

  // Define sort options as translation keys
  const sortOptions = ["pizza", "burger", "biryani", "chicken", "roll"];

  return (
    <VendorHeroSection
      title={t("ongoingOrdersTitle")}
      subtitle={t("ongoingOrdersSubtitle")}
      poster={foodDeliveryPoster}
      onSearch={(query) => onSearch?.(query)}
      sortOptions={sortOptions}
      onSort={() => {}}
    />
  );
}
