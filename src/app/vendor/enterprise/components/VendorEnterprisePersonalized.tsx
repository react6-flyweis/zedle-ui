import Image from "next/image";

import vendorEnterprisePersonalizedPoster from "../assets/vendor-enterprise-personalized.png";

export function VendorEnterprisePersonalized() {
  return (
    <div className="px-10 mt-5">
      <Image
        src={vendorEnterprisePersonalizedPoster}
        alt="Personalized Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
