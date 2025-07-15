"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const serviceItems: ServiceItem[] = [
  {
    id: 1,
    title: "Hair Saloon",
    subtitle: "210 Salons",
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Barbershop",
    subtitle: "136 Shops",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Nail Saloon",
    subtitle: "45 Salons",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Massage",
    subtitle: "169 Massage Parlour",
    image:
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    title: "Makeup",
    subtitle: "89 Makeup Salons",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
];

export function OurServicesTray() {
  const t = useTranslations("OurServicesTray");
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
    <section className="p-5 md:p-8 relative">
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
        {serviceItems.map((item) => (
          <Card
            key={item.id}
            className="w-60 p-0 gap-0 flex-shrink-0 bg-background border-muted/30 shadow-sm rounded-md overflow-hidden"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="260px"
                priority={item.id === 1}
              />
            </div>
            <CardContent className="p-3">
              <div className="font-semibold text-foreground mb-1">
                {item.title}
              </div>
              <div className="text-xs text-primary">{item.subtitle}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
