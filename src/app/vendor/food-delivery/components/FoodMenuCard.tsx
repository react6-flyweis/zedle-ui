import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { IFoodMenu } from "./FoodEditorDialog";

interface FoodMenuCardProps {
  product: IFoodMenu;
  onEdit?: (product: IFoodMenu) => void;
}

export function FoodMenuCard({ product, onEdit }: FoodMenuCardProps) {
  const t = useTranslations("order");
  return (
    <Card className="gap-0 p-0 overflow-hidden bg-card border border-border shadow-md rounded-2xl">
      <CardContent className="flex gap-4 p-4 pb-2 items-start">
        <div className="size-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <Image
            src={product?.images?.[0] ?? "/placeholder.png"}
            alt={product.name}
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="font-semibold text-lg text-foreground">
            {product.name}
          </div>
          <div className="font-bold text-xl text-primary">${product.price}</div>
          <div className="text-sm text-muted-foreground">{product.size}</div>
          <div className="mt-1 text-sm text-foreground">
            {t("quantity")}:{" "}
            <span className="font-semibold">{product.quantity}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-0 p-0 h-12">
        <Button
          variant="ghost"
          className="flex-1 h-full rounded-none rounded-bl-2xl bg-amber-600 text-white hover:bg-amber-700 transition-colors text-base font-semibold"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          {t("removeFromList")}
        </Button>
        <Button
          variant="ghost"
          className="flex-1 h-full rounded-none rounded-br-2xl bg-green-600 text-white hover:bg-green-700 transition-colors text-base font-semibold"
          onClick={() => onEdit?.(product)}
        >
          <Pencil className="w-5 h-5 mr-2" />
          {t("edit")}
        </Button>
      </CardFooter>
    </Card>
  );
}
