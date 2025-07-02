import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { OtpInput } from "./OtpInput";

interface OtpVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: () => void;
}

export function OtpVerificationDialog({
  open,
  onOpenChange,
  onVerify,
}: OtpVerificationDialogProps) {
  const t = useTranslations("otpVerification");
  const [resendLoading, setResendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // Dynamic OTP length
  const otpLength = 6; // Change this value to adjust OTP length

  // Use translation for zod error message with dynamic length
  const otpSchema = z.object({
    otp: z
      .string()
      .length(otpLength, { message: t("otpInvalid", { length: otpLength }) }),
  });

  type OtpForm = z.infer<typeof otpSchema>;

  const form = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
    mode: "onChange",
  });

  const handleResend = async () => {
    setResendLoading(true);
    // Simulate resend
    await new Promise((r) => setTimeout(r, 1000));
    setResendLoading(false);
  };

  const onSubmit = async (data: OtpForm) => {
    setVerifyLoading(true);
    // Simulate verify
    await new Promise((r) => setTimeout(r, 1000));
    setVerifyLoading(false);
    onVerify();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
        <div className="bg-background p-8 rounded-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-foreground">
              {t("title")}
            </DialogTitle>
            <div className="flex justify-end">
              <Link
                href="/login"
                className="text-sm text-primary underline flex items-center gap-1"
              >
                <ArrowLeft className="size-4" />
                {t("backToLogin")}
              </Link>
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              {t("subtitle")}
            </p>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-foreground mb-2">
                      {t("enterOtp")}
                    </FormLabel>
                    <FormControl>
                      <OtpInput length={otpLength} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-primary text-primary px-6"
                  onClick={handleResend}
                  disabled={resendLoading}
                >
                  <RefreshCw className="size-4 mr-2" />
                  {resendLoading ? t("resending") : t("resendOtp")}
                </Button>
              </div>
              <Button
                type="submit"
                className="w-full h-12 rounded-full bg-primary text-white text-lg font-semibold mt-6"
                disabled={!form.formState.isValid || verifyLoading}
              >
                {verifyLoading ? t("verifying") : t("verifyOtp")}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
