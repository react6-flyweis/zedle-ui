"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import femaleDriver from "../assets/female-driver.png";
import maleDriver from "../assets/male-driver.png";

interface GenderSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function GenderSelector({ value, onChange }: GenderSelectorProps) {
  const t = useTranslations("deliverySignup");
  return (
    <FormItem>
      <FormLabel className="mb-2">{t("selectGender")}</FormLabel>
      <FormControl>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="grid grid-cols-2 gap-4"
        >
          <RadioGroupItem
            value="male"
            id="gender-male"
            className="peer sr-only"
          />
          <label
            htmlFor="gender-male"
            className={cn(
              "h-36 flex flex-col items-center justify-center border rounded-lg cursor-pointer space-y-2 transition-all",
              value === "male" ? "border-primary bg-primary" : "",
            )}
          >
            <Image
              src={maleDriver}
              alt="Male Driver"
              className={cn("max-h-15 max-w-15", {
                "invert brightness-200": value === "male",
              })}
              style={
                value === "male"
                  ? undefined
                  : {
                      filter:
                        "brightness(0) saturate(100%) invert(7%) sepia(79%) saturate(6307%) hue-rotate(317deg) brightness(91%) contrast(93%)",
                    }
              }
            />
            {/* <span className="text-sm font-medium">{t("male")}</span> */}
          </label>
          <RadioGroupItem
            value="female"
            id="gender-female"
            className="peer sr-only"
          />
          <label
            htmlFor="gender-female"
            className={cn(
              "h-36 flex flex-col items-center justify-center border rounded-lg cursor-pointer space-y-2 transition-all",
              value === "female" ? "border-primary bg-primary" : "",
            )}
          >
            <Image
              src={femaleDriver}
              alt="Female Driver"
              className={cn("max-h-12 max-w-12", {
                "invert brightness-200": value === "female",
              })}
              style={
                value === "female"
                  ? undefined
                  : {
                      filter:
                        "brightness(0) saturate(100%) invert(7%) sepia(79%) saturate(6307%) hue-rotate(317deg) brightness(91%) contrast(93%)",
                    }
              }
            />
            {/* <span className="text-sm font-medium">{t("female")}</span> */}
          </label>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
