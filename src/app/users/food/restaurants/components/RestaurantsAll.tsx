"use client";
import { Utensils } from "lucide-react";
import { useTranslations } from "next-intl";
import { RestaurantCard } from "../../components/RestaurantCard";

const mockRestaurants = [
  {
    id: 1,
    name: "McDonald's East New York",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    discount: 40,
    place: "London",
    brand: "Restaurant",
  },
  {
    id: 2,
    name: "Grand Ai Cafe London",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
    discount: 20,
    place: "London",
    brand: "Restaurant",
  },
  {
    id: 3,
    name: "Butterbrot Cafe London",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    discount: 17,
    place: "London",
    brand: "Restaurant",
  },
  {
    id: 4,
    name: "Chef Burgers London",
    image:
      "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=600&q=80",
    discount: 40,
    place: "London",
    brand: "Restaurant",
  },
  {
    id: 5,
    name: "Grand Ai Cafe London",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    discount: 20,
    place: "London",
    brand: "Restaurant",
  },
  {
    id: 6,
    name: "Butterbrot Cafe London",
    image:
      "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=600&q=80",
    discount: 17,
    place: "London",
    brand: "Restaurant",
  },
  {
    id: 7,
    name: "Chef Burgers London",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    discount: 40,
    place: "London",
    brand: "Restaurant",
  },
  {
    id: 8,
    name: "Grand Ai Cafe London",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
    discount: 20,
    place: "London",
    brand: "Restaurant",
  },
  {
    id: 9,
    name: "Butterbrot Cafe London",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
    discount: 17,
    place: "London",
    brand: "Restaurant",
  },
];

export function RestaurantsAll() {
  const t = useTranslations("allRestaurants");
  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          {t("title")} <Utensils className="w-5 h-5 text-primary" />
        </h2>
        <p className="text-muted-foreground mt-1 text-base">
          {t("description")}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            name={restaurant.name}
            type={t("restaurant")}
            discount={t("discount", {
              percent: `-${restaurant.discount}%`,
            })}
            image={restaurant.image}
          />
        ))}
      </div>
    </section>
  );
}
