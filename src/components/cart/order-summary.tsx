"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import CartItemCard from "./cart-item-card";
import CouponSection from "./coupon-section";
import BillDetails from "./bill-details";

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

interface OrderSummaryProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, change: number) => void;
  onApplyCoupon: () => void;
  itemTotal: number;
  deliveryFee: number;
  extraDiscount: number;
  totalAmount: number;
  savings: number;
}

export default function OrderSummary({
  cartItems,
  onUpdateQuantity,
  onApplyCoupon,
  itemTotal,
  deliveryFee,
  extraDiscount,
  totalAmount,
  savings,
}: OrderSummaryProps) {
  return (
    <Card className="rounded-none shadow-none">
      <CardHeader className="flex">
        <Image
          src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
          alt="Fresh Vegetables"
          width={60}
          height={60}
          className="size-13 rounded object-cover"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>Fresh Vegetables</CardTitle>
          <p className="text-sm text-gray-600 border-b-2 border-primary pb-1 w-fit">
            East New York
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}

        <CouponSection onApplyCoupon={onApplyCoupon} />

        <BillDetails
          itemTotal={itemTotal}
          deliveryFee={deliveryFee}
          extraDiscount={extraDiscount}
          totalAmount={totalAmount}
          savings={savings}
        />
      </CardContent>
    </Card>
  );
}
