import Image from "next/image";
import cartIcon from "@/assets/icons/cart-icon.png";
import { CustomerReviewsSection } from "@/components/CustomerReviewsSection";
import { LocationSection } from "@/components/map/LocationSection";
import { OffersSection } from "@/components/OffersSection";
import { Button } from "@/components/ui/button";
import { FoodDeliveryPersonalized } from "../../components/FoodDeliveryPersonalized";
import { RestaurantHero } from "../../components/RestaurantHero";
import { RestaurantInfoSection } from "../../components/RestaurantInfoSection";

export default function Page() {
  return (
    <div>
      <RestaurantHero />
      <OffersSection />
      <RestaurantInfoSection />
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

      <div className="fixed bottom-0 w-full px-10">
        <Button className="h-12 flex w-full justify-between rounded-t rounded-b-none text-lg px-5">
          <p>0 item added</p>
          <span className="flex items-center gap-2">
            view cart
            <Image
              src={cartIcon}
              alt="Cart Icon"
              width={24}
              height={24}
              className="size-4 invert brightness-0"
            />
          </span>
        </Button>
      </div>
    </div>
  );
}
