import { HeroComponent } from "@/components/HeroComponent";
import groceryHeroBg from "../assets/grocery-hero-bg.jpg";
import groceryHeroCharacter from "../assets/grocery-hero-charector.png";

export default function GroceryHero() {
  return (
    <HeroComponent
      backgroundImage={groceryHeroBg}
      characterImage={groceryHeroCharacter}
      title={["Feast Your Senses", "Fast and Fresh"]}
      subtitle="Order Restaurant food, takeaway and groceries."
      inputTitle="Enter a postcode to see what we deliver"
    />
  );
}
