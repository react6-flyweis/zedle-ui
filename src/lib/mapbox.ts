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
