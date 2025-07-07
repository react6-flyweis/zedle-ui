"use client";

import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DriverDetailsDialog } from "./DriverDetailsDialog";

export interface IDriver {
  id: string;
  name: string;
  avatar: string;
  price: number;
  rating: number;
  carBrand: string;
  carModel: string;
  email?: string;
  mobile?: string;
  joiningDate?: string;
  language?: string;
  serviceZone?: string;
  carNumber?: string;
  vehicleYear?: string;
  vehiclePhotos?: string[];
}

export function DriverCard({ driver }: { driver: IDriver }) {
  const t = useTranslations("availableDrivers");
  const { name, avatar, carBrand, carModel } = driver;

  // Mock details for demo
  const driverDetails = {
    ...driver,
    email: "example@gmail.com",
    mobile: "9458554785",
    joiningDate: "05-Sept-2024",
    language: "English",
    serviceZone: "Germany, Cambridge Street",
    carNumber: "WB-1458J",
    vehicleYear: "2024",
    vehiclePhotos: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
      "https://images.unsplash.com/photo-1511918984145-48de785d4c4e",
    ],
  };

  return (
    <div className="bg-primary rounded-lg flex flex-col gap-6 px-6 py-4 text-white">
      <div className="flex gap-5 items-center">
        {/* Avatar */}
        <Avatar className="size-20 border-4 border-white shadow-md">
          <AvatarImage src={avatar} alt={name} className="object-cover" />
          <AvatarFallback className="bg-purple-300 text-purple-900 text-xl">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="text-lg font-semibold leading-tight">
            <span className="mr-1">{t("driverName")}</span>
            {name}
          </div>
          <div className="mt-1 text-base">
            <span className="block">
              {t("carBrand")} {carBrand}
            </span>
            <span className="block">
              {t("carModel")} {carModel}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 ">
        <DriverDetailsDialog driver={driverDetails} onAssign={() => {}}>
          <Button className="bg-green-800 hover:bg-green-900 text-white">
            {t("seeDetails")}
          </Button>
        </DriverDetailsDialog>
        <Button className="bg-green-700 hover:bg-green-800 text-white">
          {t("assignDriver")}
        </Button>
      </div>
    </div>
  );
}
