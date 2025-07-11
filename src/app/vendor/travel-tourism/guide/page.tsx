import { Testimonials } from "@/components/testimonials";
import { GuideRequestGrid } from "./components/GuideRequestGrid";
import { VendorGuidePersonalized } from "./components/VendorGuidePersonalized";
import { VendorLocalGuideHero } from "./components/VendorLocalGuideHero";

export default function page() {
  return (
    <div>
      <VendorLocalGuideHero />
      <div className="max-w-6xl mx-auto">
        <GuideRequestGrid />
      </div>
      <Testimonials />
      <VendorGuidePersonalized />
    </div>
  );
}
