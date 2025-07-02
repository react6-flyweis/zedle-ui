"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import MapBoxMap, { type MapRef, Marker } from "react-map-gl/mapbox";

import { useUserLocation } from "@/hooks/useUserLocation";

import "mapbox-gl/dist/mapbox-gl.css";

import type { GeoCoordinates } from "@/types/geo";
import dropMarker from "../assets/drop-marker.png";
import pickupMarker from "../assets/pickup-marker.png";
import riderMarker from "../assets/rider-marker.png";

// import { useMapboxRoute } from "@/hooks/useMapboxRoute";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export const ParcelPickupDropMap = ({
  pickupCoords,
  dropoffCoords,
}: {
  pickupCoords: GeoCoordinates;
  dropoffCoords: GeoCoordinates;
}) => {
  const { location: userLocation } = useUserLocation();
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const points = [pickupCoords, dropoffCoords, userLocation].filter(
      (pt) =>
        pt && Number.isFinite(pt.longitude) && Number.isFinite(pt.latitude),
    ) as GeoCoordinates[];
    if (points.length < 2) return;
    const lons = points.map((p) => p.longitude);
    const lats = points.map((p) => p.latitude);
    const bounds: [number, number, number, number] = [
      Math.min(...lons),
      Math.min(...lats),
      Math.max(...lons),
      Math.max(...lats),
    ];
    mapRef.current.fitBounds(bounds, { padding: 80, duration: 800 });
  }, [pickupCoords, dropoffCoords, userLocation]);

  // const { routeGeoJson } = useMapboxRoute({
  //   start: userLocation
  //     ? [userLocation.longitude, userLocation.latitude]
  //     : null,
  //   end: dropoffCoords
  //     ? [dropoffCoords.longitude, dropoffCoords.latitude]
  //     : null,
  //   midpoints: pickupCoords
  //     ? [[pickupCoords.longitude, pickupCoords.latitude]]
  //     : [],
  // });

  return (
    <MapBoxMap
      ref={mapRef}
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
            src={riderMarker}
            alt="User Location"
            width={50}
            height={50}
            className="max-h-12 max-w-12 object-contain"
          />
        </Marker>
      )}

      {/* TODO: Render  Ride start markers here */}
      {pickupCoords &&
        Number.isFinite(pickupCoords.longitude) &&
        Number.isFinite(pickupCoords.latitude) && (
          <Marker
            longitude={pickupCoords.longitude}
            latitude={pickupCoords.latitude}
            anchor="bottom"
          >
            <Image
              src={pickupMarker}
              alt="Pickup Location"
              width={50}
              height={50}
              className="max-h-12 max-w-12 object-contain"
            />
          </Marker>
        )}
      {dropoffCoords &&
        Number.isFinite(dropoffCoords.longitude) &&
        Number.isFinite(dropoffCoords.latitude) && (
          <Marker
            longitude={dropoffCoords.longitude}
            latitude={dropoffCoords.latitude}
            anchor="bottom"
          >
            <Image
              src={dropMarker}
              alt="Dropoff Location"
              width={50}
              height={50}
              className="max-h-12 max-w-12 object-contain"
            />
          </Marker>
        )}
      {/* Route Line */}
      {/* {routeGeoJson && (
        <Source id="route" type="geojson" data={routeGeoJson}>
          <Layer
            id="route-line"
            type="line"
            paint={{
              "line-color": "#3b82f6",
              "line-width": 4,
            }}
          />
        </Source>
      )} */}
    </MapBoxMap>
  );
};
