import Image from "next/image";
import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface RestaurantCardProps {
  name: string;
  type: string;
  discount?: string | null;
  image: string;
}

export const RestaurantCard: FC<RestaurantCardProps> = ({
  name,
  type,
  discount,
  image,
}) => {
  return (
    <Card className="group relative overflow-hidden h-56">
      {discount && (
        <Badge className="absolute top-0 right-3 z-10 bg-black text-white border-0 p-2 py-3 text-sm font-medium flex items-center rounded-t-none">
          {discount}
        </Badge>
      )}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center opacity-90"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardContent className="relative z-10 flex flex-col justify-end h-full p-4">
        <span className="text-xs text-white/80 mb-1">{type}</span>
        <span className="text-base font-semibold text-white drop-shadow">
          {name}
        </span>
      </CardContent>
    </Card>
  );
};
