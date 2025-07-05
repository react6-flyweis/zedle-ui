"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface IGroceryOrder {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

export function GroceryOrderCard({
  order: { imageUrl, name, price, unit, quantity },
}: {
  order: IGroceryOrder;
}) {
  const t = useTranslations("order");
  return (
    <Card className="gap-0 p-0 overflow-hidden">
      <CardContent className="flex gap-4 p-4 pb-2 items-start">
        <div className="size-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="font-semibold text-lg text-foreground">{name}</div>
          <div className="font-bold text-xl text-primary">${price}</div>
          <div className="text-sm text-muted-foreground">{unit}</div>
          <div className="text-sm mt-1">
            {t("quantity")}: <span className="font-semibold">{quantity}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-0 p-0 h-11">
        <ConfirmDialog
          onConfirm={() => {
            // Handle order rejection logic here
          }}
          title={t("rejectConfirmTitle")}
        >
          <Button className="flex-1 h-full rounded-none bg-amber-600 hover:bg-destructive/90">
            {t("reject")}
          </Button>
        </ConfirmDialog>
        <Button className="flex-1 h-full rounded-none bg-green-600 hover:bg-green-700">
          {t("accept")}
        </Button>
      </CardFooter>
    </Card>
  );
}
