"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import orderCompletedIcon from "@/assets/icons/order-completed.png";
import orderPendingIcon from "@/assets/icons/order-pending.png";
import orderRunningIcon from "@/assets/icons/order-running.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import carRentalPoster from "../assets/vendor-car-rental-poster.jpg";
import {
  CarRentalRequest,
  type IOrder,
  type OrderStatus,
} from "../components/CarRentalRequest";

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

const statusTabs = [
  {
    key: "pending",
    label: "tabs.pendingOrders",
    icon: orderPendingIcon,
    title: "Showing Pending Requests for you.",
    subtitle:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.",
  },
  {
    key: "running",
    label: "tabs.runningOrders",
    icon: orderRunningIcon,
    title: "Showing Ongoing Requests for you.",
    subtitle:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.",
  },
  {
    key: "completed",
    label: "tabs.completedOrders",
    icon: orderCompletedIcon,
    title: "Showing Completed Requests by you.",
    subtitle:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.",
  },
];

export default function OrdersPage() {
  const t = useTranslations("carRentalOrders");
  const [tab, setTab] = useState<OrderStatus>("running");

  // Memoize orders and tabs
  const orders = useMemo(() => mockOrders, []);
  const tabs = useMemo(() => statusTabs, []);
  const currentTab = useMemo(
    () => tabs.find((item) => item.key === tab),
    [tab, tabs],
  );

  return (
    <div>
      <div className="relative py-20 flex flex-col w-full">
        <div className="absolute inset-0 -z-10">
          <Image
            src={carRentalPoster}
            alt={t("ongoingOrdersTitle")}
            fill
            className="object-cover w-full h-full brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="max-w-xl mx-auto mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {currentTab?.title}
          </h1>
          <p className="text-white/80 text-base md:text-lg mb-6">
            {currentTab?.subtitle}
          </p>
        </div>
      </div>
      <div className="-mt-28 mb-16 relative">
        <div className="w-full max-w-6xl mx-auto mt-6">
          <Tabs
            value={tab}
            onValueChange={(value: string) => setTab(value as OrderStatus)}
            className="w-full"
          >
            <TabsList className="z-10 w-full flex justify-center bg-transparent rounded-lg mb-16 gap-5">
              {tabs.map((tabItem) => (
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
            {tabs.map((tabItem) => (
              <TabsContent
                key={tabItem.key}
                value={tabItem.key}
                className="w-full max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                  {orders
                    .filter((order) => order.status === tabItem.key)
                    .map((order) => (
                      <CarRentalRequest key={order.id} order={order} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
