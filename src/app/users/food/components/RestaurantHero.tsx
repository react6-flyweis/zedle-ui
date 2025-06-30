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
      className="flex h-[50vh] p-10  relative mb-8"
      style={{
        background: `url(${image}) center center / cover no-repeat`,
      }}
    >
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/90  pointer-events-none z-0" />
      {/* Left: Info */}
      <div className="flex-1 flex flex-col gap-4 justify-end relative z-10 pb-5">
        <p className="text-lg">{t("slogan")}</p>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          McDonald&apos;s East New York
        </h1>
        <div className="flex flex-row gap-3 mt-2">
          <Badge className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
            <Image
              src={orderIcon}
              alt="Order Icon"
              className="size-5"
              width={30}
              height={30}
            />
            {t("minimumOrder", { amount: 20 })}
          </Badge>
          <Badge className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
            <Image
              src={deliveryGuyIcon}
              alt="Delivery Guy"
              className="size-5"
              width={30}
              height={30}
            />
            {t("deliveryTime", { min: 20, max: 25 })}
          </Badge>
        </div>

        <Button className="absolute -bottom-16 -left-10 w-60 pl-12 h-12  rounded-l-none">
          <ClockIcon className="text-white size-5" />
          <span>{t("openUntil", { time: "3:00 AM" })}</span>
        </Button>
      </div>
      {/* Right: Image and Rating */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="relative">
          <Image
            src={image}
            alt="Mountain"
            className="object-cover rounded-xl h-60 w-96"
            priority
            height={200}
            width={400}
          />
          {/* Rating Badge */}
          <div className="absolute -bottom-8 -left-12 bg-white rounded-md p-3 flex flex-col items-center shadow w-28">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-4xl text-foreground leading-none">
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
                      className="size-4 text-yellow-400 fill-yellow-400"
                    />
                  );
                if (type === "half")
                  return (
                    <span key={key} className="relative w-5 h-5 inline-block">
                      <Star
                        className="size-4 text-yellow-400 fill-yellow-400 absolute left-0 top-0"
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                      />
                      <Star
                        className="size-4 text-gray-300 fill-gray-200 stroke-gray-300 absolute left-0 top-0"
                        style={{ clipPath: "inset(0 0 0 50%)" }}
                      />
                    </span>
                  );
                return (
                  <Star
                    key={key}
                    className="size-4 text-gray-300 fill-gray-200 stroke-gray-300"
                  />
                );
              })}
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {reviewCount.toLocaleString()} {t("reviews")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
