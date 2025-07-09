"use client";

import { useTranslations } from "next-intl";
import { VendorHeroSection } from "@/components/VendorHero";

import hoteLodgePoster from "../assets/hotel-lodge-poster.jpg";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function VendorHotelLodgeHero({ onSearch }: HeroSectionProps) {
  const t = useTranslations("hotelLodgeHero");

  // Define sort options as translation keys
  const sortOptions = ["dateWise", "moneyWise"];

  return (
    <VendorHeroSection
      title={t("ongoingRequestsTitle")}
      subtitle={t("ongoingRequestsSubtitle")}
      poster={hoteLodgePoster}
      onSearch={(query) => onSearch?.(query)}
      sortOptions={sortOptions}
    />
  );
}
