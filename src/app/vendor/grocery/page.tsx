import { GroceryHeroSection } from "./components/GroceryHeroSection";
import { OrdersGrid } from "./components/OrdersGrid";

export default function VendorOrdersPage() {
  return (
    <div className="w-full">
      <GroceryHeroSection />
      <OrdersGrid />
    </div>
  );
}
