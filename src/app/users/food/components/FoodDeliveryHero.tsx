import { HeroComponent } from "@/components/HeroComponent";
import foodDeliveryHeroBg from "../assets/food-delivery-hero-bg.jpg";
import foodDeliveryHeroCharacter from "../assets/food-delivery-hero-character.png";

export function FoodDeliveryHero() {
  return (
    <HeroComponent
      backgroundImage={foodDeliveryHeroBg}
      characterImage={foodDeliveryHeroCharacter}
      title={["Feast Your Senses", "Fast and Fresh"]}
      subtitle="Order Restaurant food, takeaway and groceries."
      inputTitle="Enter a postcode to see what we deliver"
    />
  );
}
