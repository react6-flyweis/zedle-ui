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
import qrImage from "../assets/payment-qr.png";

interface QrPaymentDialogProps {
  open: boolean;
  onClose: () => void;
}

export function QrPaymentDialog({ open, onClose }: QrPaymentDialogProps) {
  const t = useTranslations("receivePayment");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl p-0 max-w-md">
        <div>
          <DialogHeader className="px-4 pt-4 pb-2">
            <DialogTitle className="text-2xl font-bold">
              {t("qrTitle")}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t("qrDescription")}
            </p>
          </DialogHeader>
          <div className="border-b my-2" />
          <div className="flex flex-col items-center p-6 gap-6">
            <Image src={qrImage} alt="QR Code" width={150} height={150} />
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
