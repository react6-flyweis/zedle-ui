"use client";

import { Briefcase, Home, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AddressDrawer } from "./address-drawer";

interface SavedAddress {
  id: string;
  address: string;
  doorNumber: string;
  area: string;
  zipCode: string;
  type: "home" | "work" | "other";
}

interface DeliveryAddressProps {
  onAddressSelect: (addressId: string | null) => void;
  selectedAddressId: string | null;
}

export default function DeliveryAddress({
  onAddressSelect,
  selectedAddressId,
}: DeliveryAddressProps) {
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([
    {
      id: "1",
      address: "70 Washington Square South",
      doorNumber: "Apt 12",
      area: "New York",
      zipCode: "NY 10012",
      type: "home",
    },
  ]);

  const handleAddressSave = (addressData: Omit<SavedAddress, "id">) => {
    const newAddress: SavedAddress = {
      ...addressData,
      id: Date.now().toString(),
    };
    setSavedAddresses((prev) => [...prev, newAddress]);
    onAddressSelect(newAddress.id);
  };

  const handleAddressSelect = (addressId: string) => {
    onAddressSelect(addressId);
  };

  const getAddressIcon = (type: "home" | "work" | "other") => {
    switch (type) {
      case "home":
        return <Home className="size-5 text-primary" />;
      case "work":
        return <Briefcase className="size-5 text-primary" />;
      default:
        return <MapPin className="size-5 text-primary" />;
    }
  };

  const getDeliveryTime = () => "30 Mins";
  return (
    <Card className="rounded-none shadow-none gap-0">
      <CardHeader className="relative">
        <div className="absolute size-12 bg-black -left-10 top-0 flex items-center justify-center">
          <MapPin className="size-6 text-white" />
        </div>
      </CardHeader>
      <CardContent className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold mb-1 text-lg">Add a delivery address</h3>
          <p className="text-accent-foreground mb-4">
            You seem to be in the new location
          </p>

          {/* Display saved addresses */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {savedAddresses.map((address) => (
              <button
                key={address.id}
                type="button"
                className={`w-full border-2 border-dashed p-4 cursor-pointer transition-colors text-left rounded-lg ${
                  selectedAddressId === address.id
                    ? "border-teal-500 "
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleAddressSelect(address.id)}
              >
                <div className="flex flex-col items-start justify-between h-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getAddressIcon(address.type)}
                      <span className="font-semibold capitalize text-primary text-sm">
                        {address.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {address.doorNumber}, {address.address}, {address.area},{" "}
                      {address.zipCode}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full mt-2">
                    <span className="text-xs text-gray-500">
                      {getDeliveryTime()}
                    </span>
                    <div
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        selectedAddressId === address.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {selectedAddressId === address.id
                        ? "DELIVER HERE"
                        : "SELECT"}
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {/* Add new address card */}
            <div className="p-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="size-5 text-primary" />
                <span className="font-semibold text-primary">
                  Add New Address
                </span>
              </div>

              <AddressDrawer onSubmit={handleAddressSave}>
                <Button
                  variant="outline"
                  className="border-teal-500 px-4 py-1 text-sm rounded-none text-teal-500 hover:bg-teal-50 hover:text-teal-600"
                >
                  ADD NEW
                </Button>
              </AddressDrawer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
