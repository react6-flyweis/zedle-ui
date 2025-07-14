"use client";

import { CreditCard, HandCoins, QrCode } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CollectCashDialog } from "./CollectCashDialog";

interface ReceivePaymentDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ReceivePaymentDialog({
  open,
  onClose,
}: ReceivePaymentDialogProps) {
  const t = useTranslations("receivePayment");
  const [showCollectCash, setShowCollectCash] = useState(false);

  const handleCashClick = () => {
    setShowCollectCash(true);
  };

  const handleCollectCashClose = () => {
    setShowCollectCash(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open && !showCollectCash} onOpenChange={onClose}>
        <DialogContent className="rounded-2xl p-0 max-w-md">
          <div className="bg-white rounded-2xl">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="text-2xl font-bold">
                {t("title")}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {t("description")}
              </p>
            </DialogHeader>
            <div className="border-b my-2" />
            <div className="flex flex-col gap-5 px-6 py-6">
              <Button
                variant="default"
                className="bg-[#3C0028] hover:bg-[#3C0028]/90 text-white flex items-center justify-center gap-2 text-lg font-medium rounded-lg h-12"
                onClick={onClose}
              >
                <QrCode size={24} />
                {t("qr")}
              </Button>
              <Button
                variant="default"
                className="bg-[#D8B13B] hover:bg-[#D8B13B]/90 text-white flex items-center justify-center gap-2 text-lg font-medium rounded-lg h-12"
                onClick={onClose}
              >
                <CreditCard size={24} />
                {t("card")}
              </Button>
              <Button
                variant="default"
                className="bg-[#8B0056] hover:bg-[#8B0056]/90 text-white flex items-center justify-center gap-2 text-lg font-medium rounded-lg h-12"
                onClick={handleCashClick}
              >
                <HandCoins size={24} />
                {t("cash")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CollectCashDialog
        open={showCollectCash}
        onClose={handleCollectCashClose}
      />
    </>
  );
}
