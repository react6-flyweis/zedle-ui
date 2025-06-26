"use client";

import { MapPin } from "lucide-react";
import MapBoxMap, { Marker } from "react-map-gl/mapbox";
import { Card, CardContent } from "@/components/ui/card";

// import dynamic from "next/dynamic";
// const ReactMapGL = dynamic(() => import("react-map-gl/mapbox"), { ssr: false });

interface LocationSectionProps {
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  title,
  subtitle,
  address,
  phone,
  latitude,
  longitude,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-6 mt-10 h-[400px]">
      <div className="relative w-full md-full h-full rounded overflow-hidden shadow-lg">
        <MapBoxMap
          initialViewState={{
            latitude,
            longitude,
            zoom: 14,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        >
          <Marker latitude={latitude} longitude={longitude} anchor="center">
            <div className="bg-white size-8 p-2 rounded-full shadow-md">
              <MapPin className="text-red-500 size-8" />
            </div>
          </Marker>
        </MapBoxMap>
        <Card className="absolute left-10 top-0 w-72 bg-gray-700 rounded text-white shadow-lg flex items-center justify-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-1">{title}</h3>
            <div className="text-muted-foreground text-lg mb-4">{subtitle}</div>
            <div className="text-base mb-4">{address}</div>
            <div className="font-semibold mb-1">Phone number</div>
            <div className="text-base">{phone}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
