"use client";

import { motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  image: string | StaticImageData;
}

interface ServicesCategoriesProps {
  categories: Category[];
  activeCategory: number;
  onCategoryClick: (id: number) => void;
  title: string;
}

export function ServicesCategories({
  categories,
  activeCategory,
  onCategoryClick,
  title,
}: ServicesCategoriesProps) {
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState({ top: 0, height: 0 });

  const updateSliderPosition = useCallback(() => {
    const activeIndex = categories.findIndex(
      (cat) => cat.id === activeCategory,
    );
    if (
      activeIndex !== -1 &&
      categoryRefs.current[activeIndex] &&
      scrollContainerRef.current
    ) {
      const activeElement = categoryRefs.current[activeIndex];
      const scrollContainer = scrollContainerRef.current;
      const containerRect = scrollContainer.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      const relativeTop =
        activeRect.top - containerRect.top + scrollContainer.scrollTop;

      setSliderPosition({
        top: relativeTop,
        height: activeRect.height,
      });
    }
  }, [activeCategory, categories]);

  useEffect(() => {
    updateSliderPosition();
  }, [updateSliderPosition]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateSliderPosition();
    }, 100);

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateSliderPosition);
    }

    return () => {
      clearTimeout(timer);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", updateSliderPosition);
      }
    };
  }, [updateSliderPosition]);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <h2 className="text-2xl font-bold p-5 text-center">{title}</h2>
      <div
        ref={scrollContainerRef}
        className="relative flex-1 overflow-y-auto max-h-[125vh]"
      >
        <div className="relative space-y-4">
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
                onClick={() => onCategoryClick(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div
                    className={cn(
                      "size-24 rounded-lg flex items-center justify-center border border-primary",
                      isActive ? "bg-primary" : "bg-gray-200",
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
                        width={80}
                        height={80}
                        className="object-cover size-20 rounded-full"
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
    </div>
  );
}
