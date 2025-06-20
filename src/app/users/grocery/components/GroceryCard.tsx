"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heartIcon from "../assets/icons/Heart.png";

interface GroceryCardProps {
  id: number;
  name: string;
  weight: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  image: string;
  onAddToCart?: (id: number) => void;
}

export default function GroceryCard({
  id,
  name,
  weight,
  currentPrice,
  originalPrice,
  discount,
  image,
}: GroceryCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    console.log(`Added product ${id} to cart`);
    // Add your cart logic here
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border-0 rounded-xl p-0">
      <CardContent className="p-0">
        {/* Background Image with Overlay Content */}
        <div
          className="relative h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 rounded-xl" />

          {/* Discount Badge */}
          <div className="absolute top-0 right-3 bg-blue-950 text-white px-3 py-3 rounded-b-md text-sm font-medium">
            -{discount}%
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={toggleWishlist}
            className="absolute top-3 left-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200"
          >
            <Image
              src={heartIcon}
              alt="Wishlist"
              className={`w-4 h-4 ${!isWishlisted ? "grayscale" : ""}`}
            />
          </button>

          {/* Product Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {/* Product Info */}
            <div className="mb-3">
              <h3 className="font-semibold text-white mb-1 text-lg line-clamp-2">
                {name}
              </h3>
              <p className="text-sm text-white/90">{weight}</p>
            </div>

            {/* Price Section */}
            <div className="flex flex-col gap-2 mb-3">
              <span className="text-2xl font-bold text-white">
                $ {currentPrice}
              </span>
              <span className="text-sm text-white/70 line-through">
                $ {originalPrice}
              </span>
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="w-full bg-green-100 hover:bg-green-200 rounded-lg text-green-600 py-2.5 font-medium transition-colors duration-200"
            >
              ADD
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
