import Image from "next/image";
import { ArrowLeftRight, Calendar, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedInput } from "@/components/ui/animated-input";

import logisticTruckIcon from "@/assets/icons/logistic-truck.png";

export function LogisticsBooking() {
  return (
    <section className="relative -mt-32 z-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          {/* Header */}
          <div className="flex mb-4">
            <div className="flex items-center gap-2 mb-3 border-b-3 border-primary pb-3">
              <Image
                src={logisticTruckIcon}
                alt="Logistics Truck Icon"
                className="max-h-8 max-w-8"
              />
              <span className="font-medium">Logistics</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            {/* Form */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pickup Point */}
              <div className="space-y-2">
                <div className="relative">
                  <AnimatedInput
                    type="text"
                    placeholder="Pickup Point"
                    className="pr-10  rounded-none"
                  />
                  <ArrowLeftRight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Dropoff Point */}
              <div className="space-y-2">
                <div className="relative">
                  <AnimatedInput
                    type="text"
                    placeholder="Drop off Point"
                    className="pr-10 rounded-none"
                  />
                  <ArrowLeftRight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <div className="relative">
                  <AnimatedInput
                    type="text"
                    placeholder="Date"
                    className="pr-10  rounded-none"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="ghost">
                <Plus className="h-4 w-4 mr-1" />
                Add Promo Code
              </Button>
              <Button>Search Vehicles</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
