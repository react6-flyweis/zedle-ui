"use client";

import { throttle } from "lodash-es";
import { useCallback, useRef, useState } from "react";
import type { MapRef, ViewState } from "react-map-gl/mapbox";
import MapBoxMap from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

interface LocationProps {
  value: {
    latitude: number;
    longitude: number;
  };
  onChange?: (latitude: number, longitude: number) => void;
}

export const MapInput: React.FC<LocationProps> = ({ value, onChange }) => {
  const [viewState, setViewState] = useState<
    ViewState & { width: number; height: number; padding?: number | undefined }
  >({
    latitude: value.latitude,
    longitude: value.longitude,
    zoom: 14,
    bearing: 0,
    pitch: 0,
    width: 600, // Set a default width, can be updated dynamically
    height: 400, // Set a default height, can be updated dynamically
    padding: 0,
  });
  const mapRef = useRef<MapRef | null>(null);

  // Throttle the handleMove callback to limit update frequency
  const throttledHandleMove = useCallback(
    throttle((evt: { viewState: ViewState & { padding?: unknown } }) => {
      setViewState((prev) => ({
        ...prev,
        ...evt.viewState,
        padding:
          typeof evt.viewState.padding === "number"
            ? evt.viewState.padding
            : prev.padding,
      }));
      if (onChange) {
        onChange(evt.viewState.latitude, evt.viewState.longitude);
      }
    }, 200),
    [],
  );

  return (
    <div className="relative w-full h-full">
      <MapBoxMap
        ref={mapRef}
        initialViewState={viewState}
        viewState={viewState}
        onMove={throttledHandleMove}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-10">
        <span className="text-2xl">📍</span>
      </div>
    </div>
  );
};
