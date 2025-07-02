"use client";
import MapBoxMap, { Marker } from "react-map-gl/mapbox";
import { useUserLocation } from "@/hooks/useUserLocation";
import "mapbox-gl/dist/mapbox-gl.css";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import carLocate from "../assets/car-locate.png";
import { StatusToggle } from "./StatusToggle";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export const LocatorMap = () => {
  const { location: userLocation } = useUserLocation();
  const mapRef = useRef<any>(null);

  const handleLocate = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 15,
        essential: true,
      });
    }
  };

  return (
    <MapBoxMap
      ref={mapRef}
      initialViewState={{
        longitude: userLocation?.longitude || 0,
        latitude: userLocation?.latitude || 0,
        zoom: 12,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {/* User location marker */}
      {userLocation && (
        <Marker
          longitude={userLocation.longitude}
          latitude={userLocation.latitude}
          anchor="bottom"
        >
          <Image
            src={carLocate}
            alt="User Location"
            width={50}
            height={50}
            className="rotate-90 max-h-10 max-w-10 object-contain"
          />
        </Marker>
      )}

      {/* TODO: Render  Ride start markers here */}
      {/* {pickupCoords &&
        Number.isFinite(pickupCoords[0]) &&
        Number.isFinite(pickupCoords[1]) && (
          <Marker
            longitude={pickupCoords[0]}
            latitude={pickupCoords[1]}
            anchor="bottom"
          >
            <MapPin className="text-primary" size={32} />
          </Marker>
        )} */}

      <div className="absolute top-4 right-4 z-10">
        <StatusToggle />
      </div>

      {/* your location locator */}
      <Button
        className="absolute bottom-30 left-12 size-14 right-0 p-4 rounded-full flex justify-center items-center bg-black hover:bg-black/80 z-10"
        onClick={handleLocate}
      >
        {/* Ripple animation */}
        <span className="absolute inset-0 rounded-full bg-black/20 animate-ping z-0 duration-[2000]" />
        <span className="absolute inset-0 rounded-full bg-black/30 animate-ping z-0 delay-300 duration-[2000]" />
        <span className="absolute inset-0 rounded-full bg-black/20 animate-ping z-0 delay-600 duration-[2000]" />
        <Image
          src={carLocate}
          alt=""
          width={50}
          height={50}
          className="rotate-90 max-h-10 max-w-10 object-contain z-10"
        />
      </Button>
    </MapBoxMap>
  );
};
