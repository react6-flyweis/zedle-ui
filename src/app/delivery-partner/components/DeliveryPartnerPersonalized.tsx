import Image from "next/image";
import deliveryPartnerPersonalizedImage from "../assets/deliver-partner-personalized.png";

export function DeliveryPartnerPersonalized() {
  return (
    <div className="px-10">
      <Image
        src={deliveryPartnerPersonalizedImage}
        alt="Personalized Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
