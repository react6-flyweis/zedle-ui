"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/store/toastStore";
import captureIcon from "../assets/capture-button.png";
import captureDialogBg from "../assets/capture-dialog-bg.jpg";
import captureFocus from "../assets/capture-focus.png";
import scanIcon from "../assets/scan-button.png";

interface CaptureImageDialogProps {
  open: boolean;
  onClose: () => void;
  onCapture: () => void;
}

export const CaptureImageDialog = ({
  open,
  onClose,
  onCapture,
}: CaptureImageDialogProps) => {
  const [scanMode, setScanMode] = useState(false);
  const t = useTranslations("captureDialog");

  const handleCaptureClick = () => {
    setScanMode(true);
  };

  const handleScanClick = () => {
    setScanMode(false);
    toast("Your parcel has been dispatched from the location.");
    onCapture();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl p-6 flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t("itemImage")}
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{t("clickItemImage")}</p>
        <div className="w-full h-40 aspect-video bg-gray-100 rounded-lg flex items-center justify-center relative">
          <Image
            src={captureDialogBg}
            alt="Item box"
            fill
            className="object-cover rounded-lg opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={captureFocus}
              alt="Capture focus"
              className="size-24 object-cover rounded-lg opacity-50"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            className="flex flex-col items-center rounded-full size-12"
            onClick={scanMode ? handleScanClick : handleCaptureClick}
          >
            <Image
              src={scanMode ? scanIcon : captureIcon}
              alt="Capture"
              height={50}
              width={50}
              className="max-h-12 max-w-12"
            />
          </Button>
          <span>{scanMode ? t("scanQRCode") : t("captureImage")}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
