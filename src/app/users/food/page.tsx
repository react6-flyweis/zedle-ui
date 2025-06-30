import { CategoriesTray } from "./components/CategoriesTray";
import { FoodDeliveryHero } from "./components/FoodDeliveryHero";
import { FoodDeliveryPersonalized } from "./components/FoodDeliveryPersonalized";
import { RestaurantsGrid } from "./components/RestaurantsGrid";

export default function page() {
  return (
    <div>
      <FoodDeliveryHero />
      <CategoriesTray />
      <RestaurantsGrid />
      <FoodDeliveryPersonalized />
    </div>
  );
}
