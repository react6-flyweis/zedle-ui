"use client";

import { format } from "date-fns";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import orderCardPoster from "../assets/order-card-poster.jpg";
import { CancellationDialogCard } from "./CancellationDialogCard";

export type OrderBase = {
  id: string;
  date: string;
  address: string;
  address2: string;
};

export interface CompletedOrder extends OrderBase {
  status: "completed";
  total: string;
  paymentMethod: string;
  itemsDimensions: string;
  shipmentStatus: string;
  customerName: string;
  customerPhone: string;
  rating: number;
}

export interface PendingOrder extends OrderBase {
  status: "pending";
  paymentMethod: string;
  itemsDimensions: string;
  shipmentStatus: string;
  customerName: string;
  customerPhone: string;
}

export interface RunningOrder extends OrderBase {
  status: "running";
  vehicleType: string;
  orderNo: string;
}

export type OrderStatus = "completed" | "pending" | "running";
export type IOrder = CompletedOrder | PendingOrder | RunningOrder;

export function OrderCard({ order }: { order: IOrder }) {
  const t = useTranslations("card");
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  return (
    <Card className="relative overflow-hidden group p-0 rounded">
      <div className="relative py-8">
        <Image
          src={orderCardPoster}
          alt={t("orderImageAlt")}
          fill
          className="object-cover absolute z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 h-full w-full flex flex-col justify-center space-y-4">
          <div className="top-8 left-0 w-full flex flex-col items-center">
            <div className="text-xl text-white text-center">
              {format(order.date, "MMM dd, yyyy, hh:mm a")}
              {order.status === "completed" && (
                <span className="ml-4 text-2xl font-bold">${order.total}</span>
              )}
            </div>
            <div className="text-base text-white/90 text-center mt-1">
              {order.status === "running" && (
                <div className="text-lg text-white font-semibold mt-1">
                  {order.vehicleType}
                </div>
              )}
              {order.status === "running"
                ? `${t("orderNo")}: : #${order.orderNo}`
                : `${t("bookingId")}: ${order.id}`}
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
          {/* Details Section */}
          {order.status === "completed" && (
            <div className="px-8">
              <div className="grid grid-cols-2 border-y border-white/60 pt-4 pb-2 gap-x-4">
                <div className="flex flex-col items-start">
                  <span className="text-xs text-white font-semibold tracking-wide">
                    {t("itemsDimensions")}
                  </span>
                  <span className="text-white text-base">
                    {order.itemsDimensions}
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-white font-semibold tracking-wide">
                    {t("paymentMethod")}
                  </span>
                  <span className="text-white text-base">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex flex-col items-start mt-2">
                  <span className="text-xs text-white font-semibold tracking-wide">
                    {order.customerName}
                  </span>
                  <span className="text-white text-base">{order.date}</span>
                </div>
                <div className="flex flex-col items-start mt-2">
                  <span className="text-xs text-white font-semibold tracking-wide">
                    {t("shipmentStatus")}
                  </span>
                  <span className="text-white text-base">
                    {order.shipmentStatus}
                  </span>
                </div>
                <div className="flex flex-col items-start mt-2">
                  <span className="text-xs text-white font-semibold tracking-wide">
                    {order.customerName}
                  </span>
                  <span className="text-white text-base">
                    {order.customerPhone}
                  </span>
                </div>
                <div className="flex flex-col items-start mt-2">
                  <span className="text-xs text-white font-semibold tracking-wide">
                    {t("rating")}
                  </span>
                  <span className="flex items-center gap-1">
                    {[...Array(Math.floor(order.rating))].map((_, i) => (
                      <Star
                        key={`${order.id}-star-${i}`}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          )}
          {order.status === "pending" && (
            <div className="px-8">
              <div className="grid grid-cols-2 border-y border-white/60 pt-4 pb-2 gap-x-4">
                <div className="flex flex-col items-start">
                  <span className="text-xs text-white font-semibold tracking-wide">
                    {t("itemsDimensions")}
                  </span>
                  <span className="text-white text-base">
                    {order.itemsDimensions}
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-white font-semibold tracking-wide">
                    {t("paymentMethod")}
                  </span>
                  <span className="text-white text-base">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex flex-col items-start mt-2">
                  <span className="text-xs text-white font-semibold tracking-wide">
                    {order.customerName}
                  </span>
                  <span className="text-white text-base">
                    {order.customerPhone}
                  </span>
                </div>
                <div className="flex flex-col items-start mt-2">
                  <span className="text-xs text-white font-semibold tracking-wide">
                    {t("shipmentStatus")}
                  </span>
                  <span className="text-white text-base">
                    {order.shipmentStatus}
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* Action Buttons */}
          {order.status === "pending" && (
            <div className="px-8 flex justify-between gap-4 transition-opacity duration-200">
              <Button
                className="flex-1 bg-destructive hover:bg-destructive/90"
                type="button"
                variant="destructive"
                onClick={() => setOpenCancelDialog(true)}
              >
                {t("actions.reject")}
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                type="button"
              >
                {t("actions.accept")}
              </Button>
              <CancellationDialogCard
                open={openCancelDialog}
                setOpen={setOpenCancelDialog}
              />
            </div>
          )}
          {order.status === "running" && (
            <div className="px-8 flex justify-center transition-opacity duration-200">
              <Link className="w-full" href={`/delivery-partner/route`}>
                <Button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-foreground"
                  type="button"
                >
                  {t("actions.start")}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
