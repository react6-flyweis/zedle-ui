import { Testimonials } from "@/components/testimonials";
import { RequestCardGrid } from "./components/RequestCardGrid";
import { VendorEnterpriseHero } from "./components/VendorEnterpriseHero";
import { VendorEnterprisePersonalized } from "./components/VendorEnterprisePersonalized";

export default function page() {
  return (
    <div className="space-y-8">
      <VendorEnterpriseHero />
      <div className="max-w-6xl mx-auto">
        <RequestCardGrid />
      </div>
      <Testimonials />
      <VendorEnterprisePersonalized />
    </div>
  );
}
