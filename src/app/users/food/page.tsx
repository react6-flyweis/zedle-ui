import { CategoriesTray } from "./components/CategoriesTray";
import { FoodDeliveryHero } from "./components/FoodDeliveryHero";
import { FoodDeliveryPersonalized } from "./components/FoodDeliveryPersonalized";

export default function page() {
  return (
    <div>
      <FoodDeliveryHero />
      <CategoriesTray />
      <FoodDeliveryPersonalized />
    </div>
  );
}
