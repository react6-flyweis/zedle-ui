import HeroSection from "../components/HeroSection";
import OrdersTabs from "../components/OrdersTabs";

export default function OrdersPage() {
  return (
    <div className="">
      <HeroSection />
      <div className="-mt-48 mb-16 relative">
        <OrdersTabs />
      </div>
    </div>
  );
}
