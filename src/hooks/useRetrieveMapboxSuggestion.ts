import {
  SearchBoxCore,
  type SearchBoxSuggestion,
  SessionToken,
} from "@mapbox/search-js-core";
import type { SearchBoxFeatureProperties } from "@mapbox/search-js-core/dist/searchbox/types";
import { useCallback, useState } from "react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const search = new SearchBoxCore({ accessToken: MAPBOX_TOKEN });
const sessionToken = new SessionToken();

// Helper to get coordinates from address using Mapbox geocoding
// async function geocodeAddress(
//   address: string
// ): Promise<[number, number] | null> {
//   if (!MAPBOX_TOKEN || !address) return null;
//   const res = await fetch(
//     `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//       address
//     )}.json?access_token=${MAPBOX_TOKEN}&limit=1`
//   );
//   const data = await res.json();
//   if (data.features && data.features[0]) {
//     return data.features[0].center;
//   }
//   return null;
// }

export function useRetrieveMapboxSuggestion() {
  const [retrieved, setRetrieved] = useState<SearchBoxFeatureProperties | null>(
    null,
  );
  const [retrieving, setRetrieving] = useState(false);
  const [retrieveError, setRetrieveError] = useState<string | null>(null);

  const retrieve = useCallback(async (place: SearchBoxSuggestion) => {
    setRetrieving(true);
    setRetrieveError(null);
    setRetrieved(null);
    try {
      const result = await search.retrieve(place, {
        sessionToken,
      });
      setRetrieved(result.features[0].properties);
    } catch (err: unknown) {
      setRetrieveError(err instanceof Error ? err.message : "Unknown error");
      setRetrieved(null);
    } finally {
      setRetrieving(false);
    }
  }, []);

  return { retrieved, retrieving, retrieveError, retrieve };
}
