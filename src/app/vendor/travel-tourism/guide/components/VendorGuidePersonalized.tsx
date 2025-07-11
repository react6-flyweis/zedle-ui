import Image from "next/image";

import vendorLocalGuidePersonalizedPoster from "../assets/vendor-guide-personalized.png";

export function VendorGuidePersonalized() {
  return (
    <div className="px-10 mt-5">
      <Image
        src={vendorLocalGuidePersonalizedPoster}
        alt="Personalized Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
