"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import packageIcon from "../../assets/package.png";
import { MapTracker } from "../../components/MapTracker";
import type { ITrackingStep } from "../../types/tracking";

const TrackingPage = () => {
  const trackingId = "#9876654 32212";

  const trackingSteps: ITrackingStep[] = [
    {
      id: "pickup",
      title: "Empty Pickup",
      location: {
        city: "Gujarat",
        description: "Container yard",
        coordinates: {
          latitude: 23.0225,
          longitude: 72.5714,
        },
      },
      status: "completed",
      date: "Dec 16th, 2024",
    },
    {
      id: "door-pickup",
      title: "Door Pickup",
      location: {
        city: "Gujarat",
        description: "Warehouse",
        coordinates: {
          latitude: 23.03,
          longitude: 72.58,
        },
      },
      status: "completed",
      date: "Dec 17th, 2024",
    },
    {
      id: "get-in",
      title: "Get In",
      location: {
        city: "Gujarat",
        description: "Loading point",
        coordinates: {
          latitude: 23.035,
          longitude: 72.59,
        },
      },
      status: "completed",
      date: "Dec 18th, 2024",
    },
    {
      id: "loaded",
      title: "Loaded",
      location: {
        city: "Gujarat",
        description: "Loaded at site",
        coordinates: {
          latitude: 23.04,
          longitude: 72.6,
        },
      },
      status: "completed",
      date: "Dec 19th, 2024",
    },
    {
      id: "departure",
      title: "Departure",
      location: {
        city: "Vadodara",
        description: "Departed from Vadodara",
        coordinates: {
          latitude: 22.310696,
          longitude: 73.192635,
        },
      },
      status: "current",
      date: "Dec 20th, 2024",
    },
    {
      id: "arrival",
      title: "Arrival",
      location: {
        city: "Surat",
        description: "Yet to arrive",
        coordinates: {
          latitude: 21.17024,
          longitude: 72.831062,
        },
      },
      status: "pending",
      date: "Dec 21st, 2024",
    },
    {
      id: "door-delivery",
      title: "Door Delivery",
      location: {
        city: "Thane",
        description: "Delivered to customer",
        coordinates: {
          latitude: 19.2183,
          longitude: 72.9781,
        },
      },
      status: "pending",
      date: "Dec 22nd, 2024",
    },
  ];

  const trackingEvents = trackingSteps.map((step) => ({
    step: step.title,
    place: step.location.city || "",
    date: step.date || "",
    delay: step.delay || "-",
  }));

  const getStepColor = (status: string) => {
    if (status === "pending") {
      return "bg-gray-300";
    } else {
      return "bg-green-500";
    }
  };

  return (
    <div className="">
      {/* Map Tracker */}
      <MapTracker className="mb-4" trackingSteps={trackingSteps} />

      <Card className="rounded-none gap-4">
        <CardHeader className="flex flex-col items-center">
          <p className="text-xl font-bold">Tracking ID: {trackingId}</p>
          <p className="text-blue-600 font-medium">4 days ahead</p>
        </CardHeader>

        <CardContent className="space-y-6 p-8">
          {/* Progress Steps */}

          <div className="relative">
            {/* Progress Line - Individual segments between steps */}
            <div className="absolute top-3 left-8 right-8 flex">
              {trackingSteps.map((step, index) => {
                if (index === trackingSteps.length - 1) return null; // Skip last item (no line after it)

                const isLineActive =
                  step.status === "completed" ||
                  (step.status === "current" &&
                    trackingSteps[index + 1]?.status !== "pending");

                return (
                  <div
                    key={`line-${step.id}`}
                    className={`h-2 flex-1 transition-all duration-500 ${
                      isLineActive ? "bg-green-500" : "bg-gray-200"
                    } ${index === 0 ? "rounded-l-full" : ""} ${
                      index === trackingSteps.length - 2 ? "rounded-r-full" : ""
                    }`}
                    style={{
                      marginRight:
                        index < trackingSteps.length - 2 ? "2px" : "0",
                    }}
                  />
                );
              })}
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {trackingSteps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center max-w-[120px]"
                >
                  {/* Step Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 shadow-lg ${getStepColor(
                      step.status,
                    )}`}
                  >
                    {step.status === "current" ? (
                      <Image
                        src={packageIcon}
                        alt="Package Icon"
                        className="max-w-5 max-h-5"
                      />
                    ) : (
                      <div className="size-5 rounded-full bg-white"></div>
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {step.location.city}
                    </p>
                    {step.date && (
                      <p className="text-xs text-gray-400">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking Events Table */}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left p-3 font-medium">Tracking step</th>
                  <th className="text-left p-3 font-medium">Event place</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Delay</th>
                </tr>
              </thead>
              <tbody>
                {trackingEvents.map((event) => (
                  <tr
                    key={`${event.step}-${event.place}-${event.date}`}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-3 font-semibold">{event.step}</td>
                    <td className="p-3">{event.place}</td>
                    <td className="p-3">{event.date}</td>
                    <td className="p-3">{"-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingPage;
