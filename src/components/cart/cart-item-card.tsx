"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  location: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  suggestions?: string;
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, change: number) => void;
}

export default function CartItemCard({
  item,
  onUpdateQuantity,
}: CartItemCardProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1 flex gap-1">
          <h4 className="font-medium text-gray-900">{item.name}</h4>
          <div className="flex items-center border border-primary">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(item.id, -1)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-3 py-1 text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(item.id, 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-right">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
              <span className="font-semibold text-gray-900">
                ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {item.suggestions && (
        <div className="bg-gray-50 p-2">
          <p className="text-sm text-gray-600 italic">{item.suggestions}</p>
        </div>
      )}
    </div>
  );
}
