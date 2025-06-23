import Image from "next/image";
import React from "react";
import { HeroComponent } from "@/components/HeroComponent";
import personalisedImage from "../assets/personalised.png";
import productsHeroBg from "../assets/products-hero-bg.jpg";
import productsHeroCharacter from "../assets/products-hero-character.png";
import GroceryCard from "../components/GroceryCard";
import ProductCategories from "../components/ProductCategories";

const products = [
  {
    id: 1,
    name: "Indian Tomato (Desi Tomato)",
    weight: "500 g",
    currentPrice: 40,
    originalPrice: 65,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1546470427-e013cb2d8a9e?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Beetroot",
    weight: "500 g",
    currentPrice: 90,
    originalPrice: 115,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Cauliflower",
    weight: "300 g",
    currentPrice: 80,
    originalPrice: 95,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1568584711271-946d1d4d4896?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Carrot",
    weight: "500 g",
    currentPrice: 40,
    originalPrice: 65,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Cabbage",
    weight: "500 g",
    currentPrice: 90,
    originalPrice: 115,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Purple Cabbage",
    weight: "300 g",
    currentPrice: 80,
    originalPrice: 95,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1518616127844-5a4b51252cd2?w=400&h=300&fit=crop",
  },
];

export default function ProductsPage() {
  return (
    <div className="">
      <HeroComponent
        characterImage={productsHeroCharacter}
        backgroundImage={productsHeroBg}
      />
      <section className="p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProductCategories />
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {products.map((product) => (
                <GroceryCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  weight={product.weight}
                  currentPrice={product.currentPrice}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="px-10">
        <Image
          src={personalisedImage}
          alt="Personalised Recommendations"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
