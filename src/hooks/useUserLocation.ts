"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useUserLocationStore } from "../store/UserLocationStore";

export function useUserLocation() {
  const t = useTranslations("location");
  const { location, error, setLocation, setError } = useUserLocationStore();

  useEffect(() => {
    if (location) return;
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
  }, [t, location, setLocation, setError]);

  return { location, error };
}
