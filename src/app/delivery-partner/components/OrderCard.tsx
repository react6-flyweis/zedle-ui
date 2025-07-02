"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type Order = {
  id: string;
  date: string;
  address: string;
  address2: string;
  paymentMethod: string;
  total: string;
  image: string;
};

export function OrderCard({ order }: { order: Order }) {
  const t = useTranslations("card");
  return (
    <Card className="relative overflow-hidden group p-0 rounded">
      <div className="relative h-80">
        <Image
          src={order.image}
          alt={t("orderImageAlt")}
          fill
          className="object-cover absolute z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 h-full w-full flex flex-col justify-center space-y-4">
          <div className="top-8 left-0 w-full flex flex-col items-center">
            <div className="text-2xl font-bold text-white text-center">
              {order.date}
            </div>
            <div className="text-base text-white/90 text-center mt-1">
              {t("bookingId")}: {order.id}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative flex flex-col">
              <div className="absolute left-0 top-1.5 h-[70%] w-1.5 border-r border-dashed border-white"></div>
              {[order.address, order.address2].map((address) => (
                <div key={address} className="flex items-center mb-1">
                  <div className="bg-green-400 mr-2 size-3 rounded-full z-10"></div>
                  <p className="text-sm text-white/80 flex">{address}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-8">
            <div className="flex justify-between border-y border-white/60 pt-4">
              <div className="flex flex-col items-start">
                <span className="text-xs text-white font-semibold tracking-wide">
                  {t("items")}
                </span>
                <span className="text-white text-base">2</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-white font-semibold tracking-wide">
                  {t("paymentMethod")}
                </span>
                <span className="text-white text-base">
                  {order.paymentMethod}
                </span>
              </div>
            </div>
          </div>
          {/* Action Buttons on Hover */}
          <div className=" px-8 pb-8 hidden justify-between gap-4 group-hover:flex transition-opacity duration-200">
            <Button
              className="flex-1 bg-destructive hover:bg-destructive/90 text-white text-lg font-semibold rounded-lg py-6 mr-2"
              type="button"
              variant="destructive"
            >
              {t("actions.reject")}
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg py-6 ml-2"
              type="button"
            >
              {t("actions.accept")}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
