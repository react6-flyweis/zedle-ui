import { HeroComponent } from "@/components/HeroComponent";

import enterpriseServicesHeroCharacter from "../assets/enterprise-services-hero-character.png";

export function EnterpriseServicesHero() {
  return (
    <HeroComponent
      title={["Feast Your Senses", "Quick and Best"]}
      subtitle="Request for any Enterprise you need"
      characterImage={enterpriseServicesHeroCharacter}
      inputTitle="Enter a postcode to see what we deliver"
    />
  );
}
