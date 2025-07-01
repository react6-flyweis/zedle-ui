import { CustomerReviewsSection } from "@/components/CustomerReviewsSection";
import { LocationSection } from "@/components/map/LocationSection";
import { ServicesSection } from "@/components/ServicesSection";
import { EnterprisePersonalized } from "../../components/EnterpriseHubPersonalized";
import { SalonHero } from "../../components/SalonHero";

export default function Page() {
  return (
    <div>
      <SalonHero />
      <ServicesSection />
      <LocationSection
        title="Mount Bromo"
        subtitle="New York"
        address="Tooley St, London Bridge, London SE1 2TF, United States of America"
        phone="+934443-43"
        latitude={51.505}
        longitude={-0.09}
      />
      <CustomerReviewsSection />
      <EnterprisePersonalized />
    </div>
  );
}
