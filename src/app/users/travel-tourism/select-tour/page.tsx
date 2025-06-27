"use client";
import { useState } from "react";
import { useUserLocation } from "@/hooks/useUserLocation";
import { TourBooking } from "../components/TourBooking";
import { TravelTourismPersonalised } from "../components/TravelTourismPersonalised";

export default function Page() {
  const { location } = useUserLocation();
  const [pickupPoint, setPickupPoint] = useState("");
  const [dropoffPoint, setDropoffPoint] = useState("");
  const [activeField, setActiveField] = useState<"pickup" | "dropoff" | null>(
    null,
  );

  return (
    <div className="">
      <div className="h-[90vh] relative">
        <TourBooking
          pickupPoint={pickupPoint}
          dropoffPoint={dropoffPoint}
          onPickupChange={setPickupPoint}
          onDropoffChange={setDropoffPoint}
          activeField={activeField}
          setActiveField={setActiveField}
          userLocation={location}
        />
      </div>
      <TravelTourismPersonalised />
    </div>
  );
}
