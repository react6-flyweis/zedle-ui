import { Testimonials } from "@/components/testimonials";
import { FoodHeroSection } from "./components/FoodHeroSection";
import { FoodOrdersGrid } from "./components/FoodOrdersGrid";

export default function VendorGroceryOrdersPage() {
  return (
    <div className="w-full">
      <FoodHeroSection />
      <FoodOrdersGrid />
      <Testimonials />
    </div>
  );
}
