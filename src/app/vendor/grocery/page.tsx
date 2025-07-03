import { GroceryHeroSection } from "./components/GroceryHeroSection";
import { OrdersGrid } from "./components/OrdersGrid";
import { VendorGroceryPersonalized } from "./components/VendorGroceryPersonalized";

export default function VendorGroceryOrdersPage() {
  return (
    <div className="w-full">
      <GroceryHeroSection />
      <OrdersGrid />
      <VendorGroceryPersonalized />
    </div>
  );
}
