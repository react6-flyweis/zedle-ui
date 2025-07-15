"use client";

import { HeartIcon, Package, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import shoppingBagIcon from "@/assets/icons/shopping-bag.png";
import { OrderCard } from "@/components/orders/order-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Order } from "@/types/orders";
import ordersImage from "../assets/food-orders.jpg";

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
        name: "Royal Cheese Burger with extra Fries",
        description:
          "Lorem ipsum dolor sit amet consectetur. Metus nibh dictum vel enim sollicitudin.",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80", // Unsplash burger image
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
        name: "Royal Cheese Burger with extra Fries",
        description:
          "Lorem ipsum dolor sit amet consectetur. Metus nibh dictum vel enim sollicitudin.",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80", // Unsplash burger image
        quantity: 1,
      },
    ],
  },
];

export default function OrdersPage() {
  const t = useTranslations("ordersPage");
  return (
    <div className="">
      <section
        className="relative h-[57vh]  flex flex-col md:flex-row items-center justify-between px-8 lg:px-16"
        style={{
          background: `url(${ordersImage.src}) center center / cover no-repeat`,
        }}
      >
        {/* White overlay */}
        <div className="absolute inset-0 bg-white/90  pointer-events-none z-0" />
        <div className="relative flex-1 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="relative">
            <Image
              src={ordersImage}
              alt={t("heroImgAlt")}
              width={400}
              height={300}
              className="object-contain rounded-md"
              priority
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto space-y-4 p-8">
        <div className="bg-white flex items-center justify-between p-3 border border-gray-600 rounded-md">
          <div className="relative flex-1 max-w-xl">
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
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
          <div className="flex justify-center gap-5">
            <Button variant="ghost" size="icon">
              <HeartIcon className="text-primary fill-primary size-7" />
            </Button>
            <Button variant="ghost" size="icon">
              <Image
                src={shoppingBagIcon}
                alt={t("heroBgAlt")}
                width={24}
                height={24}
              />
            </Button>
          </div>
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
                  {t("emptyTitle")}
                </h3>
                <p className="text-gray-600 mb-6">{t("emptyDescription")}</p>
                <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                  {t("startShopping")}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
