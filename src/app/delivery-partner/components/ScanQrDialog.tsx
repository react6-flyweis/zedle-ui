"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import qrImage from "../assets/qrdialog-qr.png";

interface ScanQrDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ScanQrDialog({ open, onClose }: ScanQrDialogProps) {
  const t = useTranslations("qrDialog");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md items-center rounded-xl p-0">
        <DialogHeader className="shrink border-b pb-2 p-3">
          <DialogTitle className="text-2xl font-bold">
            {t("scanQr")}
          </DialogTitle>
          <p className="text-sm font-medium text-black mt-2 mb-2">
            {t("scanQrDescription")}
          </p>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center w-full py-8 p-5">
          {/* QR Code mockup */}
          <div className="relative rounded-lg p-2 size-40 shadow flex flex-col items-center">
            <Image
              src={qrImage}
              alt="QR Code"
              width={180}
              height={180}
              className="w-full h-full object-cover"
            />
            <div className="bottom-5 absolute bg-green-700 h-3 w-full"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
