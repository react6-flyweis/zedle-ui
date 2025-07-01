import { useEffect, useState } from "react";
import { getMapboxRoute } from "@/lib/mapbox";

interface UseMapboxRouteOptions {
  pickupCoords: [number, number] | null;
  dropoffCoords: [number, number] | null;
}

export function useMapboxRoute({
  pickupCoords,
  dropoffCoords,
}: UseMapboxRouteOptions) {
  const [routeGeoJson, setRouteGeoJson] =
    useState<GeoJSON.FeatureCollection<GeoJSON.Geometry> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pickupCoords || !dropoffCoords) {
      setRouteGeoJson(null);
      setError(null);
      setLoading(false);
      return;
    }
    const getRoute = async () => {
      setLoading(true);
      setError(null);
      try {
        const geoJson = await getMapboxRoute(pickupCoords, dropoffCoords);
        setRouteGeoJson(geoJson);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setRouteGeoJson(null);
      } finally {
        setLoading(false);
      }
    };
    getRoute();
  }, [pickupCoords, dropoffCoords]);

  return { routeGeoJson, loading, error };
}
