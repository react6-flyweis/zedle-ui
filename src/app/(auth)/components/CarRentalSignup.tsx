"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "@/store/toastStore";

const carRentalSignupSchema = z.object({
  companyName: z.string().min(1, "required"),
  streetAddress: z.string().min(1, "required"),
  city: z.string().min(1, "required"),
  state: z.string().min(1, "required"),
  zipCode: z.string().min(1, "required"),
  yearBuild: z.string().optional(),
  businessName: z.string().optional(),
  companyDescription: z.string().min(1, "required"),
  videoTour: z.string().url("invalidUrl").optional(),
  companyPhoto: z.any().optional(),
  additionalPhotos: z.any().optional(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "mustAgree" }),
  }),
});

type CarRentalSignupFormValues = z.infer<typeof carRentalSignupSchema>;

export function CarRentalSignup() {
  const t = useTranslations("vendorSignup");
  const router = useRouter();

  const form = useForm<CarRentalSignupFormValues>({
    resolver: zodResolver(carRentalSignupSchema),
    defaultValues: {
      companyName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      yearBuild: "",
      businessName: "",
      companyDescription: "",
      videoTour: "",
      companyPhoto: undefined,
      additionalPhotos: undefined,
    },
  });

  const steps = [
    {
      label: t("companyDetails"),
      onValidate: () =>
        form.trigger([
          "companyName",
          "streetAddress",
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
      onValidate: () => Promise.resolve(true),
    },
    {
      label: t("additionalPhotos"),
      onValidate: () => Promise.resolve(true),
    },
  ];

  const onSubmit = (_data: CarRentalSignupFormValues) => {
    // TODO: handle submit
    toast(t("accountCreatedSuccess"));
    router.push("/vendor/travel-tourism/car-rental/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stepper indicatorStyle="line">
          {/* Step 1: Company Details */}
          <StepperStep label={steps[0].label} onValidate={steps[0].onValidate}>
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
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("streetAddress")}</FormLabel>
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
                        {t("terms")}
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
          {/* Step 2: Listing Description */}
          <StepperStep label={steps[1].label} onValidate={steps[1].onValidate}>
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
                      <Textarea className="min-h-32" {...field} rows={6} />
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
                      {t("agreeText")}{" "}
                      <Link href="/terms" className="underline">
                        {t("terms")}
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
          {/* Step 3: Photos & Videos */}
          <StepperStep label={steps[2].label} onValidate={steps[2].onValidate}>
            <div className="space-y-4">
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
                        placeholder={t("videoTourHint")}
                        className="rounded-md px-3 py-2 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
          {/* Step 4: Additional Photos */}
          <StepperStep label={steps[3].label} onValidate={steps[3].onValidate}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="additionalPhotos"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>{t("addAdditionalPhotos")}</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-5 gap-2 gap-x-4">
                        {Array.from({ length: 8 }).map((_, index) => {
                          const slotKey = `photo-upload-slot-${index}-additional`;
                          return (
                            <label
                              key={slotKey}
                              className={cn(
                                "min-h-32 border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/60 transition-colors",
                                { "col-span-4 row-span-2": index === 1 },
                              )}
                            >
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  onChange(e.target.files);
                                }}
                                {...rest}
                              />
                              <div className="size-8 rounded-full bg-accent-foreground flex items-center justify-center">
                                <PlusIcon className="w-6 h-6 text-white" />
                              </div>
                            </label>
                          );
                        })}
                      </div>
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
                variant="outline"
                className="flex-1 bg-primary-foreground text-primary rounded-full py-3"
              >
                {t("back")}
              </Button>
            </StepperBack>
            <StepperNext asChild>
              {({ isLastStep }) => (
                <Button className="flex-1 bg-primary text-white rounded-full py-3">
                  {isLastStep ? t("submit") : t("next")}
                </Button>
              )}
            </StepperNext>
          </StepperFooter>
        </Stepper>
      </form>
    </Form>
  );
}
