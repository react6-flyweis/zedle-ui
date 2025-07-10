import Image from "next/image";

import vendorTourBookingPersonalizedPoster from "../assets/vendor-tour-booking-personalized.png";

export function VendorTourBookingPersonalized() {
  return (
    <div className="px-10 mt-5">
      <Image
        src={vendorTourBookingPersonalizedPoster}
        alt="Personalized Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
