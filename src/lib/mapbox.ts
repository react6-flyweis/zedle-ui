import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core";
import type {
  SearchBoxFeatureProperties,
  SearchBoxSuggestion,
} from "@mapbox/search-js-core/dist/searchbox/types";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
if (!MAPBOX_TOKEN) throw new Error("Mapbox token is not set");

export const search = new SearchBoxCore({ accessToken: MAPBOX_TOKEN });
export const sessionToken = new SessionToken();

export type { SearchBoxFeatureProperties, SearchBoxSuggestion };

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

export async function getAddressFromCoordinates(
  lat: number,
  lng: number,
): Promise<SearchBoxFeatureProperties> {
  const results = await search.reverse([lng, lat]);
  if (results?.features && results.features.length > 0) {
    return results.features[0].properties;
  }
  throw new Error("No address found");
}
export async function retrieveMapboxSuggestion(
  place: SearchBoxSuggestion,
): Promise<SearchBoxFeatureProperties> {
  const result = await search.retrieve(place, { sessionToken });
  if (result.features?.[0]) {
    return result.features[0].properties;
  }
  throw new Error("No address found");
}
export async function suggestMapbox(
  query: string,
  options: {
    limit?: number;
    types?: string;
    navigation_profile?: "driving" | "walking" | "cycling";
    origin?: [number, number];
  } = {},
): Promise<SearchBoxSuggestion[]> {
  const res = await search.suggest(query, {
    limit: options.limit ?? 5,
    types:
      options.types ??
      "place,address,postcode,locality,neighborhood,street,block",
    sessionToken,
    navigation_profile: options.navigation_profile ?? "driving",
    origin: options.origin,
  });
  return res.suggestions || [];
}
export async function getMapboxRoute(
  pickupCoords: [number, number] | null,
  dropoffCoords: [number, number] | null,
): Promise<GeoJSON.FeatureCollection<GeoJSON.Geometry> | null> {
  if (!pickupCoords || !dropoffCoords || !MAPBOX_TOKEN) {
    return null;
  }
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords[0]},${pickupCoords[1]};${dropoffCoords[0]},${dropoffCoords[1]}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.routes?.[0]?.geometry) {
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: data.routes[0].geometry,
          properties: {},
        },
      ],
    };
  }
  return null;
}
