import { CalendarCheck, Clock, ClockIcon, Heart, Star } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const HotelHero = () => {
  const image =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
  return (
    <section
      className="flex flex-col md:flex-row h-auto min-h-[50vh] p-4 md:p-8 lg:p-10 relative mb-10 md:mb-14 pb-10 md:pb-14"
      style={{
        background: `url(${image}) center center / cover no-repeat`,
      }}
    >
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm pointer-events-none z-0" />
      {/* Left: Info */}
      <div className="flex-1 flex flex-col gap-3 md:gap-4 justify-end z-10 pb-4 md:pb-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
          Mount Bromo
        </h1>
        <div className="text-lg md:text-xl lg:text-2xl font-semibold">
          $150
          <span className="text-base md:text-lg font-normal text-muted-foreground">
            /pax
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-2">
          <Badge className="flex items-center gap-2 bg-gray-900 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium">
            <CalendarCheck className="size-4 md:size-5" />
            Check In Time: 11:00 AM
          </Badge>
          <Badge className="flex items-center gap-2 bg-gray-900 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium">
            <Clock className="size-4 md:size-5" />
            Avg Response Time 6 hours
          </Badge>
        </div>

        <Button className="absolute left-0 bottom-[-3.5rem] md:bottom-[-4rem] w-48 md:w-60 pl-8 md:pl-12 h-10 md:h-12 rounded-l-none flex items-center gap-2">
          <ClockIcon className="text-white size-4 md:size-5" />
          <span className="text-xs md:text-base">Open until 3:00 AM</span>
        </Button>
      </div>
      {/* Right: Image and Rating */}
      <div className="flex-1 flex items-center justify-center relative z-10 mt-8 md:mt-0">
        <div className="relative flex flex-col items-center">
          <Image
            src={image}
            alt="Mountain"
            className="object-cover rounded-xl h-40 w-64 sm:h-48 sm:w-72 md:h-48 md:w-96"
            priority
            height={200}
            width={400}
          />
          {/* Heart Icon */}
          <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md">
            <Heart className="size-7 fill-destructive text-destructive" />
          </div>
          {/* Rating Badge */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-md p-2 md:p-3 flex flex-col items-center shadow w-20 md:w-28">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-2xl md:text-4xl text-foreground leading-none">
                4.9
              </span>
              <Star className="size-4 md:size-5 text-yellow-400 fill-yellow-400" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground font-medium mt-1">
              1,380 reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
