import Image from "next/image";
import foodDeliveryPersonalizedImage from "../assets/food-delivery-personalized.png";

export function FoodDeliveryPersonalized() {
  return (
    <div className="px-10">
      <Image
        src={foodDeliveryPersonalizedImage}
        alt="Personalized Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
