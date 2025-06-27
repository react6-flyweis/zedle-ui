"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftRight, Calendar, MapPin, Plus } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import MapBoxMap, { Layer, Marker, Source } from "react-map-gl/mapbox";
import { z } from "zod";
import logisticTruckIcon from "@/assets/icons/logistic-truck.png";
import { AnimatedInput } from "@/components/ui/animated-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PriceQuotationsDialog } from "../../logistics/components/PriceQuotationDialog";

interface PlaceSuggestion {
  id: string;
  place_name: string;
}

interface TourBookingProps {
  pickupPoint: string;
  dropoffPoint: string;
  onPickupChange: (value: string) => void;
  onDropoffChange: (value: string) => void;
  activeField: "pickup" | "dropoff" | null;
  setActiveField: (field: "pickup" | "dropoff" | null) => void;
  userLocation?: { latitude: number; longitude: number } | null;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const fetchSuggestions = async (query: string): Promise<PlaceSuggestion[]> => {
  if (!query || !MAPBOX_TOKEN) return [];
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query,
    )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`,
  );
  const data = await res.json();
  return data.features || [];
};

const TourBooking = ({
  pickupPoint,
  dropoffPoint,
  onPickupChange,
  onDropoffChange,
  activeField,
  setActiveField,
  userLocation,
}: TourBookingProps) => {
  const t = useTranslations("tourBooking");
  const tourBookingSchema = z.object({
    pickupPoint: z.string().min(1, t("pickupPointRequired")),
    dropoffPoint: z.string().min(1, t("dropoffPointRequired")),
    date: z.string().min(1, t("dateRequired")),
    promoCode: z.string().optional(),
  });
  type TourBookingFormValues = z.infer<typeof tourBookingSchema>;
  const form = useForm<TourBookingFormValues>({
    resolver: zodResolver(tourBookingSchema),
    defaultValues: {
      pickupPoint: pickupPoint || "",
      dropoffPoint: dropoffPoint || "",
      date: "",
      promoCode: "",
    },
  });

  const [quotationDialogOpen, setQuotationDialogOpen] = useState(false);

  // Autocomplete state
  const [pickupSuggestions, setPickupSuggestions] = useState<PlaceSuggestion[]>(
    [],
  );
  const [dropoffSuggestions, setDropoffSuggestions] = useState<
    PlaceSuggestion[]
  >([]);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);

  // Map state
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(
    null,
  );
  const [dropoffCoords, setDropoffCoords] = useState<[number, number] | null>(
    null,
  );
  const [routeGeoJson, setRouteGeoJson] = useState<any>(null);

  // Fetch suggestions
  useEffect(() => {
    if (activeField === "pickup" && pickupPoint) {
      fetchSuggestions(pickupPoint).then(setPickupSuggestions);
    } else {
      setPickupSuggestions([]);
    }
  }, [pickupPoint, activeField]);
  useEffect(() => {
    if (activeField === "dropoff" && dropoffPoint) {
      fetchSuggestions(dropoffPoint).then(setDropoffSuggestions);
    } else {
      setDropoffSuggestions([]);
    }
  }, [dropoffPoint, activeField]);

  // Helper to get coordinates from address using Mapbox geocoding
  async function geocodeAddress(
    address: string,
  ): Promise<[number, number] | null> {
    if (!MAPBOX_TOKEN || !address) return null;
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address,
      )}.json?access_token=${MAPBOX_TOKEN}&limit=1`,
    );
    const data = await res.json();
    if (data.features && data.features[0]) {
      return data.features[0].center;
    }
    return null;
  }

  // Update coordinates when address changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (pickupPoint) {
      geocodeAddress(pickupPoint).then(setPickupCoords);
    } else {
      setPickupCoords(null);
    }
  }, [pickupPoint]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (dropoffPoint) {
      geocodeAddress(dropoffPoint).then(setDropoffCoords);
    } else {
      setDropoffCoords(null);
    }
  }, [dropoffPoint]);

  // Fetch real route from Mapbox Directions API
  useEffect(() => {
    const getRoute = async () => {
      if (!pickupCoords || !dropoffCoords || !MAPBOX_TOKEN) {
        setRouteGeoJson(null);
        return;
      }
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords[0]},${pickupCoords[1]};${dropoffCoords[0]},${dropoffCoords[1]}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.routes && data.routes[0] && data.routes[0].geometry) {
        setRouteGeoJson({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: data.routes[0].geometry,
              properties: {},
            },
          ],
        });
      } else {
        setRouteGeoJson(null);
      }
    };
    getRoute();
  }, [pickupCoords, dropoffCoords]);

  // Reverse geocode for map click
  async function reverseGeocode(lng: number, lat: number): Promise<string> {
    if (!MAPBOX_TOKEN) return "";
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`,
    );
    const data = await res.json();
    return data.features?.[0]?.place_name || "";
  }

  // Handle map click
  const handleMapClick = async (e: any) => {
    const lngLat = e.lngLat || e.lngLatWrap || e;
    if (!lngLat) return;
    const lng = lngLat.lng ?? lngLat[0];
    const lat = lngLat.lat ?? lngLat[1];
    const address = await reverseGeocode(lng, lat);
    if (activeField === "pickup") onPickupChange(address);
    if (activeField === "dropoff") onDropoffChange(address);
  };

  // Handle selection
  const handlePickupSelect = (place: PlaceSuggestion) => {
    onPickupChange(place.place_name);
    setShowPickupDropdown(false);
  };
  const handleDropoffSelect = (place: PlaceSuggestion) => {
    onDropoffChange(place.place_name);
    setShowDropoffDropdown(false);
  };

  return (
    <div className="w-full">
      <div className="h-[90vh] relative mb-6">
        {userLocation && (
          <MapBoxMap
            initialViewState={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              zoom: 14,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            onClick={handleMapClick}
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
            {/* Real Route Line */}
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
        )}
        {/* Booking Card overlays map */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-full max-w-5xl px-2">
          <Card className="w-full gap-0">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Image
                  src={logisticTruckIcon}
                  alt={t("logisticsTruckIconAlt")}
                  className="max-h-8 max-w-8"
                />
                <CardTitle className="font-medium text-lg  border-b-2 border-primary pb-1">
                  {t("getDriversQuotation")}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(() => {
                    setQuotationDialogOpen(true);
                  })}
                  className="flex flex-col items-end gap-4"
                >
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Pickup Point */}
                    <FormField
                      control={form.control}
                      name="pickupPoint"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">
                            {t("pickupPoint")}
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <AnimatedInput
                                {...field}
                                ref={pickupInputRef}
                                value={pickupPoint}
                                onChange={(e) => {
                                  onPickupChange(e.target.value);
                                  field.onChange(e);
                                  setActiveField("pickup");
                                  setShowPickupDropdown(true);
                                }}
                                onFocus={() => {
                                  setActiveField("pickup");
                                  setShowPickupDropdown(true);
                                }}
                                placeholder={t("pickupPoint")}
                                className="pr-10 rounded-none"
                              />
                            </FormControl>
                            <ArrowLeftRight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            {showPickupDropdown &&
                              pickupSuggestions.length > 0 && (
                                <ul className="absolute left-0 right-0 top-full z-20 bg-background border rounded shadow mt-1 max-h-48 overflow-auto">
                                  {pickupSuggestions.map((s) => (
                                    <li
                                      key={s.id}
                                      className="px-3 py-2 cursor-pointer hover:bg-accent"
                                      onClick={() => handlePickupSelect(s)}
                                      // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                                      tabIndex={0}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          handlePickupSelect(s);
                                      }}
                                    >
                                      {s.place_name}
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </div>
                        </FormItem>
                      )}
                    />
                    {/* Dropoff Point */}
                    <FormField
                      control={form.control}
                      name="dropoffPoint"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">
                            {t("dropoffPoint")}
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <AnimatedInput
                                {...field}
                                ref={dropoffInputRef}
                                value={dropoffPoint}
                                onChange={(e) => {
                                  onDropoffChange(e.target.value);
                                  field.onChange(e);
                                  setActiveField("dropoff");
                                  setShowDropoffDropdown(true);
                                }}
                                onFocus={() => {
                                  setActiveField("dropoff");
                                  setShowDropoffDropdown(true);
                                }}
                                placeholder={t("dropoffPoint")}
                                className="pr-10 rounded-none"
                              />
                            </FormControl>
                            <ArrowLeftRight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            {showDropoffDropdown &&
                              dropoffSuggestions.length > 0 && (
                                <ul className="absolute left-0 right-0 top-full z-20 bg-background border rounded shadow mt-1 max-h-48 overflow-auto">
                                  {dropoffSuggestions.map((s) => (
                                    <li
                                      key={s.id}
                                      className="px-3 py-2 cursor-pointer hover:bg-accent"
                                      onClick={() => handleDropoffSelect(s)}
                                      // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
                                      tabIndex={0}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          handleDropoffSelect(s);
                                      }}
                                    >
                                      {s.place_name}
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </div>
                        </FormItem>
                      )}
                    />
                    {/* Date */}
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">{t("date")}</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <AnimatedInput
                                {...field}
                                placeholder={t("date")}
                                className="pr-10 rounded-none"
                              />
                            </FormControl>
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost">
                      <Plus className="h-4 w-4 mr-1" />
                      {t("addPromoCode")}
                    </Button>
                    <Button type="submit">{t("next")}</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <PriceQuotationsDialog
        open={quotationDialogOpen}
        onOpenChange={setQuotationDialogOpen}
      />
    </div>
  );
};

export { TourBooking };
