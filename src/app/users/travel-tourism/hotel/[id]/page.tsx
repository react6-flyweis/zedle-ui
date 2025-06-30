import { CustomerReviewsSection } from "@/components/CustomerReviewsSection";
import { LocationSection } from "@/components/map/LocationSection";
import { SelectDateDrawer } from "@/components/SelectDateDrawer";
import { Button } from "@/components/ui/button";

import { FacilitiesSection } from "../../components/FacilitiesSection";
import { HotelHero } from "../../components/HotelHero";
import { TravelTourismPersonalised } from "../../components/TravelTourismPersonalised";

export default function Page() {
  return (
    <div>
      <HotelHero />
      <FacilitiesSection />
      <LocationSection
        title="Mount Bromo"
        subtitle="New York"
        address="Tooley St, London Bridge, London SE1 2TF, United States of America"
        phone="+934443-43"
        latitude={51.505}
        longitude={-0.09}
      />
      <CustomerReviewsSection />
      <TravelTourismPersonalised />
      <div className="fixed bottom-0 w-full flex justify-center px-10">
        <SelectDateDrawer>
          <Button className="h-14 text-xl w-full rounded-t rounded-b-none">
            Select Date
          </Button>
        </SelectDateDrawer>
      </div>
    </div>
  );
}
