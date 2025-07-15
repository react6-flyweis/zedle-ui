"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import cashIcon from "../assets/cash.gif";

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
  const t = useTranslations("collectCashDialog");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl p-0 max-w-md">
        <div className="">
          <DialogHeader className="px-4 pt-4 pb-2">
            <DialogTitle className="text-2xl font-bold">
              {t("title")}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t("description")}
            </p>
          </DialogHeader>
          <div className="border-b my-2" />
          <div className="flex flex-col items-center p-6 gap-6">
            <span className="text-3xl font-semibold text-primary">
              ${amount.toFixed(2)}
            </span>
            <Image
              src={cashIcon}
              alt="Cash Icon"
              width={150}
              height={150}
              className=""
            />
            <Button
              className=" w-full text-lg font-medium rounded-lg h-12 mt-4"
              onClick={onClose}
            >
              {t("done")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
