"use client";

import type { SearchBoxFeatureProperties } from "@mapbox/search-js-core/dist/searchbox/types";
import { useState } from "react";
import { PriceQuotationsDialog } from "../../logistics/components/PriceQuotationDialog";
import { useMapboxRoute } from "../hooks/useMapboxRoute";
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
  const [pickupPoint, setPickupPoint] = useState<string>("");
  const [dropoffPoint, setDropoffPoint] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // Use custom hook for route fetching
  const routeGeoJson = useMapboxRoute({
    pickupCoords,
    dropoffCoords,
  });

  // Handlers for form
  const handlePickupChange = (value: SearchBoxFeatureProperties | null) => {
    setPickupPoint(value?.mapbox_id || "");
    setPickupCoords(
      value?.coordinates
        ? [value.coordinates.longitude, value.coordinates.latitude]
        : null,
    );
  };
  const handleDropoffChange = (value: SearchBoxFeatureProperties | null) => {
    setDropoffPoint(value?.mapbox_id || "");
    setDropoffCoords(
      value?.coordinates
        ? [value.coordinates.longitude, value.coordinates.latitude]
        : null,
    );
  };
  const handleDateChange = (value: string) => {
    setDate(value);
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
        {/* Booking Card overlays map */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-full max-w-5xl px-2">
          {/* Form Side */}
          <TourBookingForm
            onPickupChange={handlePickupChange}
            onDropoffChange={handleDropoffChange}
            onDateChange={handleDateChange}
            onSubmit={handleFormSubmit}
            pickupPoint={pickupPoint}
            dropoffPoint={dropoffPoint}
            date={date}
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
