import Image from "next/image";

import vendorCarRentalPersonalizedPoster from "../assets/vendor-car-rental-personalized.png";

export function VendorCarRentalPersonalized() {
  return (
    <div className="px-10 mt-5">
      <Image
        src={vendorCarRentalPersonalizedPoster}
        alt="Personalized Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
