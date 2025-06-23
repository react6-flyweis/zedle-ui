"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import deliveryTrackImage from "@/assets/images/delivery-track.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface TrackPackageDialogProps {
  children: ReactNode;
  orderId?: string;
}
export function TrackPackageDialog({ children }: TrackPackageDialogProps) {
  // Mock data - in a real app, this would come from an API
  const estimatedTime = "28:49";
  const timeRemaining = "mins remaining";

  const deliveryPerson = {
    name: "Charlie Bergson",
    phone: "+1778 9874 123",
    avatar: "/placeholder-avatar.jpg", // You might want to replace with actual avatar
  };

  const deliverySteps = [
    {
      id: "accepted",
      label: "Order accepted",
      completed: true,
      progress: 40, // Partial progress to next step (40% complete)
    },
    {
      id: "taken",
      label: "Taken",
      completed: false,
      progress: 0,
    },
    {
      id: "delivered",
      label: "Order delivered",
      completed: false,
      progress: 0, // No progress (last step)
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Estimated delivery</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl">{estimatedTime}</span>
              <span className="text-sm text-muted-foreground">
                {timeRemaining}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {deliverySteps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10 flex-1"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.completed
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <Check className="size-5" />
                </div>
                <span className="text-xs text-center font-medium">
                  {step.label}
                </span>

                {/* Progress dotted line with progress bar effect */}
                {index < deliverySteps.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full flex items-center justify-center z-0">
                    <div className="relative w-full max-w-[200px] ml-5">
                      {/* Background dotted line */}
                      <div className="w-full h-0.5 border-t-2 border-dotted border-gray-300" />

                      {/* Progress overlay */}
                      <div
                        className="absolute top-0 left-0 h-0.5 border-t-2 border-dotted border-green-500 transition-all duration-500 ease-in-out"
                        style={{
                          width: `${step.progress}%`,
                        }}
                      />

                      {/* Delivery truck image positioned on the progress line */}
                      {index === 0 && step.progress > 0 && (
                        <div
                          className="absolute -top-7 z-10 -translate-x-7"
                          style={{
                            left: `${Math.min(step.progress, 95)}%`,
                          }}
                        >
                          <Image
                            src={deliveryTrackImage}
                            alt="Delivery truck"
                            width={24}
                            height={24}
                            className="max-h-6 max-w-6"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Person */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Delivery Person</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-20">
                <AvatarImage
                  src={deliveryPerson.avatar}
                  alt={deliveryPerson.name}
                />
                <AvatarFallback>
                  {deliveryPerson.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{deliveryPerson.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {deliveryPerson.phone}
                </p>
              </div>
            </div>
            <Button className=" px-8 py-2 ">CALL</Button>
          </div>
        </div>

        {/* Close Button */}
        <Button className="w-full py-3 rounded-lg">CLOSE</Button>
      </DialogContent>
    </Dialog>
  );
}
