import { HeroComponent } from "@/components/HeroComponent";
import tourTravelsServicesCharacter from "../assets/tour-travels-services-character.png";
import tourTravelsBg from "../assets/travel-tourism-bg.jpg";

export function ServicesHero() {
  return (
    <HeroComponent
      title={["Your Trusted Partner", "In Every Journey"]}
      subtitle="Request for any travel you need"
      inputTitle="Enter a postcode to see what we deliver"
      characterImage={tourTravelsServicesCharacter}
      backgroundImage={tourTravelsBg}
    />
  );
}
