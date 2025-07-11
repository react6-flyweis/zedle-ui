import { Testimonials } from "@/components/testimonials";
import { VendorGuidePersonalized } from "./components/VendorGuidePersonalized";
import { VendorLocalGuideHero } from "./components/VendorLocalGuideHero";

export default function page() {
  return (
    <div>
      <VendorLocalGuideHero />
      <div className="max-w-6xl mx-auto"></div>
      <Testimonials />
      <VendorGuidePersonalized />
    </div>
  );
}
