"use client";

import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/store/LanguageStore";

const languages = [
  { code: "en-US", label: "englishUS" },
  { code: "en-UK", label: "englishUK" },
  { code: "fr", label: "french" },
];
export function LanguageSelector({ className }: { className?: string }) {
  const t = useTranslations("languageSelector");
  const { locale, setLocale } = useLanguageStore();

  return (
    <Select value={locale} onValueChange={setLocale}>
      <SelectTrigger
        className={cn("min-w-[140px] border-none shadow-none", className)}
        aria-label={t("label")}
      >
        <SelectValue>
          {t(languages.find((l) => l.code === locale)?.label || locale)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {t(lang.label)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
