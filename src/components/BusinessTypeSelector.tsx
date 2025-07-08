import Image from "next/image";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export type BusinessTypeOption = {
  value: string;
  labelKey: string;
  image: string;
};

export const businessTypes: BusinessTypeOption[] = [
  {
    value: "hairSaloon",
    labelKey: "hairSaloon",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "barbershop",
    labelKey: "barbershop",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "nailSaloon",
    labelKey: "nailSaloon",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "massage",
    labelKey: "massage",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "makeup",
    labelKey: "makeup",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "petService",
    labelKey: "petService",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "piercing",
    labelKey: "piercing",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "healthFitness",
    labelKey: "healthFitness",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "skinCare",
    labelKey: "skinCare",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "wellnessSpa",
    labelKey: "wellnessSpa",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "hairRemoval",
    labelKey: "hairRemoval",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "houseCleaning",
    labelKey: "houseCleaning",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "interiorPainting",
    labelKey: "interiorPainting",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "handyman",
    labelKey: "handyman",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "electricalRepair",
    labelKey: "electricalRepair",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "plumbingDrain",
    labelKey: "plumbingDrain",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=256&q=80",
  },
  {
    value: "localMoving",
    labelKey: "localMoving",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80",
  },
];

interface BusinessTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function BusinessTypeSelector({
  value,
  onChange,
}: BusinessTypeSelectorProps) {
  const t = useTranslations("businessTypes");
  return (
    <RadioGroup
      className="grid grid-cols-4 gap-6"
      value={value}
      onValueChange={onChange}
    >
      {businessTypes.map((type) => {
        const selected = value === type.value;
        return (
          <div key={type.value} className="flex flex-col items-center">
            <label className="flex flex-col items-center cursor-pointer w-full">
              <input
                type="radio"
                name="businessType"
                value={type.value}
                checked={selected}
                onChange={() => onChange(type.value)}
                className="sr-only"
                aria-label={t(type.labelKey)}
              />
              <div
                className={cn(
                  "flex flex-col items-center justify-center p-4 border border-primary rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-background",
                  selected ? "bg-primary shadow-lg" : "",
                  "relative",
                )}
              >
                <Image
                  src={type.image}
                  alt={t(type.labelKey)}
                  width={80}
                  height={80}
                  className={cn(
                    "object-cover w-20 h-20 transition-all",
                    selected ? "rounded-md scale-110" : "rounded-full",
                  )}
                />
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium text-center block w-[120px] truncate",
                  selected ? "text-primary" : "text-foreground",
                )}
              >
                {t(type.labelKey)}
              </span>
            </label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
