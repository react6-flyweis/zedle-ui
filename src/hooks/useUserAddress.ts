// src/hooks/useUserAddress.ts
import { useEffect, useState } from "react";
import { useUserLocation } from "@/hooks/useUserLocation";
import { getAddressFromCoordinates } from "@/lib/mapbox";

export function useUserAddress() {
  const { location } = useUserLocation();
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (location?.latitude && location.longitude) {
      setLoading(true);
      getAddressFromCoordinates(location.latitude, location.longitude)
        .then((addr) => {
          setAddress(`${addr.name}, ${addr.place_formatted}` || null);
          setError(false);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [location]);

  return { address, loading, error };
}
