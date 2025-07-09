"use client";
import { DownloadIcon, Share2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/store/toastStore";
import { InvoicePreviewDialog } from "./InvoicePreviewDialog";

export function InvoicePreviewCard() {
  const [open, setOpen] = useState(false);
  // Mock data for preview
  const client = {
    name: "Mira Geidt",
    email: "example@gmail.com",
    phone: "+1 1234567890",
  };
  const shop = {
    name: "Shop Name",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    address: "123 abc, main street, Austin",
  };
  const service = {
    name: "Women's haircut",
    duration: "1 hour",
    price: "$60.00",
  };
  const date = "26/Sep/2024";

  const handleDownload = () => {
    // Logic to download the bill can be added here
    console.log("Bill downloaded for", client.name);
    // setOpen(false); // Close the dialog after downloading the bill
    toast("Your Bill Is Downloaded Successfully.");
  };

  return (
    <>
      <button
        type="button"
        className="bg-accent rounded-xl shadow flex items-center justify-between overflow-hidden p-0.5 cursor-pointer hover:ring-2 hover:ring-primary transition w-full"
        onClick={() => setOpen(true)}
        aria-label="Preview Invoice"
      >
        <div className="p-2 flex gap-4">
          <div className="w-28 h-18 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
            <span className="sr-only">Invoice</span>
            <div className="w-full h-full relative">
              <Image
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=128&q=80"
                alt="Invoice"
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-lg text-black mb-1">
              Client: Mira Geidt
            </div>
            <div className="text-sm text-gray-700">
              Service: Women's haircut
            </div>
            <div className="text-sm text-gray-700">Payment Amount: $60.00</div>
          </div>
        </div>

        <div className="flex flex-col h-full overflow-hidden gap-0.5">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="bg-white rounded-none rounded-tr-xl w-10 h-11 flex items-center justify-center"
            aria-label="Share"
          >
            <Share2Icon className="w-6 h-6 text-gray-700" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="bg-white rounded-none rounded-br-xl w-10 h-11 flex items-center justify-center"
            aria-label="Download"
            onClick={handleDownload}
          >
            <DownloadIcon className="w-6 h-6 text-gray-700" />
          </Button>
        </div>
      </button>
      <InvoicePreviewDialog
        open={open}
        onOpenChange={setOpen}
        onDownload={handleDownload}
        client={client}
        shop={shop}
        service={service}
        date={date}
      />
    </>
  );
}
