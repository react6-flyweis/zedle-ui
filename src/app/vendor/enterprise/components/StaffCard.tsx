import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SendMessageDialog } from "./SendMessageDialog";

export interface IStaff {
  name: string;
  phone: string;
  email: string;
  image: string;
  profession?: string;
  yearsOfExperience?: number;
}

export function StaffCard({ staff }: { staff: IStaff }) {
  const t = useTranslations("staffCard");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="rounded-2xl overflow-hidden bg-background shadow p-0">
        <CardContent className="p-6 pb-0 flex flex-col gap-0">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={staff.image}
                alt={staff.name}
                className="object-cover"
                height={200}
                width={200}
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-2xl mb-1 text-primary truncate">
                {staff.name}
              </div>
              <div className="text-base text-primary mb-1 truncate">
                {t("phoneLabel", { phone: staff.phone })}
              </div>
              <div className="text-base text-primary truncate">
                {t("emailLabel", { email: staff.email })}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center font-semibold p-0">
          <Button type="button" className="w-full h-full rounded-t-none">
            Edit details
          </Button>
        </CardFooter>
      </Card>

      <SendMessageDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
