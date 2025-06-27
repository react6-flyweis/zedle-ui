import tourTravelsBg from "@/app/users/travel-tourism/assets/travel-tourism-bg.jpg";
import { HeroComponent } from "@/components/HeroComponent";
import tourTravelsServicesCharacter from "../assets/travel-tourism-services-character.png";

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
