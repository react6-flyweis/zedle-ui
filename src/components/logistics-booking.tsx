"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMapboxRoute } from "@/hooks/useMapboxRoute";
import type { GeoCoordinates } from "@/types/geo";
import { LogisticsBookingForm } from "./LogisticsBookingForm";
import PickupDropMap from "./map/PickupDropMap";

export function LogisticsBooking({ withMap = false }: { withMap?: boolean }) {
  const router = useRouter();
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(
    null,
  );
  const [dropoffCoords, setDropoffCoords] = useState<[number, number] | null>(
    null,
  );
  const { routeGeoJson } = useMapboxRoute({
    pickupCoords,
    dropoffCoords,
  });

  // Handlers for form
  const handlePickupChange = (value: GeoCoordinates | null) => {
    setPickupCoords(value ? [value.longitude, value.latitude] : null);
  };
  const handleDropoffChange = (value: GeoCoordinates | null) => {
    setDropoffCoords(value ? [value.longitude, value.latitude] : null);
  };

  const handleFormSubmit = () => {
    router.push("/users/logistics/add-package");
  };
  return (
    <div className="relative">
      {withMap && (
        <div className="h-[85vh]">
          <PickupDropMap
            pickupCoords={pickupCoords}
            dropoffCoords={dropoffCoords}
            routeGeoJson={routeGeoJson}
          />
        </div>
      )}
      <div className={withMap ? "absolute bottom-0 left-0 w-full z-10" : ""}>
        <LogisticsBookingForm
          onPickupChange={handlePickupChange}
          onDropoffChange={handleDropoffChange}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
