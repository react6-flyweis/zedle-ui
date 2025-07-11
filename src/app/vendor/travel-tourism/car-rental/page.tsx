import { Testimonials } from "@/components/testimonials";
import { CarRentalRequestGrid } from "./components/CarRentalRequestGrid";
import { VendorCarRentalHero } from "./components/VendorCarRentalHero";
import { VendorCarRentalPersonalized } from "./components/VendorCarRentalPersonalized";

export default function page() {
  return (
    <div>
      <VendorCarRentalHero />
      <div className="max-w-6xl mx-auto">
        <CarRentalRequestGrid />
      </div>
      <Testimonials />
      <VendorCarRentalPersonalized />
    </div>
  );
}
