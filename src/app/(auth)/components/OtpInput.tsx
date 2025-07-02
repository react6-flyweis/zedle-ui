import { useTranslations } from "next-intl";
import { useId, useRef } from "react";

import { Input } from "@/components/ui/input";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export function OtpInput({ value, onChange, length = 6 }: OtpInputProps) {
  const t = useTranslations("otpVerification");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpDigits = value
    .split("")
    .concat(Array(length).fill(""))
    .slice(0, length);
  const idPrefix = useId();
  const inputIds = Array.from({ length }).map(
    (_, idx) => `${idPrefix}-otp-digit-${idx}`,
  );

  const handleChange = (idx: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const arr = otpDigits.slice();
    arr[idx] = val;
    const newOtp = arr.join("").slice(0, length);
    onChange(newOtp);
    if (val && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    } else if (!val && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (!val && idx === 0) {
      // Stay on first input
      inputRefs.current[0]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (paste.length) {
      onChange(paste);
      setTimeout(() => {
        const next = Math.min(paste.length, length) - 1;
        inputRefs.current[next]?.focus();
      }, 0);
    }
    e.preventDefault();
  };

  return (
    <div className="flex gap-2 justify-start mb-2">
      {Array.from({ length }).map((_, idx) => (
        <Input
          key={inputIds[idx]}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          id={inputIds[idx]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-12 h-12 text-center text-xl border rounded focus:ring-2 focus:ring-primary"
          value={otpDigits[idx]}
          onChange={(e) => handleChange(idx, e.target.value)}
          onFocus={(e) => e.target.select()}
          onPaste={handlePaste}
          autoComplete="one-time-code"
          aria-label={t("otpDigit", { index: idx + 1 })}
        />
      ))}
    </div>
  );
}
