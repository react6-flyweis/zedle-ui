"use client";

import React, { useState } from "react";
import { SearchIcon, StarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import shoppingBagIcon from "@/assets/icons/shopping-bag.png";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const recentKeywords = [
  "Fresh Vegetables",
  "Fresh Fruits",
  "Leafy Seasonings",
  "Exotics Fruits",
  "Certified Organics",
  "Cookies",
  "Eggs",
  "Milk",
  "Bread",
  "Rice",
  "Pasta",
  "Chicken",
];

const suggestedCategories = [
  {
    id: 1,
    name: "Vegetables & Fruits",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=150&fit=crop&crop=center",
    description: "Fresh organic produce",
  },
  {
    id: 2,
    name: "Dairy products",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=150&fit=crop&crop=center",
    description: "Farm fresh dairy items",
  },
  {
    id: 3,
    name: "Home care",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=150&fit=crop&crop=center",
    description: "Essential home products",
  },
];

export default function GrocerySearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentKeywordsList, setRecentKeywordsList] = useState(recentKeywords);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Add to recent searches if not already present
      if (!recentKeywordsList.includes(query)) {
        setRecentKeywordsList([query, ...recentKeywordsList.slice(0, 11)]);
      }
      // Handle search logic here
      console.log("Searching for:", query);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    handleSearch(keyword);
  };

  const clearAllRecent = () => {
    setRecentKeywordsList([]);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Search Header */}
      <div className="bg-white flex items-center justify-between p-4 rounded-md">
        <div className="relative flex-1 max-w-xl">
          <Input
            type="text"
            placeholder="Search for groceries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchQuery);
              }
            }}
            className="pl-5 h-10"
          />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <Button variant="ghost" size="icon">
          <Image
            src={shoppingBagIcon}
            alt="Shopping Bag"
            width={24}
            height={24}
          />
        </Button>
      </div>

      <div className="py-6">
        {/* Recent Keywords */}
        {recentKeywordsList.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Keywords
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllRecent}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear All
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-2 pb-2">
                {recentKeywordsList.map((keyword, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleKeywordClick(keyword)}
                    className="rounded-full bg-black hover:bg-gray-700 hover:text-white text-white flex-shrink-0"
                  >
                    {keyword}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}

        {/* Suggested Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Suggested Categories
          </h2>
          <div className="space-y-10">
            {suggestedCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleKeywordClick(category.name)}
              >
                <div className="flex items-center">
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={200}
                      height={150}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <StarIcon className="size-4" />
                      <span className="text-sm font-medium text-gray-700">
                        {category.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
