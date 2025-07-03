"use client";

import { useState } from "react";
import { Testimonials } from "@/components/testimonials";
import { VendorHeroSection } from "@/components/VendorHero";
import groceryPoster from "../assets/vendor-grocery-poster.jpg";
import { GroceryProductCard } from "../components/GroceryProductCard";
import {
  type IGroceryProduct,
  ProductEditorDialog,
} from "../components/ProductEditorDialog";
import { VendorGroceryPersonalized } from "../components/VendorGroceryPersonalized";

const mockProducts: IGroceryProduct[] = [
  {
    id: "1",
    category: "Dairy Products",
    name: "Itambe Natural Milk",
    price: "80",
    size: "1L",
    quantity: 2,
    images: [
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "2",
    category: "Vegetables & Fruits",
    name: "Fresh Tomato",
    price: "30",
    size: "1 Kg",
    quantity: 1,
    images: [
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "3",
    category: "Vegetables & Fruits",
    name: "Fresh Carrot",
    price: "40",
    size: "1 Kg",
    quantity: 1,
    images: [
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "4",
    category: "Vegetables & Fruits",
    name: "Sweet Potato",
    price: "20",
    size: "1 Kg",
    quantity: 1,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "5",
    category: "Bakery",
    name: "Whole Wheat Bread",
    price: "50",
    size: "400g",
    quantity: 3,
    images: [
      "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "6",
    category: "Snacks & Beverages",
    name: "Fresh Orange Juice",
    price: "60",
    size: "1L",
    quantity: 2,
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "7",
    category: "Snacks & Beverages",
    name: "Potato Chips",
    price: "25",
    size: "200g",
    quantity: 5,
    images: [
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "8",
    category: "Other",
    name: "Organic Honey",
    price: "120",
    size: "250g",
    quantity: 1,
    images: [
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    ],
  },
];

export default function VendorGroceryProductsPage() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IGroceryProduct>();

  const handleEdit = (product: IGroceryProduct) => {
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
        onAdd={() => setEditorOpen(true)}
        addButtonText="Add Products"
      />
      <ProductEditorDialog
        open={editorOpen}
        onOpenChange={setEditorOpen}
        data={editingProduct}
      />
      <div className="p-8 w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        {mockProducts.map((product) => (
          <GroceryProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <Testimonials />
      <VendorGroceryPersonalized />
    </div>
  );
}
