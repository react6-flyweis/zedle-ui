"use client";

import type { SearchBoxSuggestion } from "@mapbox/search-js-core";
import type { SearchBoxFeatureProperties } from "@mapbox/search-js-core/dist/searchbox/types";
import { ArrowLeftRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { type KeyboardEvent, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMapboxSuggestions } from "@/hooks/useMapboxSuggestions";
import { useRetrieveMapboxSuggestion } from "@/hooks/useRetrieveMapboxSuggestion";
import { cn } from "@/lib/utils";
import { AnimatedInput } from "./ui/animated-input";

interface MapSearchInputProps {
  placeholder: string;
  value?: SearchBoxSuggestion | null;
  onChange?: (value: SearchBoxFeatureProperties | null) => void;
  className?: string;
}

export function MapSearchInput({
  placeholder,
  className,
  onChange,
}: MapSearchInputProps) {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { suggestions, loading } = useMapboxSuggestions(query);
  const { retrieved, retrieve } = useRetrieveMapboxSuggestion();

  const [highlightedIdx, setHighlightedIdx] = useState<number>(-1);

  // Keyboard navigation
  useEffect(() => {
    if (!open) setHighlightedIdx(-1);
  }, [open]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIdx((idx) => (idx + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIdx(
        (idx) => (idx - 1 + suggestions.length) % suggestions.length,
      );
    } else if (e.key === "Enter" && highlightedIdx >= 0) {
      e.preventDefault();
      const s = suggestions[highlightedIdx];
      handleSelect(s);
    }
  }

  const handleSelect = (address: SearchBoxSuggestion) => {
    setOpen(false);
    retrieve(address);
  };

  useEffect(() => {
    if (retrieved) {
      onChange?.(retrieved);
    }
  }, [retrieved, onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <div className={cn("relative w-full", className)}>
          <AnimatedInput
            type="text"
            value={query}
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setOpen(true)}
            aria-autocomplete="list"
            aria-controls="map-suggestion-list"
            aria-expanded={open}
            autoComplete="off"
            role="combobox"
            className="pr-10 rounded-none"
          />
          <ArrowLeftRight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-full rounded overflow-auto z-50"
        align="start"
        sideOffset={4}
        id="map-suggestion-list"
        tabIndex={-1}
        avoidCollisions={true}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        side="bottom"
        collisionPadding={8}
      >
        {loading ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            {t("search.loading")}
          </div>
        ) : suggestions.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            {t("search.noResults")}
          </div>
        ) : (
          <select
            className="divide-y divide-border w-full"
            size={suggestions.length > 0 ? suggestions.length : 1}
            onChange={(e) => {
              const idx = e.target.selectedIndex;
              const s = suggestions[idx];
              if (s) handleSelect(s);
            }}
            tabIndex={-1}
            aria-activedescendant={
              highlightedIdx >= 0 ? `option-${highlightedIdx}` : undefined
            }
          >
            {suggestions.map((s, idx) => (
              <option
                key={s.mapbox_id || idx}
                id={`option-${idx}`}
                value={s.mapbox_id}
                className={cn(
                  "w-full text-left cursor-pointer px-4 py-2 transition-colors text-sm",
                  idx === highlightedIdx
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
                aria-selected={idx === highlightedIdx}
                onMouseEnter={() => setHighlightedIdx(idx)}
              >
                {s.full_address || `${s.name}, ${s.place_formatted}`}
              </option>
            ))}
          </select>
        )}
      </PopoverContent>
    </Popover>
  );
}
