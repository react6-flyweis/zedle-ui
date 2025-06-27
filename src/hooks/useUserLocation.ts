"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function useUserLocation() {
  const t = useTranslations("location");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(t("geolocationNotSupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setError(t("permissionDenied"));
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError(t("positionUnavailable"));
        } else if (err.code === err.TIMEOUT) {
          setError(t("timeout"));
        } else {
          setError(t("unknownError"));
        }
      },
    );
  }, [t]);

  return { location, error };
}
