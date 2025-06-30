import { Utensils } from "lucide-react";
import { useTranslations } from "next-intl";
import { RestaurantCard } from "./RestaurantCard";

const restaurants = [
  {
    id: 1,
    name: "McDonald's East New York",
    type: "Restaurant",
    discount: "-40%",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Grand Ai Cafe London",
    type: "Restaurant",
    discount: "-20%",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Butterbrot Café London",
    type: "Restaurant",
    discount: "-17%",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Chef Burgers London",
    type: "Restaurant",
    discount: "-40%",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Grand Ai Cafe London",
    type: "Restaurant",
    discount: "-20%",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Butterbrot Café London",
    type: "Restaurant",
    discount: "-17%",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  },
];

export function RestaurantsGrid() {
  const t = useTranslations("restaurants");
  return (
    <section className="p-8">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-2xl font-semibold">
          {t("topRestaurants", { count: 136 })}
        </h2>
        <Utensils className="w-5 h-5 text-primary" />
      </div>
      <p className="text-muted-foreground mb-6">
        {t("topRestaurantsDescription")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {restaurants.map((r) => (
          <RestaurantCard
            key={r.id}
            name={r.name}
            type={r.type}
            discount={r.discount}
            image={r.image}
          />
        ))}
      </div>
    </section>
  );
}
