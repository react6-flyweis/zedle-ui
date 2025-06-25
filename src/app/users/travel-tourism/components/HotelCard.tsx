import { Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface IHotel {
  id: number;
  name: string;
  address: string;
  price: number;
  rating: number;
  image: string;
}

export function HotelCard({ hotel }: { hotel: IHotel }) {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-0">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Rating Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-black/80 text-white border-0 px-2 py-1 text-xs font-medium">
              <Star className="w-3 h-3 fill-current mr-1" />
              {hotel.rating}
            </Badge>
          </div>
          {/* Hotel Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
              {hotel.name}
            </h3>
            <p className="text-white/80 text-sm mb-2 line-clamp-1">
              {hotel.address}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-white">
                <span className="text-2xl font-bold">${hotel.price}</span>
                <span className="text-white/80 text-sm">/night</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
