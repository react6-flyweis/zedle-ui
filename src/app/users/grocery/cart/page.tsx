"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, User, CreditCard, Plus, Minus, Tag } from "lucide-react";
import Image from "next/image";

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

  const [couponCode, setCouponCode] = useState("");

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
        <div className="lg:col-span-2 space-y-6">
          {/* User Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 bg-black">
                  <AvatarFallback className="bg-black text-white">
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">Logged in</h3>
                  <p className="text-gray-600">
                    Randy Lipshutz | +1 778 4521 369
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Add a delivery address
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You seem to be in the new location
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-gray-700">Add New Address</span>
                  </div>

                  <Button
                    variant="outline"
                    className="text-teal-600 border-teal-600 hover:bg-teal-50"
                  >
                    ADD NEW
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Payment</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image
                  src="/assets/icons/grocery.png"
                  alt="Fresh Vegetables"
                  width={24}
                  height={24}
                />
                <span>Fresh Vegetables</span>
              </CardTitle>
              <p className="text-sm text-gray-600">East New York</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="space-y-3">
                  <div className="flex gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, -1)}
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
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
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
                  </div>

                  {item.suggestions && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 italic">
                        {item.suggestions}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Apply Coupon */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg">
                  <Tag className="w-5 h-5 text-gray-500" />
                  <Input
                    placeholder="Apply Coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="border-0 bg-transparent p-0 focus-visible:ring-0"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={applyCoupon}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bill Details */}
          <Card>
            <CardHeader>
              <CardTitle>Bill Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Item Total</span>
                <span className="font-medium">${itemTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee | 2.8 kms</span>
                <span className="font-medium">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Extra discount for you</span>
                <span className="font-medium text-green-600">
                  ${extraDiscount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Tip</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 p-0 h-auto"
                >
                  Add tip
                </Button>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>TO PAY</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {savings > 0 && (
                <div className="bg-teal-50 p-3 rounded-lg mt-4">
                  <p className="text-center text-teal-700 font-medium">
                    Savings of ${savings.toFixed(2)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
