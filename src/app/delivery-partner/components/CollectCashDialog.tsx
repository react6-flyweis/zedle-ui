"use client";

import { HandCoins } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CollectCashDialogProps {
  open: boolean;
  onClose: () => void;
  amount?: number;
}

export function CollectCashDialog({
  open,
  onClose,
  amount = 424.0,
}: CollectCashDialogProps) {
  const t = useTranslations("delivery");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl p-0 max-w-md">
        <div className="bg-white rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-2xl font-bold">
              {t("collectCash.title")}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {t("collectCash.description")}
            </p>
          </DialogHeader>
          <div className="border-b my-2" />
          <div className="flex flex-col items-center px-6 py-8 gap-6">
            <span className="text-3xl font-semibold text-primary">
              ${amount.toFixed(2)}
            </span>
            <div className="flex justify-center items-center">
              <HandCoins size={80} strokeWidth={1.5} className="text-primary" />
            </div>
            <Button
              className=" w-full text-lg font-medium rounded-lg h-12 mt-4"
              onClick={onClose}
            >
              {t("collectCash.done")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
