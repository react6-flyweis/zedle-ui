"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import requestCardBg from "../assets/request-card-bg.jpg";

export type INewRequest = {
  id: string;
  //   description: string;
  rider: {
    id: string;
    name: string;
    phone: string;
    email: string;
    image?: string; // optional image url
  };
  pickupPoint: string;
  dropPoint: string;
  //   height: string;
  //   width: string;
  //   length: string;
  //   weight: string;
  pickupTime: string;
  pickupDate: string;
};

export function NewRequestCard({ request }: { request: INewRequest }) {
  const t = useTranslations("requestCard");
  // fallback avatar if not provided
  const avatarUrl =
    request.rider.image ||
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256&facepad=2";

  return (
    <Card className="group relative overflow-hidden group p-0 h-96 rounded shadow-lg flex flex-col justify-center border-0">
      <CardContent className="w-full flex flex-col items-center justify-center">
        <Image
          src={requestCardBg}
          alt={t("bgImageAlt")}
          className="absolute object-cover w-full  h-full rounded-t z-0"
          width={600}
          height={320}
          priority
        />
        <div className="absolute h-full w-full inset-0 bg-black/40"></div>
        <div className="relative w-full flex flex-col items-center justify-center gap-2">
          {/* Rider Avatar */}
          <div className="flex flex-col items-center">
            <div className="rounded-full border-4 border-white shadow-lg overflow-hidden size-20  bg-white">
              <Image
                src={avatarUrl}
                alt={request.rider.name}
                width={100}
                height={100}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="mt-4 text-2xl font-semibold text-white text-center">
              {request.rider.name}
            </div>
            <div className="flex flex-col items-center mt-2 space-y-1">
              <div className="flex items-center text-white/90 text-base">
                <Mail className="w-5 h-5 mr-2" />
                <span>{request.rider.email}</span>
              </div>
              <div className="flex items-center text-white/90 text-base">
                <Phone className="w-5 h-5 mr-2" />
                <span>{request.rider.phone}</span>
              </div>
            </div>
          </div>
          {/* Hidden on initial, show on hover: addresses and button */}
          <div className="flex md:hidden md:group-hover:flex flex-col gap-2">
            {/* Address */}
            <div className="flex justify-center">
              <div className="relative flex flex-col">
                <div className="absolute left-0 top-1.5 h-[70%] w-1.5 border-r border-dashed border-white/70"></div>
                {[request.pickupPoint, request.dropPoint].map((address) => (
                  <div key={address} className="flex items-center mb-1">
                    <div className="bg-green-400 mr-2 size-3 rounded-full z-10"></div>
                    <p className="text-sm text-white/80 flex">{address}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button
              className="w-full bg-yellow-500 hover:bg-yellow-600"
              type="button"
            >
              {t("viewFullRequest")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
