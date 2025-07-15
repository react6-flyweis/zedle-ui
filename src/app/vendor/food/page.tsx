import { Testimonials } from "@/components/testimonials";
import { FoodHeroSection } from "./components/FoodHeroSection";
import { FoodOrdersGrid } from "./components/FoodOrdersGrid";
import { VendorFoodPersonalized } from "./components/VendorFoodPersonalized";

export default function VendorGroceryOrdersPage() {
  return (
    <div className="w-full">
      <FoodHeroSection />
      <FoodOrdersGrid />
      <Testimonials />
      <VendorFoodPersonalized />
    </div>
  );
}
