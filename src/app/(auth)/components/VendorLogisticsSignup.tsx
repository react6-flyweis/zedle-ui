"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageInput } from "@/components/ui/image-input";
import { Input } from "@/components/ui/input";
import {
  Stepper,
  StepperBack,
  StepperFooter,
  StepperNext,
  StepperStep,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

const companySignupSchema = z.object({
  companyName: z.string().min(1, "required"),
  companyAddress: z.string().min(1, "required"),
  city: z.string().min(1, "required"),
  state: z.string().min(1, "required"),
  zipCode: z.string().min(1, "required"),
  yearBuild: z.string().optional(),
  businessName: z.string().optional(),
  companyDescription: z.string().min(1, "required"),
  videoTour: z.string().url("invalidUrl").optional(),
  companyPhoto: z.any().optional(),
  companyReviewImage: z.any().optional(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "mustAgree" }),
  }),
});

type CompanySignupFormValues = z.infer<typeof companySignupSchema>;

export function VendorLogisticsSignup() {
  const t = useTranslations("vendorSignup");
  const form = useForm<CompanySignupFormValues>({
    resolver: zodResolver(companySignupSchema),
    defaultValues: {
      companyName: "",
      companyAddress: "",
      city: "",
      state: "",
      zipCode: "",
      yearBuild: "",
      businessName: "",
      companyDescription: "",
      videoTour: "",
      companyPhoto: undefined,
      companyReviewImage: undefined,
    },
  });

  const steps = [
    {
      label: t("companyDetails"),
      onValidate: () =>
        form.trigger([
          "companyName",
          "companyAddress",
          "city",
          "state",
          "zipCode",
          "yearBuild",
          "agree",
        ]),
    },
    {
      label: t("listingDescription"),
      onValidate: () =>
        form.trigger(["businessName", "companyDescription", "agree"]),
    },
    {
      label: t("photosVideos"),
      onValidate: () => Promise.resolve(true), // Placeholder
    },
    {
      label: t("companyReviewImage"),
      onValidate: () => Promise.resolve(true), // Placeholder
    },
  ];

  const onSubmit = (_data: CompanySignupFormValues) => {
    // handle submit
    // Optionally, use stepper's loading state if needed
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stepper indicatorStyle="line">
            <StepperStep
              label={steps[0].label}
              onValidate={steps[0].onValidate}
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("companyName")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("companyAddress")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{t("city")}</FormLabel>
                        <FormControl>
                          <Input {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{t("state")}</FormLabel>
                        <FormControl>
                          <Input {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{t("zipCode")}</FormLabel>
                        <FormControl>
                          <Input {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearBuild"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          {t("yearBuild")}{" "}
                          <span className="text-xs text-muted-foreground">
                            ({t("optional")})
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} autoComplete="off" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-xs font-normal">
                        {t("agreeText")}{" "}
                        <Link href="/terms" className="underline">
                          {t("termsOfUse")}
                        </Link>{" "}
                        {t("and")}{" "}
                        <Link href="/privacy-policy" className="underline">
                          {t("privacyPolicy")}
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </StepperStep>
            <StepperStep
              label={steps[1].label}
              onValidate={steps[1].onValidate}
            >
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("businessNameIfDifferent")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("companyDescription")}</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={6}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-xs font-normal">
                        {t("byCreatingAccount")}{" "}
                        <Link href="/terms" className="underline">
                          {t("termsOfUse")}
                        </Link>{" "}
                        {t("and")}{" "}
                        <Link href="/privacy-policy" className="underline">
                          {t("privacyPolicy")}
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </StepperStep>
            <StepperStep
              label={steps[2].label}
              onValidate={steps[2].onValidate}
            >
              <div className="space-y-4">
                {/* Video Tour Field */}
                <FormField
                  control={form.control}
                  name="videoTour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("videoTour")}</FormLabel>
                      <span className="block text-xs text-muted-foreground mb-2">
                        {t("videoTourHint")}
                      </span>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          placeholder={t("videoTourPlaceholder")}
                          className="bg-background border border-input rounded-md px-3 py-2 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Company Photo Upload */}
                <FormField
                  control={form.control}
                  name="companyPhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("addCompanyPhoto")}</FormLabel>
                      <FormControl>
                        <ImageInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </StepperStep>
            <StepperStep
              label={steps[3].label}
              onValidate={steps[3].onValidate}
            >
              <div className="space-y-4">
                {/* Company Review Image Upload */}
                <FormField
                  control={form.control}
                  name="companyReviewImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("addCompanyReviewImage")}</FormLabel>
                      <FormControl>
                        <ImageInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </StepperStep>
            {/* Stepper navigation buttons */}
            <StepperFooter className="flex gap-6 mt-6">
              <StepperBack asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-primary-foreground text-primary rounded-full py-3"
                >
                  {t("back")}
                </Button>
              </StepperBack>
              <StepperNext asChild>
                <Button className="flex-1 bg-primary text-white rounded-full py-3">
                  {t("submit")}
                </Button>
              </StepperNext>
            </StepperFooter>
          </Stepper>
        </form>
      </Form>
    </div>
  );
}
