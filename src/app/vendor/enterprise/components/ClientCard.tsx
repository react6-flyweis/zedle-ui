import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
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
      <div className="bg-[#8B1765] text-white text-center font-semibold py-3 text-base rounded-b-2xl">
        {type === "recurring" ? t("recurringCustomer") : t("newCustomer")}
      </div>
    </Card>
  );
}
