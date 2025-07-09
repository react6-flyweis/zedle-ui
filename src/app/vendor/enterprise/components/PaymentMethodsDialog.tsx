"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import applePayIcon from "@/assets/icons/apple-pay.png";
import cardIcon from "@/assets/icons/card.png";
import cashIcon from "@/assets/icons/cash.png";
import gpayIcon from "@/assets/icons/gpay.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IClient } from "../../types";

const paymentMethods = [
  {
    key: "card",
    icon: cardIcon,
    labelKey: "methods.card",
  },
  {
    key: "googlePay",
    icon: gpayIcon,
    labelKey: "methods.googlePay",
  },
  {
    key: "applePay",
    icon: applePayIcon,
    labelKey: "methods.applePay",
  },
  {
    key: "cash",
    icon: cashIcon,
    labelKey: "methods.cash",
  },
];

interface PaymentMethodsDialogProps {
  client: IClient;
  children: React.ReactNode;
}

export function PaymentMethodsDialog({
  client,
  children,
}: PaymentMethodsDialogProps) {
  const t = useTranslations("paymentMethods");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(paymentMethods[0].key);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl rounded-2xl max-h-[90vh] flex flex-col overflow-hidden p-0">
        <div className="p-6 pb-0">
          <DialogHeader className="gap-1 flex-shrink-0">
            <DialogTitle className="text-2xl font-bold text-primary">
              {t("title")}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t("subtitle")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 mt-4 mb-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={client.imageUrl}
                alt={client.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-lg text-primary truncate">
                {client.name}
              </div>
              <div className="text-sm text-muted-foreground truncate">
                {t("phoneLabel", { phone: client.phone })}
              </div>
              <div className="text-sm text-muted-foreground truncate">
                {t("emailLabel", { email: client.email })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method.key}
                type="button"
                className="flex items-center justify-between w-full border rounded-lg px-4 py-2 bg-white transition-colors "
                onClick={() => setSelected(method.key)}
                aria-pressed={selected === method.key}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={method.icon}
                    alt={t(method.labelKey)}
                    width={50}
                    height={50}
                    className="object-contain max-h-7 max-w-7"
                  />
                  <span className="font-medium text-base text-gray-800">
                    {t(method.labelKey)}
                  </span>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${selected === method.key ? "bg-green-500 text-white" : "bg-gray-50 text-gray-500"}`}
                >
                  {selected === method.key ? t("selected") : t("select")}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 pt-0">
          <Button
            type="button"
            className="w-full rounded-full text-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            {t("selectButton")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
