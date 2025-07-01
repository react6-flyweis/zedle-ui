import Image from "next/image";
import enterprisePersonalizedImage from "../assets/enterprise-personalized-app.png";

export function EnterprisePersonalized() {
  return (
    <div className="px-10">
      <Image
        src={enterprisePersonalizedImage}
        alt="Personalized Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
