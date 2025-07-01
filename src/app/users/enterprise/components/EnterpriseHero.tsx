import { HeroComponent } from "@/components/HeroComponent";

import enterpriseHeroCharacter from "../assets/enterprise-hub-hero-character.png";

export function EnterpriseHero() {
  return (
    <HeroComponent
      title={["Feast Your Senses", "Quick and Best"]}
      subtitle="Request for any Enterprise you need"
      characterImage={enterpriseHeroCharacter}
      inputTitle="Enter a postcode to see what we deliver"
    />
  );
}
