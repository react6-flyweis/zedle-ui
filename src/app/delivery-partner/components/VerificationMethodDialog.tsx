"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScanQrDialog } from "./ScanQrDialog";
import { VerifyOtpDialog } from "./VerifyOtpDialog";

interface VerificationMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (otp: string) => void;
}

export function VerificationMethodDialog({
  open,
  onOpenChange,
  onVerify,
}: VerificationMethodDialogProps) {
  const t = useTranslations("verificationMethod");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);

  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  const handleQrClick = () => {
    setQrDialogOpen(true);
  };

  const handleQrClose = () => {
    setQrDialogOpen(false);
  };

  const handleOtpClick = () => {
    setOtpDialogOpen(true);
  };

  const handleOtpClose = () => {
    setOtpDialogOpen(false);
  };

  const handleVerify = (otp: string) => {
    // TODO: Implement OTP verification logic
    setOtpDialogOpen(false);
    onVerify(otp);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md items-start rounded-xl h-[80vh]">
          <DialogHeader className="shrink border-b pb-2">
            <DialogTitle className="text-2xl font-bold">
              {t("title")}
            </DialogTitle>
            <p className="text-sm font-medium text-black mt-2 mb-2">
              {t("description")}
            </p>
          </DialogHeader>
          <div className="flex-1 flex flex-col justify-start items-start gap-3 mt-4">
            <Button className="w-full h-12" onClick={handleOtpClick}>
              {t("otpVerification")}
            </Button>
            <Button
              className="w-full rounded-md bg-yellow-500 hover:bg-yellow-600 text-lg font-semibold h-12"
              onClick={handleQrClick}
            >
              {t("scanQr")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <VerifyOtpDialog
        open={otpDialogOpen}
        onClose={handleOtpClose}
        onVerify={handleVerify}
      />
      <ScanQrDialog open={qrDialogOpen} onClose={handleQrClose} />
    </>
  );
}
