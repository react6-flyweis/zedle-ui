"use client";

import { MapPin, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TrackingStep {
  id: string;
  title: string;
  location: string;
  status: "completed" | "current" | "pending";
  date?: string;
  time?: string;
}

interface MapTrackerProps {
  className?: string;
  trackingSteps?: TrackingStep[];
}

export const MapTracker = ({
  className,
  trackingSteps = [],
}: MapTrackerProps) => {
  // Get the current step and completed steps count
  const currentStepIndex = trackingSteps.findIndex(
    (step) => step.status === "current",
  );
  const completedSteps = trackingSteps.filter(
    (step) => step.status === "completed",
  ).length;
  const currentStep = trackingSteps[currentStepIndex];

  return (
    <Card className={`w-full p-0 overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="relative h-72 bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 overflow-hidden">
          {/* Map background pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 200"
              className="w-full h-full"
              aria-hidden="true"
            >
              <title>Background map pattern</title>
              {/* Road/path lines */}
              <path
                d="M50 150 Q200 120 300 140 T500 130 T700 120"
                stroke="#9CA3AF"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                opacity="0.6"
              />
              <path
                d="M80 100 Q250 80 400 90 T650 85"
                stroke="#9CA3AF"
                strokeWidth="2"
                fill="none"
                strokeDasharray="3,3"
                opacity="0.4"
              />
            </svg>
          </div>

          {/* Route line */}
          <div className="absolute inset-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 200"
              className="w-full h-full"
              aria-hidden="true"
            >
              <title>Delivery route path</title>
              {/* Main route - Orange to Purple gradient */}
              <defs>
                <linearGradient
                  id="routeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path
                d="M80 140 Q200 120 350 130 Q500 140 650 120"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                fill="none"
                className="drop-shadow-sm"
              />
            </svg>
          </div>

          {/* Location markers */}
          <div className="absolute inset-0 flex items-center justify-between px-8">
            {trackingSteps.length > 0 ? (
              trackingSteps.map((step, index) => {
                // Only show first, current, and last steps to avoid overcrowding
                if (
                  index !== 0 &&
                  index !== trackingSteps.length - 1 &&
                  step.status !== "current"
                ) {
                  return null;
                }

                const getMarkerColor = () => {
                  if (step.status === "completed") return "bg-green-500";
                  if (step.status === "current") return "bg-blue-500";
                  return "bg-gray-400";
                };

                const getMarkerSize = () => {
                  if (step.status === "current") return "w-6 h-6";
                  if (index === 0 || index === trackingSteps.length - 1)
                    return "w-4 h-4";
                  return "w-3 h-3";
                };

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center relative"
                  >
                    <div
                      className={`${getMarkerSize()} ${getMarkerColor()} rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                        step.status === "current" ? "animate-pulse" : ""
                      }`}
                    >
                      {step.status === "current" && (
                        <Truck className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-gray-700">
                        {step.location}
                      </p>
                      <p
                        className={`text-xs ${
                          step.status === "current"
                            ? "text-blue-600 font-medium"
                            : step.status === "completed"
                              ? "text-green-600"
                              : "text-gray-500"
                        }`}
                      >
                        {step.status === "current"
                          ? "Current"
                          : step.status === "completed"
                            ? "Completed"
                            : index === 0
                              ? "Start"
                              : "Destination"}
                      </p>
                      {step.date && (
                        <p className="text-xs text-gray-400">{step.date}</p>
                      )}
                    </div>
                    {/* Pulse animation for current step */}
                    {step.status === "current" && (
                      <div className="absolute top-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                    )}
                  </div>
                );
              })
            ) : (
              // Fallback static markers if no data
              <>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium text-gray-700">Origin</p>
                    <p className="text-xs text-gray-500">Start</p>
                  </div>
                </div>
                <div className="flex flex-col items-center relative">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                    <Truck className="w-3 h-3 text-white" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium text-gray-700">
                      In Transit
                    </p>
                    <p className="text-xs text-blue-600 font-medium">Current</p>
                  </div>
                  <div className="absolute top-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium text-gray-700">
                      Destination
                    </p>
                    <p className="text-xs text-gray-500">End</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Distance and time info */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs font-medium text-gray-700">
                  {currentStep
                    ? `At ${currentStep.location}`
                    : "298 km remaining"}
                </p>
                <p className="text-xs text-gray-500">
                  {currentStep?.date || "ETA: 4 hours"}
                </p>
              </div>
            </div>
          </div>

          {/* Status info */}
          <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
            <p className="text-xs font-medium text-white">
              {completedSteps > 0 ? "In Progress" : "On Time"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
