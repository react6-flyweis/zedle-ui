import { Testimonials } from "@/components/testimonials";
import { TourRequestCardGrid } from "./components/TourRequestCardGrid";
import { VendorTourBookingHero } from "./components/VendorTourBookingHero";
import { VendorTourBookingPersonalized } from "./components/VendorTourBookingPersonalized";

export default function page() {
  return (
    <div>
      <VendorTourBookingHero />
      <div className="max-w-6xl mx-auto">
        <TourRequestCardGrid />
      </div>
      <Testimonials />
      <VendorTourBookingPersonalized />
    </div>
  );
}
