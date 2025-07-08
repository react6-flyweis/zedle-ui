import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SendMessageDialog } from "./SendMessageDialog";

export interface ClientCardProps {
  name: string;
  phone: string;
  email: string;
  imageUrl: string;
  type: "recurring" | "new";
}

export function ClientCard({
  name,
  phone,
  email,
  imageUrl,
  type,
}: ClientCardProps) {
  const t = useTranslations("clientCard");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="rounded-2xl overflow-hidden bg-white shadow p-0">
        <CardContent className="p-6 pb-0 flex flex-col gap-0">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={imageUrl}
                alt={name}
                className="object-cover"
                height={200}
                width={200}
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-2xl mb-1 text-[#4B0D3A] truncate">
                {name}
              </div>
              <div className="text-base text-gray-700 mb-1 truncate">
                {t("phoneLabel", { phone })}
              </div>
              <div className="text-base text-gray-700 truncate">
                {t("emailLabel", { email })}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center font-semibold p-0">
          <Button
            type="button"
            className="w-full h-full rounded-t-none"
            onClick={() => (type === "recurring" ? setOpen(true) : null)}
          >
            {type === "recurring" ? t("recurringCustomer") : t("newCustomer")}
          </Button>
        </CardFooter>
      </Card>

      <SendMessageDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
