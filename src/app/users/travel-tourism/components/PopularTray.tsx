"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PopularItem {
  id: number;
  title: string;
  subtitle: string;
  rating: number;
  price: number;
  image: string;
  badge: string;
}

const popularItems: PopularItem[] = [
  {
    id: 1,
    title: "Mount Bromo",
    subtitle: "Volcano in East Java",
    rating: 4.9,
    price: 150,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "3D2N",
  },
  {
    id: 2,
    title: "Mount Bromo",
    subtitle: "Volcano in East Java",
    rating: 4.9,
    price: 150,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "3D2N",
  },
  {
    id: 3,
    title: "Mount Bromo",
    subtitle: "Volcano in East Java",
    rating: 4.9,
    price: 150,
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "3D2N",
  },
  {
    id: 4,
    title: "Mount Bromo",
    subtitle: "Volcano in East Java",
    rating: 4.9,
    price: 150,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "3D2N",
  },
  {
    id: 5,
    title: "Mount Bromo",
    subtitle: "Volcano in East Java",
    rating: 4.9,
    price: 150,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "3D2N",
  },
];

export function PopularTray() {
  const t = useTranslations("popularTray");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left:
          dir === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="p-8 relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-primary bg-transparent rounded"
            onClick={() => scroll("left")}
            aria-label={t("scrollLeft")}
          >
            <ChevronLeft className="size-6 text-primary" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-primary bg-transparent rounded"
            onClick={() => scroll("right")}
            aria-label={t("scrollRight")}
          >
            <ChevronRight className="size-6 text-primary" />
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">{t("description")}</p>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {popularItems.map((item) => (
          <Card
            key={item.id}
            className="w-60 p-0 gap-0 flex-shrink-0 bg-background border-muted/30 shadow-sm"
          >
            <div className="relative h-40 w-full rounded-t-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="260px"
                priority={item.id === 1}
              />
            </div>
            <CardContent className="p-4">
              <div className="font-semibold text-green-900 mb-1">
                {item.title}
              </div>
              <div className="text-xs text-primary mb-2">{item.subtitle}</div>
              <div className="flex items-center text-xs text-muted-foreground mb-2 gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span>{item.rating}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-muted-foreground">
                  {t("startFrom")} <br />
                  <span className="text-green-900 font-semibold">
                    $ {item.price}/pax
                  </span>
                </div>
                <span className="bg-green-800/90 rounded-full p-1  text-white text-xs px-4 py-1 font-medium">
                  {item.badge}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
