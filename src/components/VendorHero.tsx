"use client";
import { Filter, Plus, SearchIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import calendarClockIcon from "@/assets/icons/calendar-clock.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { CalendarDialog } from "./CalendarDialog";

interface HeroSectionProps {
  subtitle: string;
  title: string;
  poster: string | StaticImageData;
  onSort?: (filters: string[]) => void;
  onAdd?: () => void;
  addButtonText?: string;
  sortOptions?: string[];
  filterOptions?: string[];
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: string[]) => void;
}

export function VendorHeroSection({
  poster,
  title,
  subtitle,
  onAdd,
  addButtonText,
  onSearch,
  sortOptions = [],
  onSort,
}: HeroSectionProps) {
  const t = useTranslations("hero");
  const [query, setQuery] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Handle filter change
  const handleFilterToggle = (option: string) => {
    setSelectedFilters((prev) => {
      const updated = prev.includes(option)
        ? prev.filter((f) => f !== option)
        : [...prev, option];
      if (onSort) onSort(updated);
      return updated;
    });
  };

  useEffect(() => {
    if (onSearch) {
      onSearch(query);
    }
  }, [query, onSearch]);

  return (
    <div className="relative py-20 flex flex-col justify-center items-center w-full">
      <div className="absolute inset-0 -z-10">
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover w-full h-full brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="w-full max-w-5xl mx-auto px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {title}
          </h1>
          <p className="text-white/80 text-base md:text-lg mb-6">{subtitle}</p>
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
          {onAdd ? (
            <Button
              type="button"
              variant="secondary"
              className="h-12 rounded font-bold w-36 text-primary "
              onClick={onAdd}
            >
              <span className="shrink-0 flex items-center justify-center size-7 border-2 border-primary rounded-full">
                <Plus className="size-5 text-primary" strokeWidth={2.5} />
              </span>
              {addButtonText || t("add")}
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="flex gap-2 h-12  text-primary rounded font-bold w-32"
              onClick={() => setIsCalendarOpen(true)}
            >
              <Image
                src={calendarClockIcon}
                alt={t("calendarIconAlt")}
                className="max-h-6 max-w-6"
                width={50}
                height={50}
              />
              {t("calendar")}
            </Button>
          )}
          {/* Sort/Filter Button wrapped in DropdownMenu */}
          {sortOptions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="flex h-12  rounded shadow bg-white text-primary "
                >
                  <Filter className="size-5 text-primary" />
                  <span className="font-semibold">{t("sortBy")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2">
                <div className="px-3 pt-2 pb-1 text-primary font-bold">
                  {t("category")}
                </div>
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onSelect={() => handleFilterToggle(option)}
                    className="flex justify-between items-center text-primary focus:bg-primary/10 cursor-pointer"
                  >
                    <span>{option}</span>
                    <span className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(option)}
                        readOnly
                        className="accent-primary w-5 h-5 rounded border border-primary cursor-pointer"
                        tabIndex={-1}
                      />
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <CalendarDialog
        open={isCalendarOpen}
        onOpenChange={setIsCalendarOpen}
        onSelectDate={() => {}}
      />
    </div>
  );
}
