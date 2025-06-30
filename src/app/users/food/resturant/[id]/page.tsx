import { CustomerReviewsSection } from "@/components/CustomerReviewsSection";
import { LocationSection } from "@/components/map/LocationSection";
import { FoodDeliveryPersonalized } from "../../components/FoodDeliveryPersonalized";
import { RestaurantHero } from "../../components/RestaurantHero";

export default function Page() {
  return (
    <div>
      <RestaurantHero />
      <LocationSection
        title="Mount Bromo"
        subtitle="New York"
        address="Tooley St, London Bridge, London SE1 2TF, United States of America"
        phone="+934443-43"
        latitude={51.505}
        longitude={-0.09}
      />
      <CustomerReviewsSection />
      <FoodDeliveryPersonalized />
    </div>
  );
}
