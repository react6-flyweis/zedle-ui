import Image from "next/image";

import vendorFoodPersonalizedImage from "../assets/vendor-food-personalized.png";

export function VendorFoodPersonalized() {
  return (
    <div className="px-10 mt-5">
      <Image
        src={vendorFoodPersonalizedImage}
        alt="Personalized Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
