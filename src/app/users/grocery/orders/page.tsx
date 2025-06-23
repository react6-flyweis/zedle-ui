"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, SearchIcon } from "lucide-react";
import { OrderCard } from "@/components/orders/order-card";
import type { Order } from "@/types/orders";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import shoppingBagIcon from "@/assets/icons/shopping-bag.png";
import ordersImage from "../assets/orders.jpg";

// Mock data for orders
const orders: Order[] = [
  {
    id: "408-35522145-1252163",
    orderDate: "30 May 2025",
    deliveryDate: "30 May 2025",
    total: "$100.00",
    shipTo: "Randy Lipshutz",
    status: "delivered",
    deliveryTime: "Under 30 Mins",
    items: [
      {
        id: 1,
        name: "Indian Tomato (Desi Tomato)",
        description:
          "Lorem ipsum dolor sit amet consectetur. Metus nibh dictum vel enim sollicitudin.",
        image: "/src/assets/images/tomato.jpg", // You'll need to add this image
        quantity: 1,
      },
    ],
  },
  {
    id: "408-35522145-1252163",
    orderDate: "28 May 2025",
    deliveryDate: "28 May 2025",
    total: "$100.00",
    shipTo: "Randy Lipshutz",
    status: "delivered",
    deliveryTime: "28 May",
    items: [
      {
        id: 1,
        name: "Indian Tomato (Desi Tomato)",
        description:
          "Lorem ipsum dolor sit amet consectetur. Metus nibh dictum vel enim sollicitudin.",
        image: "/src/assets/images/tomato.jpg",
        quantity: 1,
      },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="">
      <section className="h-[57vh] bg-gray-50 flex items-center justify-between px-8 lg:px-16">
        <div className="flex-1 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Your Order
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Your food is being prepared – sit back and relax, it's on the way!
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="relative">
            <Image
              src={ordersImage}
              alt="Person with shopping basket"
              width={400}
              height={300}
              className="object-contain rounded-md"
              priority
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto space-y-4 p-4 max-w-5xl">
        <div className="bg-white flex items-center justify-between p-3 border border-gray-600 rounded-md">
          <div className="relative flex-1 max-w-xl">
            <Input
              type="text"
              placeholder="Search for groceries..."
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              // onKeyPress={(e) => {
              //   if (e.key === "Enter") {
              //     handleSearch(searchQuery);
              //   }
              // }}
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

        <div className="space-y-6">
          {orders.map((order, index) => (
            <OrderCard key={`${order.id}-${index}`} order={order} />
          ))}
        </div>

        <div className="">
          {/* Empty state for when no orders exist */}
          {orders.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-600 mb-6">
                  When you place your first order, it will appear here.
                </p>
                <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
