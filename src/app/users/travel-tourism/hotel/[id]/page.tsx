import Image from "next/image";
import personalisedTourTravelImage from "../../assets/tour-travels-personalised-app.png";
import { CustomerReviewsSection } from "../../components/CustomerReviewsSection";
import { FacilitiesSection } from "../../components/FacilitiesSection";
import { HotelHero } from "../../components/HotelHero";
import { LocationSection } from "../../components/LocationSection";

export default function Page() {
  return (
    <>
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
      <div className="px-10">
        <Image
          src={personalisedTourTravelImage}
          alt="Personalised Recommendations"
          className="w-full h-auto object-cover"
        />
      </div>
    </>
  );
}
