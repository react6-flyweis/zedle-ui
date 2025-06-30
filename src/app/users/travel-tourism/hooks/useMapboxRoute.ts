import { useEffect, useState } from "react";

interface UseMapboxRouteOptions {
  pickupCoords: [number, number] | null;
  dropoffCoords: [number, number] | null;
  mapboxToken: string;
}

export function useMapboxRoute({
  pickupCoords,
  dropoffCoords,
  mapboxToken,
}: UseMapboxRouteOptions) {
  const [routeGeoJson, setRouteGeoJson] =
    useState<GeoJSON.FeatureCollection<GeoJSON.Geometry> | null>(null);

  useEffect(() => {
    const getRoute = async () => {
      if (!pickupCoords || !dropoffCoords || !mapboxToken) {
        setRouteGeoJson(null);
        return;
      }
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords[0]},${pickupCoords[1]};${dropoffCoords[0]},${dropoffCoords[1]}?geometries=geojson&access_token=${mapboxToken}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.routes?.[0]?.geometry) {
        setRouteGeoJson({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: data.routes[0].geometry,
              properties: {},
            },
          ],
        });
      } else {
        setRouteGeoJson(null);
      }
    };
    getRoute();
  }, [pickupCoords, dropoffCoords, mapboxToken]);

  return routeGeoJson;
}
