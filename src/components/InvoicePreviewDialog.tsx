"use client";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InvoicePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: () => void;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  shop: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  service: {
    name: string;
    duration: string;
    price: string;
  };
  date: string;
}

export function InvoicePreviewDialog({
  open,
  onOpenChange,
  client,
  shop,
  service,
  date,
  onDownload,
}: InvoicePreviewDialogProps) {
  const t = useTranslations("invoicePreview");

  const downloadHandler = () => {
    onDownload();
    onOpenChange(false); // Close the dialog after downloading
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg rounded-2xl max-h-[90vh] flex flex-col overflow-hidden p-4"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center gap-2 mb-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <DialogTitle className="text-xl font-bold flex-1 text-center">
            {t("title")}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center  font-semibold text-base mb-1 px-4  ">
            <span>{t("shopName")}</span>
            <span>{t("dateLabel", { date })}</span>
          </div>
          <div className="px-4 pb-2">
            <div className="text-sm">
              {t("phoneLabel", { phone: shop.phone })}
            </div>
            <div className="text-sm">
              {t("emailLabel", { email: shop.email })}
            </div>
            <div className="text-sm mb-2">
              {t("addressLabel", { address: shop.address })}
            </div>
            <div className="font-semibold text-base mt-2 mb-1">
              {t("aboutClient")}
            </div>
            <div className="text-sm">
              {t("clientName", { name: client.name })}
            </div>
            <div className="text-sm">
              {t("emailLabel", { email: client.email })}
            </div>
            <div className="text-sm mb-2">
              {t("phoneLabel", { phone: client.phone })}
            </div>
            <div className="font-semibold text-base mt-2 mb-1">
              {t("aboutService")}
            </div>
            <div className="text-sm">
              {t("serviceName", { name: service.name })}
            </div>
            <div className="text-sm">
              {t("duration", { duration: service.duration })}
            </div>
            <div className="text-sm mb-4">
              {t("price", { price: service.price })}
            </div>
          </div>
          <div className="flex gap-4 ">
            <Button className="flex-1 rounded-full">{t("share")}</Button>
            <Button className="flex-1 rounded-full" onClick={downloadHandler}>
              {t("download")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
