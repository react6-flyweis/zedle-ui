"use client";

import { useState } from "react";
import type { LogisticsBooking } from "@/types/orders";
import bookingPosterImage from "../assets/bookings-poster.jpg";
import { BookingCard } from "../components/booking-card";

// Sample data - replace with actual API data
const sampleBookings: LogisticsBooking[] = [
  {
    _id: "1",
    customerName: "Omar Smith",
    vehicleType: "Truck Type",
    cargo: "Cargo",
    pickupAddress: "Warehouse 1, 123 Main St, Shiloh, Hawaii 81063",
    deliveryAddress: "901 Thornr_idge Cir. Shiloh, Hawaii 81063",
    status: "ongoing",
    backgroundImage: "/assets/images/delivery-bg.jpg",
  },
  {
    _id: "2",
    customerName: "Omar Smith",
    vehicleType: "Truck Type",
    cargo: "Cargo",
    pickupAddress: "Warehouse 2, 456 Royal Ln, Mesa, New Jersey",
    deliveryAddress: "2464 Royal Ln. Mesa, New Jersey",
    status: "completed",
    backgroundImage: "/assets/images/personalised-logistics.png",
  },
  {
    _id: "3",
    customerName: "Omar Smith",
    vehicleType: "Truck Type",
    cargo: "Cargo",
    pickupAddress: "Warehouse 1, 123 Main St, Shiloh, Hawaii 81063",
    deliveryAddress: "901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "canceled",
    backgroundImage: "/assets/images/delivery-bg.jpg",
  },
  {
    _id: "4",
    customerName: "Omar Smith",
    vehicleType: "Truck Type",
    cargo: "Cargo",
    pickupAddress: "Warehouse 2, 456 Royal Ln, Mesa, New Jersey",
    deliveryAddress: "2464 Royal Ln. Mesa, New Jersey",
    status: "ongoing",
    backgroundImage: "/assets/images/personalised-logistics.png",
  },
  {
    _id: "5",
    customerName: "Omar Smith",
    vehicleType: "Truck Type",
    cargo: "Cargo",
    pickupAddress: "Warehouse 1, 123 Main St, Shiloh, Hawaii 81063",
    deliveryAddress: "901 Thornridge Cir. Shiloh, Hawaii 81063",
    status: "completed",
    backgroundImage: "/assets/images/delivery-bg.jpg",
  },
  {
    _id: "6",
    customerName: "Omar Smith",
    vehicleType: "Truck Type",
    cargo: "Cargo",
    pickupAddress: "Warehouse 2, 456 Royal Ln, Mesa, New Jersey",
    deliveryAddress: "2464 Royal Ln. Mesa, New Jersey",
    status: "completed",
    backgroundImage: "/assets/images/personalised-logistics.png",
  },
];

export default function BookingsPage() {
  const [bookings] = useState<LogisticsBooking[]>(sampleBookings);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative h-80 bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: `url(${bookingPosterImage.src})`,
        }}
      >
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Your All Bookings
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No bookings found. Start by creating your first booking.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
