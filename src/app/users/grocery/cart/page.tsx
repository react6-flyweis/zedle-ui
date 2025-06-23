"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserInfo from "@/components/cart/user-info";
import DeliveryAddress from "@/components/cart/delivery-address";
import OrderSummary from "@/components/cart/order-summary";

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

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Indian Tomato (Desi Tomato)",
      location: "East New York",
      price: 40.0,
      originalPrice: 65.0,
      quantity: 1,
      image: "/assets/products/tomato.jpg",
      suggestions: "Any suggestions? We will pass it on...",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    "1",
  );

  const updateQuantity = (id: string, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 5.0;
  const extraDiscount = -5.0;
  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const totalAmount = itemTotal + deliveryFee + extraDiscount;

  const applyCoupon = () => {
    if (couponCode.trim()) {
      // Add coupon logic here
      console.log("Applying coupon:", couponCode);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info, Address, Payment */}
        <div className="lg:col-span-2 space-y-6 pl-14">
          <UserInfo name="Randy Lipshutz" phone="+1 778 4521 369" />
          <DeliveryAddress
            onAddressSelect={setSelectedAddressId}
            selectedAddressId={selectedAddressId}
          />
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <OrderSummary
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onApplyCoupon={applyCoupon}
            itemTotal={itemTotal}
            deliveryFee={deliveryFee}
            extraDiscount={extraDiscount}
            totalAmount={totalAmount}
            savings={savings}
          />
        </div>
      </div>
    </div>
  );
}
