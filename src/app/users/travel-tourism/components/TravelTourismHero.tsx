import { HeroComponent } from "@/components/HeroComponent";

import travelTourismBackground from "../assets/travel-tourism-bg.jpg";
import travelTourismCharacter from "../assets/travel-tourism-charecter.png";

export function TravelTourismHero() {
  return (
    <HeroComponent
      title={["Your Trusted Partner", "In Every Journey"]}
      subtitle="Request for any travel you need"
      inputTitle="Enter a postcode to see what we deliver"
      characterImage={travelTourismCharacter}
      backgroundImage={travelTourismBackground}
    />
  );
}
