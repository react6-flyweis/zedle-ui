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
import cardMachine from "../assets/card-payment.gif";

interface CardPaymentDialogProps {
  open: boolean;
  onClose: () => void;
  amount?: number;
}

export function CardPaymentDialog({
  open,
  onClose,
  amount = 424.0,
}: CardPaymentDialogProps) {
  const t = useTranslations("receivePayment");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl p-0 max-w-md">
        <div>
          <DialogHeader className="px-4 pt-4 pb-2">
            <DialogTitle className="text-2xl font-bold">
              {t("cardTitle")}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t("cardDescription")}
            </p>
          </DialogHeader>
          <div className="border-b my-2" />
          <div className="flex flex-col items-center p-6 gap-6">
            <span className="text-3xl font-semibold text-primary">
              ${amount.toFixed(2)}
            </span>
            <div className="flex gap-4 items-center">
              <Image
                src={cardMachine}
                alt="Card Machine"
                width={120}
                height={80}
              />
            </div>
            <Button
              className="w-full text-lg font-medium rounded-lg h-12 mt-4 bg-[#8B0056] hover:bg-[#8B0056]/90"
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
