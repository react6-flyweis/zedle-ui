"use client";

import { Clock, Loader2, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useUserAddress } from "@/hooks/useUserAddress";

export default function SubHeader() {
  const t = useTranslations("SubHeader");
  const { address, loading, error } = useUserAddress();

  return (
    <div className="w-full bg-primary flex items-center justify-between px-8 py-2 text-white text-xs">
      <div className="flex items-center gap-1">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="flex items-center min-h-[1.25rem]">
          {loading ? (
            <Loader2 className="animate-spin w-4 h-4 mr-1" />
          ) : error ? (
            t("addressError")
          ) : (
            address || t("userLocationFallback")
          )}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4 mr-1" />
        <span>9am - 5pm Est Monday - Friday</span>
      </div>
    </div>
  );
}
