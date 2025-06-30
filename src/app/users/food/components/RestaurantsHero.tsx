import { HeroComponent } from "@/components/HeroComponent";
import restaurantsHeroBg from "../assets/restaurants-hero-bg.png";
import restaurantsHeroCharacter from "../assets/restaurants-hero-character.png";

export function RestaurantsHero() {
  return (
    <HeroComponent
      backgroundImage={restaurantsHeroBg}
      characterImage={restaurantsHeroCharacter}
      title={["Feast Your Senses", "Fast and Fresh"]}
      subtitle="Order Restaurant food, takeaway and groceries."
      inputTitle="Enter a postcode to see what we deliver"
    />
  );
}
