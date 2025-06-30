import { FoodDeliveryPersonalized } from "../components/FoodDeliveryPersonalized";
import { RestaurantsHero } from "../components/RestaurantsHero";
import { RestaurantsAll } from "./components/RestaurantsAll";

export default function RestaurantsPage() {
  return (
    <div className="">
      <RestaurantsHero />
      <div className="py-8 px-4 md:px-8">
        <RestaurantsAll />
      </div>
      <FoodDeliveryPersonalized />
    </div>
  );
}
