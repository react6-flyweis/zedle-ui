"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { createRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const otpSchema = z.object({
  otp: z.string().length(4, "OTP must be 4 digits"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

interface VerifyOtpDialogProps {
  open: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

export function VerifyOtpDialog({
  open,
  onClose,
  onVerify,
}: VerifyOtpDialogProps) {
  const t = useTranslations("otpDialog");
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  // Handle OTP input focus and value
  const inputRefs = Array.from({ length: 4 }, () =>
    createRef<HTMLInputElement>(),
  );

  const handleOtpChange = (index: number, value: string) => {
    const sanitized = value.replace(/\D/g, "");
    const otpArr = form.getValues("otp").padEnd(4, "").split("");
    otpArr[index] = sanitized;
    setValue("otp", otpArr.join(""));
    if (sanitized && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      const otpArr = form.getValues("otp").padEnd(4, "").split("");
      if (!otpArr[index] && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const getOtpChar = (index: number) => {
    return (form.getValues("otp") || "")[index] || "";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl p-8">
        <DialogHeader className="border-b pb-2 mb-4">
          <DialogTitle className="text-2xl font-bold">
            {t("otpVerificationTitle")}
          </DialogTitle>
          <p className="text-sm font-medium text-black mt-2 mb-2">
            {t("otpVerificationDescription")}
          </p>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit((data) => onVerify(data.otp))}
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    {t("verificationCode")}
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      {[0, 1, 2, 3].map((i) => (
                        <Input
                          key={i}
                          ref={inputRefs[i]}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className={cn(
                            "w-20 h-20 text-3xl text-center bg-gray-100 rounded-md border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary",
                            errors.otp && "border-red-500",
                          )}
                          value={getOtpChar(i)}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          autoFocus={i === 0}
                          aria-label={`${t("verificationCode")} ${i + 1}`}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12 text-lg font-semibold">
              {t("next")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
