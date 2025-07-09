import { Testimonials } from "@/components/testimonials";
import { HotelRequestCardGrid } from "./components/HotelRequestCardGrid";
import { VendorHotelLodgeHero } from "./components/VendorHotelLodgeHero";
import { VendorHotelLodgePersonalized } from "./components/VendorHotelLodgePersonalized";

export default function page() {
  return (
    <div className="space-y-8">
      <VendorHotelLodgeHero />
      <div className="max-w-6xl mx-auto">
        <HotelRequestCardGrid />
      </div>
      <Testimonials />
      <VendorHotelLodgePersonalized />
    </div>
  );
}
