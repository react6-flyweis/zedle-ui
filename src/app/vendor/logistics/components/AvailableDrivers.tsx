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
    avatar:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.5,
    carBrand: "Hero",
    carModel: "Super Splendor",
  },
  {
    id: "2",
    name: "Meron",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.8,
    carBrand: "Honda",
    carModel: "Activa 6G",
  },
  {
    id: "3",
    name: "Livia",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.2,
    carBrand: "TVS",
    carModel: "Jupiter",
  },
  {
    id: "4",
    name: "Allison",
    avatar:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.7,
    carBrand: "Bajaj",
    carModel: "Pulsar 150",
  },
  {
    id: "5",
    name: "Cooper",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.3,
    carBrand: "Suzuki",
    carModel: "Access 125",
  },
  {
    id: "6",
    name: "Craig",
    avatar:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.6,
    carBrand: "Yamaha",
    carModel: "FZ-S",
  },
  {
    id: "7",
    name: "Cienna",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.4,
    carBrand: "Hero",
    carModel: "HF Deluxe",
  },
  {
    id: "8",
    name: "Corey",
    avatar:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.1,
    carBrand: "Honda",
    carModel: "Dio",
  },
  {
    id: "9",
    name: "Kianna",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.9,
    carBrand: "Bajaj",
    carModel: "CT 100",
  },
  {
    id: "10",
    name: "Giana",
    avatar:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.0,
    carBrand: "TVS",
    carModel: "XL100",
  },
  {
    id: "11",
    name: "Martin",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.5,
    carBrand: "Suzuki",
    carModel: "Burgman Street",
  },
  {
    id: "12",
    name: "Desirae",
    avatar:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.3,
    carBrand: "Yamaha",
    carModel: "Ray ZR",
  },
  {
    id: "13",
    name: "Ann",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2",
    price: 458,
    rating: 4.6,
    carBrand: "Hero",
    carModel: "Passion Pro",
  },
  {
    id: "14",
    name: "Zaire",
    avatar:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2",
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
      <DialogContent className="sm:max-w-5xl max-h-[85vh] p-0 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-60 bg-primary text-white p-6 flex flex-col">
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
          <DialogHeader className="p-3 md:p-6 pb-0">
            <DialogTitle className="text-2xl font-bold text-center">
              {t("seeAllTitle")}
            </DialogTitle>
          </DialogHeader>

          {/* Providers Grid */}
          <div className="flex-1 p-6 overflow-y-scroll">
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
