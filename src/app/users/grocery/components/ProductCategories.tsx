"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

import chipsImage from "../assets/chips.png";
import coffeeImage from "../assets/coffee.png";
import cookiesImage from "../assets/cookies.png";
import freshFruitsImage from "../assets/fresh-fruits.png";
import freshVegetablesImage from "../assets/fresh-vegetables.png";
import leafySeasoningsImage from "../assets/leafy-seasonings.png";
import liquidDrinksImage from "../assets/liquid-drinks.png";
import exoticFruits from "../assets/exotic-fruits.png";
import certifiedOrganic from "../assets/certified-organics.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: 1,
    name: "Fresh Vegetables",
    image: freshVegetablesImage,
  },
  {
    id: 2,
    name: "Fresh Fruits",
    image: freshFruitsImage,
  },
  {
    id: 3,
    name: "Leafy Seasonings",
    image: leafySeasoningsImage,
  },
  {
    id: 4,
    name: "Liquid Drinks",
    image: liquidDrinksImage,
  },
  {
    id: 5,
    name: "Chips & Snacks",
    image: chipsImage,
  },
  {
    id: 6,
    name: "Coffee & Tea",
    image: coffeeImage,
  },
  {
    id: 7,
    name: "Cookies & Biscuits",
    image: cookiesImage,
  },
  {
    id: 8,
    name: "Exotic Fruits",
    image: exoticFruits,
  },
  {
    id: 9,
    name: "Certified Organic",
    image: certifiedOrganic,
  },
];

export default function ProductCategories() {
  const [activeCategory, setActiveCategory] = useState<number>(1); // Default to first category active
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sliderPosition, setSliderPosition] = useState({ top: 0, height: 0 });

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);
  };

  // Update slider position when active category changes
  useEffect(() => {
    const activeIndex = categories.findIndex(
      (cat) => cat.id === activeCategory
    );
    if (activeIndex !== -1 && categoryRefs.current[activeIndex]) {
      const activeElement = categoryRefs.current[activeIndex];
      const containerRect =
        activeElement.parentElement?.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      if (containerRect) {
        setSliderPosition({
          top: activeRect.top - containerRect.top,
          height: activeRect.height,
        });
      }
    }
  }, [activeCategory]);

  // Set initial slider position
  useEffect(() => {
    const timer = setTimeout(() => {
      const activeIndex = categories.findIndex(
        (cat) => cat.id === activeCategory
      );
      if (activeIndex !== -1 && categoryRefs.current[activeIndex]) {
        const activeElement = categoryRefs.current[activeIndex];
        const containerRect =
          activeElement.parentElement?.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();

        if (containerRect) {
          setSliderPosition({
            top: activeRect.top - containerRect.top,
            height: activeRect.height,
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold p-5 text-center">Product Categories</h2>
      <div className="relative space-y-4">
        {/* Animated slider with bouncy spring animation */}
        <motion.div
          className="absolute -left-3 w-6 rounded-full bg-primary z-10"
          animate={{
            y: sliderPosition.top,
            height: sliderPosition.height,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            mass: 0.8,
            restDelta: 0.01,
            restSpeed: 0.01,
          }}
        />

        {categories.map((category, index) => {
          const isActive = activeCategory === category.id;
          return (
            <motion.div
              key={category.id}
              ref={(el) => {
                categoryRefs.current[index] = el;
              }}
              className="relative p-4 cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={cn(
                    "size-24 rounded-lg flex items-center justify-center border border-primary",
                    isActive ? "bg-primary" : "bg-gray-200"
                  )}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.83,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      mass: 0.6,
                    }}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      className="object-contain max-h-full max-w-full"
                    />
                  </motion.div>
                </div>
                <motion.h3
                  className="text-sm"
                  animate={{
                    color: isActive ? "rgb(var(--primary))" : "rgb(0, 0, 0)",
                    fontWeight: isActive ? 700 : 400,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                    mass: 0.4,
                  }}
                >
                  {category.name}
                </motion.h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
