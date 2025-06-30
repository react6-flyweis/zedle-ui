import {
  SearchBoxCore,
  type SearchBoxSuggestion,
  SessionToken,
} from "@mapbox/search-js-core";
import { debounce } from "lodash-es";
import { useEffect, useMemo, useState } from "react";
import { useUserLocation } from "./useUserLocation";

// interface PlaceSuggestion {
//     id: string;
//     place_name: string;
// }

// const fetchSuggestions = async (query: string): Promise<PlaceSuggestion[]> => {
//   if (!query || !MAPBOX_TOKEN) return [];
//   const res = await fetch(
//     `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//       query
//     )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`
//   );
//   const data = await res.json();
//   return data.features || [];
// };

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const search = new SearchBoxCore({ accessToken: MAPBOX_TOKEN });
const sessionToken = new SessionToken();

export function useMapboxSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<SearchBoxSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { location } = useUserLocation();

  // Debounced search function
  const debouncedSuggest = useMemo(
    () =>
      debounce(
        (
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
          search
            .suggest(queryValue, {
              limit: 5,
              types:
                "place,address,postcode,locality,neighborhood,street,block",
              sessionToken,
              navigation_profile: "driving",
              origin: [
                locationValue?.longitude || 0,
                locationValue?.latitude || 0,
              ],
            })
            .then((res) => {
              if (active.current) {
                setSuggestions(res.suggestions || []);
              }
            })
            .catch((err) => {
              if (active.current) {
                setError(err.message || "Unknown error");
                setSuggestions([]);
              }
            })
            .finally(() => {
              if (active.current) setLoading(false);
            });
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
