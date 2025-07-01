"use client";

import { MapPin } from "lucide-react";
import type { FC } from "react";
import { useMemo } from "react";
import MapBoxMap, { Layer, Marker, Source } from "react-map-gl/mapbox";
import { useUserLocation } from "@/hooks/useUserLocation";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
interface PickupDropMapProps {
  pickupCoords: [number, number] | null;
  dropoffCoords: [number, number] | null;
  routeGeoJson: GeoJSON.FeatureCollection | null;
}

export const PickupDropMap: FC<PickupDropMapProps> = ({
  pickupCoords,
  dropoffCoords,
  routeGeoJson,
}) => {
  const { location: userLocation } = useUserLocation();
  // Calculate bounds to fit both pickup and dropoff
  const bounds = useMemo(() => {
    if (pickupCoords && dropoffCoords) {
      const lons = [pickupCoords[0], dropoffCoords[0]];
      const lats = [pickupCoords[1], dropoffCoords[1]];
      return [
        [Math.min(...lons), Math.min(...lats)],
        [Math.max(...lons), Math.max(...lats)],
      ];
    }
    return null;
  }, [pickupCoords, dropoffCoords]);

  if (!userLocation) return null;

  return (
    <MapBoxMap
      {...(bounds
        ? {
            // @ts-ignore
            bounds,
            fitBoundsOptions: { padding: 80 },
          }
        : {
            initialViewState: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              zoom: 14,
            },
          })}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {/* Pickup Marker */}
      {pickupCoords &&
        Number.isFinite(pickupCoords[0]) &&
        Number.isFinite(pickupCoords[1]) && (
          <Marker
            longitude={pickupCoords[0]}
            latitude={pickupCoords[1]}
            anchor="bottom"
          >
            <MapPin className="text-primary" size={32} />
          </Marker>
        )}
      {/* Dropoff Marker */}
      {dropoffCoords &&
        Number.isFinite(dropoffCoords[0]) &&
        Number.isFinite(dropoffCoords[1]) && (
          <Marker
            longitude={dropoffCoords[0]}
            latitude={dropoffCoords[1]}
            anchor="bottom"
          >
            <MapPin className="text-green-500" size={32} />
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

export default PickupDropMap;
