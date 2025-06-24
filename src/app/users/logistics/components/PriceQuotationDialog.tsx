"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  price: number;
  rating: number;
  isAccepted?: boolean;
}

interface PriceQuotationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "Omar",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Meron",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Livia",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.2,
  },
  {
    id: "4",
    name: "Allison",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.7,
  },
  {
    id: "5",
    name: "Cooper",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.3,
  },
  {
    id: "6",
    name: "Craig",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.6,
  },
  {
    id: "7",
    name: "Cienna",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.4,
  },
  {
    id: "8",
    name: "Corey",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.1,
  },
  {
    id: "9",
    name: "Kianna",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.9,
  },
  {
    id: "10",
    name: "Giana",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.0,
  },
  {
    id: "11",
    name: "Martin",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.5,
  },
  {
    id: "12",
    name: "Desirae",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.3,
  },
  {
    id: "13",
    name: "Ann",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.6,
  },
  {
    id: "14",
    name: "Zaire",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.2,
  },
  {
    id: "15",
    name: "Ann",
    avatar: "/api/placeholder/40/40",
    price: 458,
    rating: 4.7,
  },
];

export function PriceQuotationsDialog({
  open,
  onOpenChange,
}: PriceQuotationsDialogProps) {
  const [sortBy, setSortBy] = useState<string>("relevance");

  const sortedProviders = [...mockProviders].sort((a, b) => {
    switch (sortBy) {
      case "closest":
        return Math.random() - 0.5; // Random for demo
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] p-0 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 bg-primary text-white p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-6">Sort by</h3>
          <div className="space-y-4">
            <RadioGroup
              value={sortBy}
              onValueChange={setSortBy}
              className="space-y-2"
            >
              {[
                { value: "relevance", label: "Relevance (Default)" },
                { value: "closest", label: "Closest First" },
                { value: "rating", label: "Rating" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="ring-white data-[state=checked]:bg-white data-[state=checked]:text-primary border-white"
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold">
              All Price Quotations
            </DialogTitle>
          </DialogHeader>

          {/* Providers Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-primary text-white p-2 rounded-lg flex flex-col items-center space-y-3"
                >
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={provider.avatar} alt={provider.name} />
                    <AvatarFallback className="bg-purple-300 text-purple-900">
                      {provider.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-center">
                    <p className="font-medium">Name: {provider.name}</p>
                    <p className="text-sm">Price quote: ${provider.price}</p>
                  </div>

                  <Button className="w-full h-8 text-sm bg-green-600 hover:bg-green-700 disabled:bg-green-800">
                    Accept
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
