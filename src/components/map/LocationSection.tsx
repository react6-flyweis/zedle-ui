"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import MapBoxMap, { Marker } from "react-map-gl/mapbox";
import mapPointerImage from "@/assets/icons/map-pointer.png";
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
  const t = useTranslations();
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
            <Card className="relative gap-0 p-5 w-44">
              <p className="font-semibold">
                {t("locationSection.title", { title })}
              </p>
              <p className="">{t("locationSection.subtitle", { subtitle })}</p>

              <div className="absolute -right-5 -top-5 bg-gray-800 size-12 flex justify-center item-center p-2 rounded-full shadow-md">
                <Image
                  src={mapPointerImage}
                  alt={t("locationSection.mapPointerAlt")}
                  className="max-h-10 max-w-10"
                  width={60}
                  height={60}
                />
              </div>
            </Card>
          </Marker>
        </MapBoxMap>
        <Card className="absolute left-0 md:left-10 top-0 w-52 md:w-72 bg-gray-700 rounded text-white shadow-lg flex items-center justify-center">
          <CardContent className="p-4">
            <h3 className="text-2xl font-bold mb-1">{title}</h3>
            <div className="text-muted-foreground text-lg mb-4">
              {" "}
              {subtitle}
            </div>
            <div className="text-base mb-4">{address}</div>
            <div className="font-semibold mb-1">
              {t("locationSection.phoneLabel")}
            </div>
            <div className="text-base">{phone}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
