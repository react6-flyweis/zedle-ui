"use client";

import { useState } from "react";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentMethod from "@/components/checkout/payment-method";
import PickupDeliveryAddress from "@/components/checkout/pickup-delivery-address";
import UserInfo from "@/components/checkout/user-info";
import { Button } from "@/components/ui/button";

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

interface AddressInfo {
  id: string;
  type: "home" | "work" | "other";
  address: string;
  city: string;
  state: string;
  zipCode: string;
  estimatedTime: string;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Indian Tomato (Desi Tomato)",
      location: "East New York",
      price: 40.0,
      originalPrice: 65.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
      suggestions: "Any suggestions? We will pass it on...",
    },
  ]);

  const [couponCode] = useState("");
  const [selectedCardId, setSelectedCardId] = useState<string | null>("1"); // Default to first card

  // Address data
  const pickupAddress: AddressInfo = {
    id: "pickup-1",
    type: "home",
    address: "70 Washington Square South",
    city: "New York",
    state: "NY",
    zipCode: "10012",
    estimatedTime: "30 Mins",
  };

  const deliveryAddress: AddressInfo = {
    id: "delivery-1",
    type: "home",
    address: "70 Washington Square South",
    city: "New York",
    state: "NY",
    zipCode: "10012",
    estimatedTime: "30 Mins",
  };

  const [selectedPickupId, setSelectedPickupId] = useState<string | null>(
    pickupAddress.id,
  );
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(
    deliveryAddress.id,
  );

  const updateQuantity = (id: string, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item,
      ),
    );
  };

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 5.0;
  const extraDiscount = -5.0;
  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0,
  );
  const totalAmount = itemTotal + deliveryFee + extraDiscount;

  const applyCoupon = () => {
    if (couponCode.trim()) {
      // Add coupon logic here
      console.log("Applying coupon:", couponCode);
    }
  };

  const handleCardSelect = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const handlePickupSelect = () => {
    setSelectedPickupId(pickupAddress.id);
  };

  const handleDeliverySelect = () => {
    setSelectedDeliveryId(deliveryAddress.id);
  };

  const handlePayNow = () => {
    // Add payment processing logic here
    console.log("Processing payment with card:", selectedCardId);
    // You can add navigation to payment processing page or show success message
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto p-4">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info, Address, Payment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex">
            <div className="w-4">
              <div className="h-full border-l-2 border-dashed border-gray-500"></div>
            </div>
            <div className="space-y-6">
              <UserInfo name="Randy Lipshutz" phone="+1 778 4521 369" />
              <PickupDeliveryAddress
                pickupAddress={pickupAddress}
                deliveryAddress={deliveryAddress}
                onPickupSelect={handlePickupSelect}
                onDeliverySelect={handleDeliverySelect}
                selectedPickupId={selectedPickupId || undefined}
                selectedDeliveryId={selectedDeliveryId || undefined}
              />
              <PaymentMethod
                isAddressSelected={!!(selectedPickupId && selectedDeliveryId)}
                onCardSelect={handleCardSelect}
              />
            </div>
          </div>
          {/* Pay Now Button */}
          {selectedCardId && selectedPickupId && selectedDeliveryId && (
            <Button
              onClick={handlePayNow}
              size="lg"
              className="w-full rounded-full h-12"
            >
              Pay Now
            </Button>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <OrderSummary
            category={{
              id: "fruits",
              image:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // Unsplash image URL
              title: "Omar",
              description: "Kolkata to Dumdum",
            }}
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
