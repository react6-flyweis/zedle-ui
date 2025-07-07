"use client";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import orderCompletedIcon from "@/assets/icons/order-completed.png";
import orderPendingIcon from "@/assets/icons/order-pending.png";
import orderRunningIcon from "@/assets/icons/order-running.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type IOrder, OrderCard, type OrderStatus } from "./OrderCard";

const mockOrders: IOrder[] = [
  // PendingOrder
  {
    id: "#2584",
    date: "2024-09-19T17:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Cash",
    itemsDimensions: "30x20x10 cm",
    shipmentStatus: "Awaiting Pickup",
    customerName: "John Doe",
    customerPhone: "+1 555-1234",
    status: "pending",
  },
  // RunningOrder
  {
    id: "#2585",
    date: "2024-09-19T17:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    vehicleType: "Bike",
    orderNo: "ORD-2585",
    status: "running",
  },
  // CompletedOrder
  {
    id: "#2586",
    date: "2024-09-19T17:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Cash",
    total: "$120.00",
    itemsDimensions: "30x20x10 cm",
    shipmentStatus: "Delivered",
    customerName: "Jane Smith",
    customerPhone: "+1 555-5678",
    rating: 4.8,
    status: "completed",
  },
  // RunningOrder
  {
    id: "#2587",
    date: "2024-09-19T17:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    vehicleType: "Car",
    orderNo: "ORD-2587",
    status: "running",
  },
  // PendingOrder
  {
    id: "#2588",
    date: "2024-08-21T17:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Cash",
    itemsDimensions: "25x15x8 cm",
    shipmentStatus: "Awaiting Pickup",
    customerName: "Alice Brown",
    customerPhone: "+1 555-8765",
    status: "pending",
  },
  // RunningOrder
  {
    id: "#2589",
    date: "2024-08-21T17:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    vehicleType: "Van",
    orderNo: "ORD-2589",
    status: "running",
  },
  // CompletedOrder
  {
    id: "#2590",
    date: "2024-08-21T17:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Cash",
    total: "$100.00",
    itemsDimensions: "25x15x8 cm",
    shipmentStatus: "Delivered",
    customerName: "Bob Lee",
    customerPhone: "+1 555-4321",
    rating: 5,
    status: "completed",
  },
  // RunningOrder
  {
    id: "#2591",
    date: "2024-08-21T17:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    vehicleType: "Bike",
    orderNo: "ORD-2591",
    status: "running",
  },
  // PendingOrder
  {
    id: "#2592",
    date: "2024-08-22T18:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Cash",
    itemsDimensions: "20x10x5 cm",
    shipmentStatus: "Awaiting Pickup",
    customerName: "Chris Green",
    customerPhone: "+1 555-2468",
    status: "pending",
  },
  // RunningOrder
  {
    id: "#2593",
    date: "2024-08-22T18:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    vehicleType: "Car",
    orderNo: "ORD-2593",
    status: "running",
  },
  // CompletedOrder
  {
    id: "#2594",
    date: "2024-08-22T18:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Cash",
    total: "$90.00",
    itemsDimensions: "20x10x5 cm",
    shipmentStatus: "Delivered",
    customerName: "Diana Prince",
    customerPhone: "+1 555-1357",
    rating: 4.5,
    status: "completed",
  },
  // RunningOrder
  {
    id: "#2595",
    date: "2024-08-22T18:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    vehicleType: "Van",
    orderNo: "ORD-2595",
    status: "running",
  },
  // PendingOrder
  {
    id: "#2596",
    date: "2024-08-23T19:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Cash",
    itemsDimensions: "15x10x5 cm",
    shipmentStatus: "Awaiting Pickup",
    customerName: "Eve Black",
    customerPhone: "+1 555-9753",
    status: "pending",
  },
  // RunningOrder
  {
    id: "#2597",
    date: "2024-08-23T19:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    vehicleType: "Bike",
    orderNo: "ORD-2597",
    status: "running",
  },
  // CompletedOrder
  {
    id: "#2598",
    date: "2024-08-23T19:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Cash",
    total: "$80.00",
    itemsDimensions: "15x10x5 cm",
    shipmentStatus: "Delivered",
    customerName: "Frank White",
    customerPhone: "+1 555-8642",
    rating: 4.9,
    status: "completed",
  },
  // RunningOrder
  {
    id: "#2599",
    date: "2024-08-23T19:00:00Z",
    address: "1901 Thorndrige Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    vehicleType: "Car",
    orderNo: "ORD-2599",
    status: "running",
  },
];

const statusTabs: {
  key: OrderStatus;
  label: string;
  icon?: StaticImageData;
}[] = [
  { key: "pending", label: "tabs.pendingOrders", icon: orderPendingIcon },
  { key: "running", label: "tabs.runningOrders", icon: orderRunningIcon },
  { key: "completed", label: "tabs.completedOrders", icon: orderCompletedIcon },
];

export default function OrdersTabs() {
  const t = useTranslations("orders");
  const [tab, setTab] = useState<OrderStatus>("running");

  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
      <Tabs
        value={tab}
        onValueChange={(value: string) => setTab(value as OrderStatus)}
        className="w-full"
      >
        <TabsList className="z-10 w-full flex justify-center bg-transparent rounded-lg mb-16 gap-5">
          {statusTabs.map((tabItem) => (
            <TabsTrigger
              key={tabItem.key}
              value={tabItem.key}
              className="flex-1 bg-white data-[state=active]:bg-primary data-[state=active]:text-white text-base font-semibold px-6 py-3 rounded-lg transition-colors h-14 data-[state=active]:[&>img]:brightness-0 data-[state=active]:[&>img]:invert"
            >
              <Image
                src={tabItem.icon || ""}
                alt={t(tabItem.label)}
                width={20}
                height={20}
                className="inline-block mr-2 max-h-8 max-w-8"
              />
              {t(tabItem.label)}
            </TabsTrigger>
          ))}
        </TabsList>
        {statusTabs.map((tabItem) => (
          <TabsContent
            key={tabItem.key}
            value={tabItem.key}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {mockOrders
                .filter((order) => order.status === tabItem.key)
                .map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
