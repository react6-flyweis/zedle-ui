import { debounce } from "lodash-es";
import { useEffect, useMemo, useState } from "react";
import type { SearchBoxSuggestion } from "@/lib/mapbox";
import { suggestMapbox } from "@/lib/mapbox";
import { useUserLocation } from "./useUserLocation";

export function useMapboxSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<SearchBoxSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { location } = useUserLocation();

  // Debounced search function
  const debouncedSuggest = useMemo(
    () =>
      debounce(
        async (
          queryValue: string,
          locationValue: typeof location,
          active: { current: boolean },
        ) => {
          if (!queryValue) {
            setSuggestions([]);
            setLoading(false);
            setError(null);
            return;
          }
          setLoading(true);
          setError(null);
          try {
            const suggestionsResult = await suggestMapbox(queryValue, {
              limit: 5,
              navigation_profile: "driving",
              origin: [
                locationValue?.longitude || 0,
                locationValue?.latitude || 0,
              ],
            });
            if (active.current) {
              setSuggestions(suggestionsResult);
            }
          } catch (err: unknown) {
            if (active.current) {
              const errorMessage =
                typeof err === "object" && err !== null && "message" in err
                  ? String((err as { message?: unknown }).message)
                  : "Unknown error";
              setError(errorMessage);
              setSuggestions([]);
            }
          } finally {
            if (active.current) setLoading(false);
          }
        },
        350,
      ),
    [],
  );

  useEffect(() => {
    const active = { current: true };
    debouncedSuggest(query, location, active);
    return () => {
      active.current = false;
      debouncedSuggest.cancel();
    };
  }, [query, location, debouncedSuggest]);

  return { suggestions, loading, error };
}
