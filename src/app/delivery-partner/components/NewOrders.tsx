"use client";

import { RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { OrderCard } from "./OrderCard";

const mockOrders = [
  {
    id: "123456789",
    date: "21 Aug 2024, 16:00",
    address: "1901 Thornridge Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Card",
    total: "$25.40",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
  },
  {
    id: "123456789",
    date: "21 Aug 2024, 16:00",
    address: "1901 Thornridge Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Card",
    total: "$25.40",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
  },
  {
    id: "123456789",
    date: "21 Aug 2024, 16:00",
    address: "1901 Thornridge Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Cash",
    total: "$25.40",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
  },
  {
    id: "123456789",
    date: "21 Aug 2024, 16:00",
    address: "1901 Thornridge Cir. Shiloh, Hawaii",
    address2: "2464 Royal Ln. Mesa, New Jersey",
    paymentMethod: "Cash",
    total: "$25.40",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
  },
];

export function NewOrders() {
  const t = useTranslations("section");
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("newOrdersTitle")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("newOrdersSubtitle")}
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          {t("refresh")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {mockOrders.map((order, index) => (
          <OrderCard key={`${order.id}-${index}`} order={order} />
        ))}
      </div>
    </div>
  );
}
