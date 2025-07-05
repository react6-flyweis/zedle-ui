"use client";

import { useState } from "react";
import { Testimonials } from "@/components/testimonials";
import { VendorHeroSection } from "@/components/VendorHero";

import groceryPoster from "../assets/vendor-food-delivery-poster.jpg";
import {
  FoodMenuEditorDialog,
  type IFoodMenu,
} from "../components/FoodEditorDialog";
import { FoodMenuCard } from "../components/FoodMenuCard";
import { VendorFoodPersonalized } from "../components/VendorFoodPersonalized";

const mockProducts: IFoodMenu[] = [
  {
    id: "1",
    category: "Pizza",
    name: "Pizza Calzone European",
    price: "164",
    size: '14"',
    quantity: 2,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "2",
    category: "Pizza",
    name: "Margherita Pizza",
    price: "147",
    size: '16"',
    quantity: 1,
    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "3",
    category: "Burger",
    name: "Mexican Burger",
    price: "40",
    size: "Medium",
    quantity: 1,
    images: [
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "4",
    category: "Pizza",
    name: "Pizza Calzone European",
    price: "164",
    size: '14"',
    quantity: 2,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "5",
    category: "Pizza",
    name: "Margherita Pizza",
    price: "147",
    size: '16"',
    quantity: 1,
    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "6",
    category: "Pizza",
    name: "Pizza Calzone European",
    price: "164",
    size: '14"',
    quantity: 2,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "7",
    category: "Pizza",
    name: "Margherita Pizza",
    price: "147",
    size: '16"',
    quantity: 1,
    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "8",
    category: "Pizza",
    name: "Pizza Calzone European",
    price: "164",
    size: '14"',
    quantity: 2,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    ],
  },
];

const sortOptions = ["pizza", "burger", "biryani", "chicken", "roll"];

export default function VendorFoodMenuPage() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IFoodMenu>();

  const handleEdit = (product: IFoodMenu) => {
    setEditingProduct(product);
    setEditorOpen(true);
  };

  return (
    <div className="w-full">
      <VendorHeroSection
        poster={groceryPoster}
        title="Showing Your Current Shop Products."
        subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr,\n      sed diam nonumy Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
        onSearch={(query) => console.log("Search query:", query)}
        onSort={() => console.log("Sort options clicked")}
        sortOptions={sortOptions}
        onAdd={() => setEditorOpen(true)}
        addButtonText="Add Menu"
      />
      <FoodMenuEditorDialog
        open={editorOpen}
        onOpenChange={setEditorOpen}
        data={editingProduct}
      />
      <div className="p-8 w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        {mockProducts.map((product) => (
          <FoodMenuCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <Testimonials />
      <VendorFoodPersonalized />
    </div>
  );
}
