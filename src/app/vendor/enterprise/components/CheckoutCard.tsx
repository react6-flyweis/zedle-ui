import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { IClient } from "../../types";
import { AddServicesDialog } from "./AddServicesDialog";
import { GiveDiscountDialog } from "./GiveDiscountDialog";

export function CheckoutCard({ client }: { client: IClient }) {
  const t = useTranslations("checkoutCard");

  return (
    <Card className="rounded-2xl overflow-hidden bg-white shadow p-0">
      <CardContent className="p-6 pb-0 flex flex-col gap-0">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={client.imageUrl}
              alt={client.name}
              className="object-cover"
              height={200}
              width={200}
              priority
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-2xl mb-1 text-[#4B0D3A] truncate">
              {client.name}
            </div>
            <div className="text-base text-gray-700 mb-1 truncate">
              {t("phoneLabel", { phone: client.phone })}
            </div>
            <div className="text-base text-gray-700 truncate">
              {t("emailLabel", { email: client.email })}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex p-0">
        <div className="grid grid-cols-4 w-full">
          <GiveDiscountDialog client={client}>
            <Button
              type="button"
              className="rounded-none h-12 flex items-center justify-center whitespace-pre-line text-center px-2"
            >
              <span className="block w-full break-words text-center">
                {t("actions.giveDiscount")}
              </span>
            </Button>
          </GiveDiscountDialog>
          <AddServicesDialog client={client}>
            <Button
              type="button"
              className="rounded-none h-12 flex items-center justify-center whitespace-pre-line text-center px-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <span className="block w-full break-words text-center">
                {t("actions.addServices")}
              </span>
            </Button>
          </AddServicesDialog>
          <Button
            type="button"
            className="rounded-none h-12 flex items-center justify-center whitespace-pre-line text-center px-2"
          >
            <span className="block w-full break-words text-center">
              {t("actions.paymentMethods")}
            </span>
          </Button>
          <Button
            type="button"
            className="rounded-none h-12 flex items-center justify-center whitespace-pre-line text-center px-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            <span className="block w-full break-words text-center">
              {t("actions.previewGenerateBill")}
            </span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
