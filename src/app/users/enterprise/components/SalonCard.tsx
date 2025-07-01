import { Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SalonCardProps {
  image?: string;
  rating?: number;
  name: string;
  address: string;
  avgPrice: number;
}

export function SalonCard({
  image,
  rating = 5.0,
  name,
  address,
  avgPrice,
}: SalonCardProps) {
  const t = useTranslations("common");
  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-0">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          )}
          {/* Rating Badge */}
          <div className="absolute top-0 right-3 z-10">
            <div className="bg-blue-950 text-white border-0 p-2 py-3 text-sm font-medium flex items-center rounded-t-none rounded-b-md shadow">
              <Star className="w-3 h-3 fill-current mr-1" />
              {rating.toFixed(1)}
            </div>
          </div>
          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
              {name}
            </h3>
            <p className="text-white/80 text-sm mb-2 line-clamp-1">{address}</p>
            <div className="flex gap-2 flex-col">
              <div className="text-white">
                <span className="text-2xl font-bold">${avgPrice}</span>
                <span className="text-white/80 text-sm ml-1">
                  {t("avgServicePrice")}
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full bg-green-100 hover:bg-green-200 rounded-lg text-green-700 font-medium px-6 py-2 border-0 shadow-none"
              >
                {t("view")}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
