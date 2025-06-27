import Image from "next/image";
import personalisedTourTravelImage from "../assets/tour-travels-personalised-app.png";

export function TravelTourismPersonalised() {
  return (
    <div className="px-10">
      <Image
        src={personalisedTourTravelImage}
        alt="Personalised Recommendations"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
