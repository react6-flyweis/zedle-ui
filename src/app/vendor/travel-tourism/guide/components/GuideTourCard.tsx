import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

import guideTourCardBg from "../assets/guide-tour-card-bg.jpg";

export type ITour = {
  id: string;
  date: string; // ISO string
  time: string; // e.g. "09:00 AM"
  requestId: string;
  location: string;
  price: string;
  status?: "completed" | "upcoming";
};

export function GuideTourCard({
  tour,
  status,
}: {
  tour: ITour;
  status?: "completed" | "upcoming";
}) {
  const t = useTranslations("tourCard");
  return (
    <Card className="group relative overflow-hidden p-0 h-96 rounded shadow-lg flex flex-col justify-center border-0">
      <Image
        src={guideTourCardBg}
        alt={tour.location}
        fill
        className="absolute object-cover w-full h-full rounded-t z-0"
        priority
      />
      <div className="absolute h-full w-full inset-0 bg-black/60" />
      <CardContent className="relative w-full flex flex-col items-center justify-center h-full z-10">
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
          {/* Completed Status */}
          {(tour.status === "completed" || status === "completed") && (
            <div className="absolute top-5 right-5 text-green-500 font-semibold text-lg drop-shadow-lg">
              {t("completedStatus")}
            </div>
          )}
          {/* Date & Time */}
          <div className="text-white text-3xl font-bold text-center mb-2 drop-shadow-lg flex flex-col">
            {/* Format date as DD–MMM, YYYY ddd */}
            <span>{tour.date}</span>
            <span> {tour.time}</span>
          </div>
          {/* Request ID */}
          <div className="text-white text-base font-medium mb-2">
            {t("requestId")}: #{tour.requestId}
          </div>
          {/* Price */}
          <div className="text-white text-3xl font-bold mb-2">
            {t("priceLabel")}: ${tour.price}
          </div>

          {/* Addresses */}
          <div className="flex justify-center w-full mt-2">
            {/* Drop */}
            <div className="flex items-center">
              <span className="bg-green-400 mr-2 size-3 rounded-full z-10" />
              <span className="text-white text-base font-medium">
                {tour.location}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
