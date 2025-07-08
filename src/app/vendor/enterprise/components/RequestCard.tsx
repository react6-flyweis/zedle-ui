import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface RequestCardProps {
  name: string;
  service: string;
  date: string;
  time: string;
  status?: string;
  imageUrl: string;
}

export function RequestCard({
  name,
  service,
  date,
  time,
  status = "SP Assigned",
  imageUrl,
}: RequestCardProps) {
  const t = useTranslations("requestCard");
  return (
    <Card className="rounded-2xl overflow-hidden bg-white shadow p-0">
      <CardContent className="p-6 pb-0 flex flex-col gap-0">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={name}
              className="object-cover"
              height={100}
              width={100}
              priority
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <div className="font-bold text-2xl text-primary leading-tight">
              {name}
            </div>
            <div className="text-base text-primary font-medium">{service}</div>
            <div className="text-sm text-primary whitespace-pre-line">
              {date},{"\n"}
              {time}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-semibold text-lg text-primary">
              {t("progress")}
            </div>
            <div className="text-sm text-primary mt-1">{status}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full font-semibold py-3 rounded-none bg-primary text-white hover:bg-primary/90">
          {t("viewFullRequest")}
        </Button>
      </CardFooter>
    </Card>
  );
}
