import Image from "next/image";
import { useTranslations } from "next-intl";
import animatedCheck from "@/assets/images/animated-check.gif";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SuccessToastProps {
  title: string;
  description: string;
  className?: string;
}

export function SuccessToast({
  title,
  description,
  className,
}: SuccessToastProps) {
  const t = useTranslations("common");
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl bg-white p-8 w-full max-w-md min-h-[320px]",
        className,
      )}
    >
      <div className="mb-6">
        <Image
          src={animatedCheck}
          alt={t("successGifAlt", { defaultValue: "Success animation" })}
          width={120}
          height={120}
          className="rounded-full object-contain"
          priority
        />
      </div>
      <h2 className="text-2xl font-semibold text-center text-black mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-base text-gray-500 text-center">{description}</p>
      )}
    </Card>
  );
}
