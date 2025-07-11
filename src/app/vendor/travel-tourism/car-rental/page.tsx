import { Testimonials } from "@/components/testimonials";
import { VendorCarRentalHero } from "./components/VendorCarRentalHero";
import { VendorCarRentalPersonalized } from "./components/VendorCarRentalPersonalized";

export default function page() {
  return (
    <div>
      <VendorCarRentalHero />
      <div className="max-w-6xl mx-auto"></div>
      <Testimonials />
      <VendorCarRentalPersonalized />
    </div>
  );
}
