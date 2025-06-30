"use client";

import { RotateCcwIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Order } from "@/types/orders";
import { CancelOrderDialog } from "./cancel-order-dialog";
import { RateOrderDialog } from "./rate-order-dialog";
import { TrackPackageDialog } from "./track-package-dialog";

export function OrderCard({ order }: { order: Order }) {
  return (
    <Card className="border border-gray-600 rounded-xl shadow-sm p-0 gap-0">
      <CardHeader className="p-5 pb-3 border-b  border-gray-600">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground uppercase font-medium">
                ORDER PLACED
              </p>
              <p className="font-medium text-muted-foreground">
                {order.orderDate}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground uppercase font-medium">
                TOTAL
              </p>
              <p className="font-medium text-muted-foreground">{order.total}</p>
            </div>
            <div>
              <p className="text-muted-foreground uppercase font-medium">
                SHIP TO
              </p>
              <p className="font-medium text-foreground">{order.shipTo}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">ORDER # {order.id}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">
                Delivered {order.deliveryTime}
              </span>
            </div>
            <p className="text-muted-foreground">
              Package was handed to resident
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <TrackPackageDialog orderId={order.id}>
              <Button className="px-6 py-2 rounded-full text-sm min-w-[140px]">
                Track package
              </Button>
            </TrackPackageDialog>
            <RateOrderDialog orderId={order.id}>
              <Button
                variant="outline"
                className="px-6 py-2 rounded-full min-w-[140px]"
              >
                Write a product review
              </Button>
            </RateOrderDialog>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="rounded-full">
                    <RotateCcwIcon className="w-4 h-4 mr-2" />
                    Order it again
                  </Button>
                  <Button size="sm" className="rounded-full">
                    View your item
                  </Button>
                  <CancelOrderDialog orderId={order.id}>
                    <Button size="sm" className="rounded-full">
                      Cancel your order
                    </Button>
                  </CancelOrderDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
