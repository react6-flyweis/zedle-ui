// src/utils/mapbox.ts
import { SearchBoxCore } from "@mapbox/search-js-core";
import type { SearchBoxFeatureProperties } from "@mapbox/search-js-core/dist/searchbox/types";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
if (!MAPBOX_TOKEN) throw new Error("Mapbox token is not set");

const searchBox = new SearchBoxCore({ accessToken: MAPBOX_TOKEN });

export async function getAddressFromCoordinates(
  lat: number,
  lng: number,
): Promise<SearchBoxFeatureProperties> {
  const results = await searchBox.reverse([lng, lat]);
  if (results?.features && results.features.length > 0) {
    return results.features[0].properties;
  }
  throw new Error("No address found");
}
