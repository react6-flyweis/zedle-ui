import { CategoriesTray } from "./components/CategoriesTray";
import { FoodDeliveryHero } from "./components/FoodDeliveryHero";

export default function page() {
  return (
    <div>
      <FoodDeliveryHero />
      <CategoriesTray />
    </div>
  );
}
