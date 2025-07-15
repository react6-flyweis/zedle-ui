import { ClockIcon, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import deliveryGuyIcon from "../assets/delivery-guy.png";
import orderIcon from "../assets/order.png";

export const RestaurantHero = () => {
  const t = useTranslations("RestaurantHero");
  const image =
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80";
  const rating = 3.5;
  const reviewCount = 1360;
  const maxStars = 5;
  const getStarType = (index: number) => {
    if (rating >= index + 1) return "full";
    if (rating >= index + 0.5) return "half";
    return "empty";
  };
  return (
    <section
      className="flex flex-col md:flex-row h-auto min-h-[50vh] p-4 md:p-8 relative mb-10 md:mb-14 pb-10 md:pb-14"
      style={{
        background: `url(${image}) center center / cover no-repeat`,
      }}
    >
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/90 pointer-events-none z-0" />
      {/* Left: Info */}
      <div className="flex-1 flex flex-col gap-3 md:gap-4 justify-end z-10 pb-4 md:pb-5">
        <p className="text-base md:text-lg">{t("slogan")}</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
          McDonald&apos;s East New York
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-2">
          <Badge className="flex items-center gap-2 bg-gray-900 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium">
            <Image
              src={orderIcon}
              alt="Order Icon"
              className="size-4 md:size-5"
              width={24}
              height={24}
            />
            {t("minimumOrder", { amount: 20 })}
          </Badge>
          <Badge className="flex items-center gap-2 bg-gray-900 text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium">
            <Image
              src={deliveryGuyIcon}
              alt="Delivery Guy"
              className="size-4 md:size-5"
              width={24}
              height={24}
            />
            {t("deliveryTime", { min: 20, max: 25 })}
          </Badge>
        </div>

        <Button className="absolute left-0 bottom-[-3.5rem] md:bottom-[-4rem] w-48 md:w-60 pl-8 md:pl-12 h-10 md:h-12 rounded-l-none flex items-center gap-2">
          <ClockIcon className="text-white size-4 md:size-5" />
          <span className="text-xs md:text-base">
            {t("openUntil", { time: "3:00 AM" })}
          </span>
        </Button>
      </div>
      {/* Right: Image and Rating */}
      <div className="flex-1 flex items-center justify-center relative z-10 mt-8 md:mt-0">
        <div className="relative flex flex-col items-center">
          <Image
            src={image}
            alt="Restaurant"
            className="object-cover rounded-xl h-40 w-64 sm:h-48 sm:w-72 md:h-48 md:w-96"
            priority
            height={200}
            width={400}
          />
          {/* Rating Badge */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-md p-2 md:p-3 flex flex-col items-center shadow w-20 md:w-28">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-2xl md:text-4xl text-foreground leading-none">
                {rating}
              </span>
            </div>
            <div className="flex items-center gap-0.5 mt-1 mb-1">
              {[...Array(maxStars)].map((_, i) => {
                const type = getStarType(i);
                const key = `${type}-${i}`;
                if (type === "full")
                  return (
                    <Star
                      key={key}
                      className="size-3 md:size-4 text-yellow-400 fill-yellow-400"
                    />
                  );
                if (type === "half")
                  return (
                    <span
                      key={key}
                      className="relative w-4 md:w-5 h-4 md:h-5 inline-block"
                    >
                      <Star
                        className="size-3 md:size-4 text-yellow-400 fill-yellow-400 absolute left-0 top-0"
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                      />
                      <Star
                        className="size-3 md:size-4 text-gray-300 fill-gray-200 stroke-gray-300 absolute left-0 top-0"
                        style={{ clipPath: "inset(0 0 0 50%)" }}
                      />
                    </span>
                  );
                return (
                  <Star
                    key={key}
                    className="size-3 md:size-4 text-gray-300 fill-gray-200 stroke-gray-300"
                  />
                );
              })}
            </div>
            <span className="text-xs md:text-sm text-muted-foreground font-medium">
              {reviewCount.toLocaleString()} {t("reviews")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
