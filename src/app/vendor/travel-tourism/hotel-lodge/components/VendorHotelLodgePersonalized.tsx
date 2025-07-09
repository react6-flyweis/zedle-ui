import Image from "next/image";

import vendorHotelLodgePersonalizedPoster from "../assets/hotel-lodge-personalised.png";

export function VendorHotelLodgePersonalized() {
  return (
    <div className="px-10 mt-5">
      <Image
        src={vendorHotelLodgePersonalizedPoster}
        alt="Personalized Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
