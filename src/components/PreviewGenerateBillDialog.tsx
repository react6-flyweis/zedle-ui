"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/store/toastStore";
import type { IUser } from "@/types/user";
import { InvoicePreviewCard } from "./InvoicePreviewCard";

interface PreviewGenerateBillDialogProps {
  client: IUser;
  shop: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  children: React.ReactNode;
}

export function PreviewGenerateBillDialog({
  client,
  shop,
  children,
}: PreviewGenerateBillDialogProps) {
  const t = useTranslations("previewGenerateBill");
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("generate");
  // Form state can be managed with react-hook-form if needed

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-GB");

  const handleGenerateBill = () => {
    // Logic to generate the bill can be added here
    console.log("Bill generated for", client.name);
    toast("Your Bill Is Generated Successfully.");
    setTab("preview"); // Switch to preview tab after generating the bill
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl rounded-2xl max-h-[90vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="gap-1 flex-shrink-0 p-5 pb-0">
          <DialogTitle className="text-lg">{t("title")}</DialogTitle>
        </DialogHeader>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full flex bg-transparent p-0">
            <TabsTrigger
              value="generate"
              className={`flex-1 text-lg font-semibold rounded-none border-b-2 ${tab === "generate" ? "border-b-primary text-primary" : "border-transparent text-muted-foreground"}`}
            >
              {t("generateTab")}
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className={`flex-1 text-lg font-semibold rounded-none border-b-2 ${tab === "preview" ? "border-b-primary text-primary" : "border-transparent text-muted-foreground"}`}
            >
              {t("previewTab")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="generate" className="p-5">
            <div className="max-h-[60vh] overflow-y-auto pr-2">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-lg text-black">{shop.name}</div>
                <div className="text-sm text-black font-medium">
                  {t("dateLabel", { date: dateStr })}
                </div>
              </div>
              <div className="text-sm text-black mb-1">
                {t("phoneLabel", { phone: shop.phone })}
              </div>
              <div className="text-sm text-black mb-1">
                {t("emailLabel", { email: shop.email })}
              </div>
              <div className="text-sm text-black mb-4">
                {t("addressLabel", { address: shop.address })}
              </div>
              <div className="font-semibold text-base mb-2">
                {t("aboutClient")}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="clientName"
                  className="block text-sm font-medium mb-1"
                >
                  {t("clientName")}
                </label>
                <Input
                  id="clientName"
                  value={client.name}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="clientEmail"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("emailLabelShort")}
                  </label>
                  <Input
                    id="clientEmail"
                    value={client.email}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="clientPhone"
                    className="block text-sm font-medium mb-1"
                  >
                    {t("mobileLabel")}
                  </label>
                  <Input
                    id="clientPhone"
                    value={client.phone}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
              </div>
              <div className="font-semibold text-base mb-2">
                {t("aboutService")}
              </div>
              <div className="mb-2">
                <Input placeholder={t("serviceNamePlaceholder")} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <Input placeholder={t("durationPlaceholder")} />
                <Input placeholder={t("pricePlaceholder")} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <Input placeholder={t("discountPlaceholder")} />
                <Input placeholder={t("gstPlaceholder")} />
              </div>
              <div className="font-semibold text-base mt-4 mb-2">
                {t("totalPayable")}
              </div>
              <div className="mb-4">
                <Input readOnly className="bg-gray-100" value={""} />
              </div>
            </div>
            <Button
              type="button"
              className="w-full rounded-full  h mt-2"
              onClick={handleGenerateBill}
            >
              {t("generateButton")}
            </Button>
          </TabsContent>
          <TabsContent value="preview" className="">
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="bg-gray-200 font-semibold text-base px-4 py-2 ">
                26/Sep/2024
              </div>
              <div className="p-3">
                <InvoicePreviewCard />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
