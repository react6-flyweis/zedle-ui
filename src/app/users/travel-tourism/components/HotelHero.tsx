import { CalendarCheck, Clock, ClockIcon, Heart, Star } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const HotelHero = () => {
  const image =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
  return (
    <section
      className="flex h-60 p-5  relative"
      style={{
        background: `url(${image}) center center / cover no-repeat`,
      }}
    >
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm pointer-events-none z-0" />
      {/* Left: Info */}
      <div className="flex-1 flex flex-col gap-4 justify-end relative z-10 pb-5">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Mount Bromo
        </h1>
        <div className="text-xl font-semibold">
          $150
          <span className="text-base font-normal text-muted-foreground">
            /pax
          </span>
        </div>
        <div className="flex flex-row gap-3 mt-2">
          <Badge className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
            <CalendarCheck className="w-4 h-4" />
            Check In Time: 11:00 AM
          </Badge>
          <Badge className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Avg Response Time 6 hours
          </Badge>
        </div>

        <Button className="absolute -bottom-8 -left-6 pl-5  rounded-l-none">
          <ClockIcon className="text-white" />
          <span>Open until 3:00 AM</span>
        </Button>
      </div>
      {/* Right: Image and Rating */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="relative">
          <Image
            src={image}
            alt="Mountain"
            className="object-cover rounded-xl h-52 w-96"
            priority
            height={200}
            width={400}
          />
          {/* Heart Icon */}
          <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md">
            <Heart className="size-7 fill-destructive text-destructive" />
          </div>
          {/* Rating Badge */}
          <div className="absolute -bottom-5 -left-4 bg-white rounded-lg px-4 py-2 flex flex-col items-center shadow-md w-20">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-foreground">4.9</span>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              1,380 reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
