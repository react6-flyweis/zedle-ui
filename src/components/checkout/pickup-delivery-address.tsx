"use client";

import { Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AddressInfo {
  id: string;
  type: "home" | "work" | "other";
  address: string;
  city: string;
  state: string;
  zipCode: string;
  estimatedTime: string;
}

interface PickupDeliveryAddressProps {
  pickupAddress: AddressInfo;
  deliveryAddress: AddressInfo;
  onPickupSelect: () => void;
  onDeliverySelect: () => void;
  selectedPickupId?: string;
  selectedDeliveryId?: string;
}

export default function PickupDeliveryAddress({
  pickupAddress,
  deliveryAddress,
  onPickupSelect,
  onDeliverySelect,
  selectedPickupId,
  selectedDeliveryId,
}: PickupDeliveryAddressProps) {
  const getAddressIcon = (type: "home" | "work" | "other") => {
    switch (type) {
      case "home":
        return <Home className="w-5 h-5 text-red-500" />;
      case "work":
        return <MapPin className="w-5 h-5 text-red-500" />;
      default:
        return <MapPin className="w-5 h-5 text-red-500" />;
    }
  };

  const formatAddress = (address: AddressInfo) => {
    return `${address.address}, ${address.city}, ${address.state} ${address.zipCode}, United States`;
  };

  return (
    <Card className="rounded-none shadow-none gap-0">
      <CardHeader className="relative">
        <div className="absolute size-12 bg-black -left-10 top-0 flex items-center justify-center">
          <MapPin className="size-6 text-white" />
        </div>
      </CardHeader>
      <CardContent className="flex items-start gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup Address */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-gray-900">
              Pickup address
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              You seem to be in the new location
            </p>
          </div>

          <div className="">
            <h3 className="font-semibold text-lg text-gray-900">
              Delivery address
            </h3>
          </div>

          <div className="space-y-3 border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex items-center gap-2">
              {getAddressIcon(pickupAddress.type)}
              <span className="font-medium text-gray-900 capitalize">
                {pickupAddress.type}
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {formatAddress(pickupAddress)}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-900">
                  {pickupAddress.estimatedTime}
                </span>
              </div>

              <Button
                onClick={onPickupSelect}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedPickupId === pickupAddress.id
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                PICKUP HERE
              </Button>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              {getAddressIcon(deliveryAddress.type)}
              <span className="font-medium text-gray-900 capitalize">
                {deliveryAddress.type}
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {formatAddress(deliveryAddress)}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-900">
                  {deliveryAddress.estimatedTime}
                </span>
              </div>

              <Button
                onClick={onDeliverySelect}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedDeliveryId === deliveryAddress.id
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                DELIVER HERE
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
