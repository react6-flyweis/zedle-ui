"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import mapCarImage from "../assets/map-car.png";

interface Rider {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: "available" | "busy";
}

// Mock data for available riders
const mockRiders: Rider[] = [
  {
    id: "1",
    name: "Ahmed Khan",
    lat: 24.8607,
    lng: 67.0011,
    status: "available",
  },
  {
    id: "2",
    name: "Sara Ali",
    lat: 24.8647,
    lng: 67.0061,
    status: "available",
  },
  { id: "3", name: "Hassan Shah", lat: 24.8567, lng: 66.9991, status: "busy" },
  {
    id: "4",
    name: "Fatima Sheikh",
    lat: 24.8687,
    lng: 67.0081,
    status: "available",
  },
  {
    id: "5",
    name: "Omar Malik",
    lat: 24.8527,
    lng: 66.9971,
    status: "available",
  },
];

export function MainMap() {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

  useEffect(() => {
    // Simulate loading riders
    setRiders(mockRiders);
  }, []);

  const availableRiders = riders.filter(
    (rider) => rider.status === "available",
  );

  return (
    <div className="w-full h-[90vh]  bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden rounded-lg">
      {/* Simple Map Visualization */}
      <div className="w-full h-full relative">
        {/* Background grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div
                key={`grid-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  i
                }`}
                className="border border-gray-300"
              ></div>
            ))}
          </div>
        </div>

        {/* Riders on the map */}
        {riders.map((rider) => (
          <button
            key={rider.id}
            type="button"
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
              rider.status === "available" ? "text-green-600" : "text-gray-400"
            }`}
            style={{
              left: `${((rider.lng - 66.99) / 0.02) * 100}%`,
              top: `${((24.87 - rider.lat) / 0.02) * 100}%`,
            }}
            onClick={() => setSelectedRider(rider)}
            aria-label={`Select rider ${rider.name}`}
          >
            <div className="relative">
              <Image
                src={mapCarImage}
                alt="Car"
                width={24}
                height={24}
                className={`${
                  rider.status === "available"
                    ? "drop-shadow-lg opacity-100"
                    : "opacity-50"
                }`}
              />
              {rider.status === "available" && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </button>
        ))}

        {/* Your location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin size={32} className="text-blue-600 drop-shadow-lg" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-600 bg-white px-2 py-1 rounded shadow">
              You
            </div>
          </div>
        </div>
      </div>

      {/* Rider Info Panel */}
      {selectedRider && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">
              {selectedRider.name}
            </h4>
            <button
              type="button"
              onClick={() => setSelectedRider(null)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close rider info"
            >
              ×
            </button>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <div
              className={`w-2 h-2 rounded-full ${
                selectedRider.status === "available"
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-gray-600 capitalize">
              {selectedRider.status}
            </span>
          </div>
          {selectedRider.status === "available" && (
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Rider
            </button>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Image
              src={mapCarImage}
              alt="Available car"
              width={16}
              height={16}
              className="opacity-100"
            />
            <span className="text-xs text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <Image
              src={mapCarImage}
              alt="Busy car"
              width={16}
              height={16}
              className="opacity-50"
            />
            <span className="text-xs text-gray-600">Busy</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-blue-600 z-10" />
            <span className="text-xs text-gray-600">Your Location</span>
          </div>
        </div>
      </div>
    </div>
  );
}
