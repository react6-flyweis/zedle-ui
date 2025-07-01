"use client";

import type { SearchBoxFeatureProperties } from "@mapbox/search-js-core/dist/searchbox/types";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useMapboxRoute } from "@/hooks/useMapboxRoute";

import { PriceQuotationsDialog } from "../../logistics/components/PriceQuotationDialog";
import { TourBookingForm } from "./TourBookingForm";
import { TourBookingMap } from "./TourBookingMap";

export const TourBooking = () => {
  const [quotationDialogOpen, setQuotationDialogOpen] = useState(false);
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(
    null,
  );
  const [dropoffCoords, setDropoffCoords] = useState<[number, number] | null>(
    null,
  );

  const t = useTranslations("tourBooking");

  // Use custom hook for route fetching
  const {
    routeGeoJson,
    loading: routeLoading,
    error: routeError,
  } = useMapboxRoute({
    pickupCoords,
    dropoffCoords,
  });

  // Handlers for form
  const handlePickupChange = (value: SearchBoxFeatureProperties | null) => {
    setPickupCoords(
      value?.coordinates
        ? [value.coordinates.longitude, value.coordinates.latitude]
        : null,
    );
  };
  const handleDropoffChange = (value: SearchBoxFeatureProperties | null) => {
    setDropoffCoords(
      value?.coordinates
        ? [value.coordinates.longitude, value.coordinates.latitude]
        : null,
    );
  };

  const handleFormSubmit = () => {
    setQuotationDialogOpen(true);
  };

  return (
    <div className="w-full">
      <div className="h-[90vh] relative mb-6">
        {/* Map Side */}
        <TourBookingMap
          pickupCoords={pickupCoords}
          dropoffCoords={dropoffCoords}
          routeGeoJson={routeGeoJson}
        />
        {/* Loading and Error States */}
        {routeLoading && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-background/80 border border-border shadow">
              <span className="animate-spin text-primary">
                <Loader2 size={20} aria-label={t("loaderIconAlt")} />
              </span>
              <span>{t("routeLoading")}</span>
            </div>
          </div>
        )}
        {routeError && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-destructive/80 border border-destructive text-destructive-foreground shadow">
              <AlertTriangle size={20} aria-label={t("alertIconAlt")} />
              <span>{t("routeError")}</span>
            </div>
          </div>
        )}
        {/* Booking Card overlays map */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-full max-w-5xl px-2">
          {/* Form Side */}
          <TourBookingForm
            onPickupChange={handlePickupChange}
            onDropoffChange={handleDropoffChange}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
      <PriceQuotationsDialog
        open={quotationDialogOpen}
        onOpenChange={setQuotationDialogOpen}
      />
    </div>
  );
};
