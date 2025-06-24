"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BillDetails from "./bill-details";
import CartItemCard from "./cart-item-card";
import CouponSection from "./coupon-section";

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
  category: {
    id: string;
    image: string;
    title: string;
    description: string;
  };
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
  category,
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
          src={category.image}
          alt={category.title}
          width={60}
          height={60}
          className="size-13 rounded object-cover"
        />
        <div className="flex flex-col gap-1">
          <CardTitle>{category.title}</CardTitle>
          <p className="text-sm text-gray-600 border-b-2 border-primary pb-1 w-fit">
            {category.description}
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
