"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OtpVerificationDialog } from "./OtpVerificationDialog";

// Zod schema for form validation
const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Email or phone number is required")
    .refine(
      (value) => {
        // Check if it's a valid email or phone number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      },
      {
        message: "Please enter a valid email address or phone number",
      },
    ),
  password: z.string().min(5, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

const getUserPath = (userType: string) => {
  switch (userType) {
    case "user":
      return "users";
    case "delivery":
      return "delivery-partner";
    case "vendor":
      return "vendors";
    default:
      return "users";
  }
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const t = useTranslations("login");

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  const onSubmit = (_data: LoginForm) => {
    setOtpDialogOpen(true);
  };

  const handleNext = () => {
    const category = searchParams.get("category") || "grocery";
    const userType = searchParams.get("type") || "users";
    const targetPath = `/${getUserPath(userType)}/${userType !== "delivery" ? category : ""}`;
    router.push(targetPath);
  };

  const handleCreateAccount = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/signup?${params.toString()}`);
  };

  return (
    <>
      <OtpVerificationDialog
        open={otpDialogOpen}
        onOpenChange={setOtpDialogOpen}
        onVerify={handleNext}
      />
      <div className="flex  flex-col md:flex-row justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-sm text-gray-600">
          {t("noAccount")}
          <Button
            variant="link"
            onClick={handleCreateAccount}
            className=" font-medium"
          >
            {t("createAccount")}
          </Button>
        </p>
      </div>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email/Phone Input */}
            <FormField
              control={form.control}
              name="emailOrPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {t("emailOrPhone")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password Input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {t("password")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-purple-700"
                    >
                      {t("forgotPassword")}
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? t("loggingIn") : t("loginButton")}
            </Button>
          </form>
        </Form>
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-accent text-gray-500">
              {t("orDivider")}
            </span>
          </div>
        </div>
        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full rounded-full"
          >
            {t("continueWithGoogle")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full rounded-full"
          >
            {t("continueWithFacebook")}
          </Button>
        </div>
      </div>
    </>
  );
}
