"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  count: number;
}

const categories: CategoryItem[] = [
  {
    id: 1,
    title: "Burgers",
    subtitle: "Restaurants Count",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    count: 21,
  },
  {
    id: 2,
    title: "Salads",
    subtitle: "Restaurants Count",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    count: 32,
  },
  {
    id: 3,
    title: "Pasta",
    subtitle: "Restaurants Count",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=400&q=80",
    count: 4,
  },
  {
    id: 4,
    title: "Pizza",
    subtitle: "Restaurants Count",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    count: 32,
  },
  {
    id: 5,
    title: "Breakfast",
    subtitle: "Restaurants Count",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    count: 4,
  },
];

export function CategoriesTray() {
  const t = useTranslations("categories");
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="relative p-8 bg-muted/30 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {t("topCategories")}
          </h2>
          <span className="text-2xl">😋</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-primary bg-transparent rounded"
            onClick={() => scroll("left")}
            aria-label={t("scrollLeft")}
          >
            <ChevronLeft className="size-5 text-primary" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-primary bg-transparent rounded"
            onClick={() => scroll("right")}
            aria-label={t("scrollRight")}
          >
            <ChevronRight className="size-5 text-primary" />
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">{t("description")}</p>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories.map((item) => (
          <Card
            key={item.id}
            className="w-48 md:w-60 p-0 gap-0 flex-shrink-0 bg-background border-muted/30 shadow-sm"
          >
            <div className="relative h-52 w-full rounded-t-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="220px"
                priority={item.id === 1}
              />
            </div>
            <CardContent className="p-2">
              <div className="font-semibold text-foreground mb-1 text-sm md:text-base">
                {item.title}
              </div>
              <div className="text-xs text-primary">
                {item.count} {t("restaurants")}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
