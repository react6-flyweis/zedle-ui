"use client";

import { useTranslations } from "next-intl";
import { type PropsWithChildren, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DriverCard, type IDriver } from "./DriverCard";

const mockDrivers: IDriver[] = [
  {
    id: "1",
    name: "Omar",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.5,
    carBrand: "Hero",
    carModel: "Super Splendor",
  },
  {
    id: "2",
    name: "Meron",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.8,
    carBrand: "Honda",
    carModel: "Activa 6G",
  },
  {
    id: "3",
    name: "Livia",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.2,
    carBrand: "TVS",
    carModel: "Jupiter",
  },
  {
    id: "4",
    name: "Allison",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.7,
    carBrand: "Bajaj",
    carModel: "Pulsar 150",
  },
  {
    id: "5",
    name: "Cooper",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.3,
    carBrand: "Suzuki",
    carModel: "Access 125",
  },
  {
    id: "6",
    name: "Craig",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.6,
    carBrand: "Yamaha",
    carModel: "FZ-S",
  },
  {
    id: "7",
    name: "Cienna",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.4,
    carBrand: "Hero",
    carModel: "HF Deluxe",
  },
  {
    id: "8",
    name: "Corey",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.1,
    carBrand: "Honda",
    carModel: "Dio",
  },
  {
    id: "9",
    name: "Kianna",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.9,
    carBrand: "Bajaj",
    carModel: "CT 100",
  },
  {
    id: "10",
    name: "Giana",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.0,
    carBrand: "TVS",
    carModel: "XL100",
  },
  {
    id: "11",
    name: "Martin",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.5,
    carBrand: "Suzuki",
    carModel: "Burgman Street",
  },
  {
    id: "12",
    name: "Desirae",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.3,
    carBrand: "Yamaha",
    carModel: "Ray ZR",
  },
  {
    id: "13",
    name: "Ann",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.6,
    carBrand: "Hero",
    carModel: "Passion Pro",
  },
  {
    id: "14",
    name: "Zaire",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.2,
    carBrand: "Honda",
    carModel: "Shine",
  },
];

export function AvailableDriversDialog({ children }: PropsWithChildren) {
  const [sortBy, setSortBy] = useState<string>("relevance");
  const t = useTranslations("availableDrivers");

  const sortedDrivers = [...mockDrivers].sort((a, b) => {
    switch (sortBy) {
      case "closest":
        return Math.random() - 0.5; // Random for demo
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] p-0 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 bg-primary text-white p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-6">{t("sortBy")}</h3>
          <div className="space-y-4">
            <RadioGroup
              value={sortBy}
              onValueChange={setSortBy}
              className="space-y-2"
            >
              {[
                { value: "relevance", label: t("relevance") },
                { value: "closest", label: t("closest") },
                { value: "rating", label: t("rating") },
                { value: "price-low", label: t("priceLow") },
                { value: "price-high", label: t("priceHigh") },
                { value: "two-wheeler", label: t("twoWheeler") },
                { value: "four-wheeler", label: t("fourWheeler") },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="ring-white data-[state=checked]:bg-white data-[state=checked]:text-primary border-white"
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold text-center">
              {t("seeAllTitle")}
            </DialogTitle>
          </DialogHeader>

          {/* Providers Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {sortedDrivers.map((driver) => (
                <DriverCard key={driver.id} driver={driver} />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
