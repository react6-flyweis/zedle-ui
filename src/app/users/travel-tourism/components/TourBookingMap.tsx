"use client";

import { MapPin } from "lucide-react";
import type { FC } from "react";
import MapBoxMap, { Layer, Marker, Source } from "react-map-gl/mapbox";
import { useUserLocation } from "@/hooks/useUserLocation";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
interface TourBookingMapProps {
  pickupCoords: [number, number] | null;
  dropoffCoords: [number, number] | null;
  routeGeoJson: GeoJSON.FeatureCollection | null;
}

export const TourBookingMap: FC<TourBookingMapProps> = ({
  pickupCoords,
  dropoffCoords,
  routeGeoJson,
}) => {
  const { location: userLocation } = useUserLocation();

  if (!userLocation) return null;

  return (
    <MapBoxMap
      initialViewState={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {/* Pickup Marker */}
      {pickupCoords && (
        <Marker
          longitude={pickupCoords[0]}
          latitude={pickupCoords[1]}
          anchor="bottom"
        >
          <MapPin className="text-primary" size={32} />
        </Marker>
      )}
      {/* Dropoff Marker */}
      {dropoffCoords && (
        <Marker
          longitude={dropoffCoords[0]}
          latitude={dropoffCoords[1]}
          anchor="bottom"
        >
          <MapPin className="text-secondary" size={32} />
        </Marker>
      )}
      {/* Route Line */}
      {routeGeoJson && (
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
      )}
      {/* TODO: Render car markers here */}
    </MapBoxMap>
  );
};

export default TourBookingMap;
