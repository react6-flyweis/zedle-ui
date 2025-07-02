import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils";
import deliveryOfflineImage from "../assets/delivery-offline.png";
import deliveryOnlineImage from "../assets/delivery-online.png";

export const StatusToggle = () => {
  const [online, setOnline] = useState(true);
  const t = useTranslations("status");

  return (
    <button
      type="button"
      aria-pressed={online}
      onClick={() => setOnline(!online)}
      className={`relative flex items-center w-36 h-11 rounded-full transition-colors border-2 ${
        online
          ? "bg-green-300 border-green-500"
          : "bg-amber-300 border-amber-500"
      }`}
    >
      <span
        className={`flex items-center justify-center size-10 rounded-full absolute top-0 transition-all duration-300 ease-in-out ${
          online
            ? "left-0 bg-green-600"
            : "left-[calc(100%-2.5rem)] bg-amber-700"
        }`}
      >
        <Image
          src={online ? deliveryOnlineImage : deliveryOfflineImage}
          alt={online ? "Delivery Online" : "Delivery Offline"}
          width={36}
          height={36}
          className="object-contain max-h-8 max-w-8"
        />
      </span>
      <span
        className={cn(
          "flex-1 w-full text-lg font-medium text-white z-10 px-5",
          online ? "text-end" : "text-start",
        )}
      >
        {t(online ? "online" : "offline")}
      </span>
    </button>
  );
};
