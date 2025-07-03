"use client";
import { CalendarIcon, SearchIcon, SortAscIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import groceryPoster from "../assets/vendor-grocery-poster.jpg";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export function GroceryHeroSection({ onSearch }: HeroSectionProps) {
  const t = useTranslations("groceryHero");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (onSearch) {
      onSearch(query);
    }
  }, [query, onSearch]);

  return (
    <div className="relative py-20 flex flex-col justify-center items-center w-full">
      <div className="absolute inset-0 -z-10">
        <Image
          src={groceryPoster}
          alt={t("heroImageAlt")}
          fill
          className="object-cover w-full h-full brightness-75"
          priority
        />
      </div>
      <div className="w-full max-w-5xl mx-auto px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {t("ongoingOrdersTitle")}
          </h1>
          <p className="text-white/80 text-base md:text-lg mb-6">
            {t("ongoingOrdersSubtitle")}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 justify-center">
          <div className="relative flex flex-1 items-center">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-primary h-12 border-0 text-white placeholder:text-white rounded pr-5"
            />
            <SearchIcon className="absolute right-5 text-white size-6" />
          </div>
          <Button variant="secondary" className="flex gap-2 h-12">
            <CalendarIcon className="w-5 h-5" />
            {t("calendar")}
          </Button>
          <Button variant="secondary" className="flex gap-2 h-12">
            <SortAscIcon className="w-5 h-5" />
            {t("sortBy")}
          </Button>
        </div>
      </div>
    </div>
  );
}
