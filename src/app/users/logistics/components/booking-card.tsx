"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LogisticsBooking } from "@/types/orders";

import bookingBgImage from "../assets/booking-bg.jpg";
import bookingVehicleImage from "../assets/booking-vehicle.png";

interface BookingCardProps {
  booking: LogisticsBooking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "text-yellow-500";
      case "completed":
        return "text-green-500";
      case "canceled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ongoing":
        return "Ongoing";
      case "completed":
        return "Completed";
      case "canceled":
        return "Canceled";
      default:
        return status;
    }
  };

  return (
    <Card className="relative w-full h-96 overflow-hidden rounded-none shadow-none group cursor-pointer transition-all duration-300 hover:shadow-xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
        style={{
          backgroundImage: `url(${bookingBgImage.src})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center p-6 text-white">
        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <p
            className={cn(
              "uppercase tracking-wide",
              getStatusColor(booking.status),
            )}
          >
            {getStatusText(booking.status)}
          </p>
        </div>
        {/* Customer Avatar */}
        <div className="flex justify-center mb-4">
          <Avatar className="h-20 w-20 ">
            <AvatarImage src={booking.avatar} alt={booking.customerName} />
            <AvatarFallback className="font-bold text-lg">
              {booking.customerName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* Customer Info */}
        <div className="text-center space-y-2">
          <h3 className="font-bold text-2xl text-white">
            {booking.customerName}
          </h3>

          <div className="flex items-center justify-center space-x-2 text-white/90">
            <span className="inline-flex items-center text-sm">
              <Image
                src={bookingVehicleImage}
                alt="Vehicle"
                width={16}
                height={16}
                className="mr-1"
              />
              {booking.vehicleType}
            </span>
            <span>•</span>
            <span className="text-sm">{booking.cargo}</span>
          </div>

          {/* Address - only show on hover */}
          <div className="space-y-1 hidden group-hover:block">
            <p className="text-sm text-white/80 flex items-center justify-center">
              <span className="text-green-400 mr-2">📍</span>
              {booking.address.split(",")[0]}
            </p>
            <p className="text-sm text-white/80 flex items-center justify-center">
              <span className="text-green-400 mr-2">📍</span>
              {booking.address.split(",").slice(1).join(",").trim()}
            </p>
          </div>
        </div>{" "}
        {/* Action Buttons - only show on hover */}
        <div className="hidden group-hover:flex justify-center mt-4">
          {booking.status === "ongoing" && (
            <div className="flex space-x-3 mt-4">
              <Button
                variant="destructive"
                className="flex-1 py-3 px-4 text-sm font-bold"
              >
                Cancel Order
              </Button>
              <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-3 px-4 text-sm font-bold">
                Track Order
              </Button>
            </div>
          )}

          {booking.status === "completed" && (
            <div className="flex justify-center mt-4">
              <Button className="bg-green-500 hover:bg-green-600 py-3 px-6 text-sm font-bold">
                Rate Driver
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
