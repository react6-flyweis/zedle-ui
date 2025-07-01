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
import { AnimatedInput } from "../ui/animated-input";

interface MapSearchInputProps {
  placeholder: string;
  value?: string;
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
  const { retrieve } = useRetrieveMapboxSuggestion();

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
    setQuery(
      address.full_address || `${address.name} ${address.place_formatted}`,
    ); // Set input to selected value
    setOpen(false);
    retrieve(address).then((retrieved) => {
      if (retrieved) {
        onChange?.(retrieved);
      }
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <div className={cn("relative w-full", className)}>
          <AnimatedInput
            type="text"
            value={query}
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
            aria-controls="map-suggestion-list"
            aria-expanded={open}
            autoComplete="off"
            role="combobox"
            className="pr-10 rounded-none"
            onBlur={(e) => {
              // Only close if focus moves outside popover
              if (
                !e.relatedTarget ||
                !e.currentTarget.parentElement?.contains(e.relatedTarget)
              ) {
                setOpen(false);
              }
            }}
          />
          <ArrowLeftRight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[var(--radix-popover-trigger-width)] max-h-72 rounded overflow-auto z-50"
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
        onBlur={(e) => {
          // Close popover if focus leaves popover content
          if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
            setOpen(false);
          }
        }}
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
          <ul className="divide-y divide-border w-full">
            {suggestions.map((s, idx) => (
              <li
                key={s.mapbox_id || idx}
                id={`option-${idx}`}
                className={cn(
                  "w-full text-left cursor-pointer px-4 py-2 transition-colors text-sm whitespace-normal break-words",
                  idx === highlightedIdx
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
                onMouseEnter={() => setHighlightedIdx(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(s);
                }}
              >
                {s.full_address || `${s.name}, ${s.place_formatted}`}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
