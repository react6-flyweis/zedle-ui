import Image from "next/image";
import vendorGroceryPersonalized from "../assets/vendor-grocery-personalized.png";

export function VendorGroceryPersonalized() {
  return (
    <div className="px-10 mt-5">
      <Image
        src={vendorGroceryPersonalized}
        alt="Personalized Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
