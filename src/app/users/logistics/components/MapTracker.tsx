"use client";

import MapboxMap, {
  Layer,
  Marker,
  NavigationControl,
  Source,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { cn } from "@/lib/utils";

import truckPointerImage from "../assets/truck-pointer.png";
import type { ITrackingStep } from "../types/tracking";

interface MapTrackerProps {
  className?: string;
  trackingSteps?: ITrackingStep[];
}

export const MapTracker = ({ trackingSteps = [] }: MapTrackerProps) => {
  const currentLocation = trackingSteps.find(
    (step) => step.status === "current",
  );
  const initialViewState = {
    longitude: currentLocation?.location.coordinates?.longitude || 0,
    latitude: currentLocation?.location.coordinates?.latitude || 0,
    zoom: 10,
    pitch: 0,
    bearing: 0,
  };

  const indexOfCurrentStep = trackingSteps.findIndex(
    (step) => step.status === "current",
  );

  const routeCoordinatesBeforeCurrent = trackingSteps
    .slice(0, indexOfCurrentStep + 1)
    .map((step) => [
      step.location.coordinates?.longitude || 0,
      step.location.coordinates?.latitude || 0,
    ]);

  const routeCoordinatesAfterCurrent = trackingSteps
    .slice(indexOfCurrentStep)
    .map((step) => [
      step.location.coordinates?.longitude || 0,
      step.location.coordinates?.latitude || 0,
    ]);

  console.log({
    trackingSteps,
    currentLocation,
    indexOfCurrentStep,
    routeCoordinatesBeforeCurrent,
    routeCoordinatesAfterCurrent,
  });

  const geoJsonBefore: GeoJSON.Feature<GeoJSON.LineString> = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: routeCoordinatesBeforeCurrent,
    },
    properties: {},
  };

  const geoJsonAfter: GeoJSON.Feature<GeoJSON.LineString> = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: routeCoordinatesAfterCurrent,
    },
    properties: {},
  };

  return (
    <div className="h-70 w-full rounded-md overflow-hidden">
      <MapboxMap
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <NavigationControl position="top-left" />

        {/* Render tracking steps on the map */}
        {trackingSteps.length &&
          [
            trackingSteps[0],
            currentLocation,
            trackingSteps[trackingSteps.length - 1],
          ]
            .filter(Boolean)
            .map((step) => (
              <Marker
                key={step!.id}
                longitude={step!.location.coordinates?.longitude || 0}
                latitude={step!.location.coordinates?.latitude || 0}
              >
                {step!.status === "current" ? (
                  <Image
                    src={truckPointerImage.src}
                    alt="Truck Pointer"
                    className="max-w-24 max-h-16"
                    height={64}
                    width={64}
                  />
                ) : (
                  <div
                    className={cn(
                      "group relative size-8 rounded-full flex justify-center items-center cursor-pointer",
                      step!.status === "completed"
                        ? "bg-orange-500"
                        : "bg-violet-500",
                    )}
                  >
                    <div className={"size-5 rounded-full bg-white"}></div>
                    <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max min-w-[180px] -translate-x-1/2 rounded-md bg-background px-4 py-2 text-sm shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="font-semibold">{step!.title}</div>
                      <div className="text-muted-foreground">
                        {step!.status}
                      </div>
                      {step!.location.city && (
                        <div className="mt-1">{step!.location.city}</div>
                      )}
                    </div>
                  </div>
                )}
              </Marker>
            ))}
        {/* Draw route line */}
        <Source id="route" type="geojson" data={geoJsonBefore}>
          {routeCoordinatesBeforeCurrent.length && (
            <Layer
              id="route"
              type="line"
              paint={{
                // orange-500
                "line-color": "#f97316",
                "line-width": 6,
              }}
            />
          )}
        </Source>
        <Source id="route-after" type="geojson" data={geoJsonAfter}>
          {routeCoordinatesAfterCurrent.length && (
            <Layer
              id="route-after"
              type="line"
              paint={{
                // violet-500
                "line-color": "#8b5cf6",
                "line-width": 6,
              }}
            />
          )}
        </Source>
      </MapboxMap>
    </div>
  );
};
