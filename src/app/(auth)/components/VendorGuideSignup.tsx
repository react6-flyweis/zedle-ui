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

const guideSignupSchema = z.object({
  fullName: z.string().min(1, "required"),
  price: z.string().min(1, "required"),
  email: z.string().email("invalidEmail"),
  phone: z.string().min(1, "required"),
  about: z.string().min(1, "required"),
  profilePhoto: z.any().optional(),
  expertise: z.array(z.string()).min(1, "required"),
  additionalPhotos: z.any().optional(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "mustAgree" }),
  }),
});

type GuideSignupFormValues = z.infer<typeof guideSignupSchema>;

export function VendorGuideSignup() {
  const t = useTranslations("vendorSignup");
  const router = useRouter();

  const form = useForm<GuideSignupFormValues>({
    resolver: zodResolver(guideSignupSchema),
    defaultValues: {
      fullName: "",
      price: "",
      email: "",
      phone: "",
      about: "",
      profilePhoto: undefined,
      expertise: [],
      additionalPhotos: undefined,
    },
  });

  const steps = [
    {
      label: t("details"),
      onValidate: () =>
        form.trigger(["fullName", "price", "email", "phone", "about", "agree"]),
    },
    {
      label: t("profileAndExpertise"),
      onValidate: () => form.trigger(["profilePhoto", "expertise"]),
    },
    {
      label: t("recentTours"),
      onValidate: () => Promise.resolve(true),
    },
  ];

  const expertiseOptions = [
    { value: "evisa", label: t("guideExpertise.evisa") },
    { value: "english", label: t("guideExpertise.english") },
    { value: "cultural", label: t("guideExpertise.cultural") },
    { value: "navigation", label: t("guideExpertise.navigation") },
  ];

  const onSubmit = (_data: GuideSignupFormValues) => {
    toast(t("accountCreatedSuccess"));
    router.push("/vendor/travel-tourism/guides/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stepper indicatorStyle="line">
          {/* Step 1: Details */}
          <StepperStep label={steps[0].label} onValidate={steps[0].onValidate}>
            <div className="space-y-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("guideFullName")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("guidePrice")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="off"
                          type="number"
                          min="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("guideEmail")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="off" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("guidePhone")}</FormLabel>
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
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("guideAbout")}</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-24" {...field} rows={4} />
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
          {/* Step 2: Profile Picture & Expertise */}
          <StepperStep label={steps[1].label} onValidate={steps[1].onValidate}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="profilePhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("guideProfilePhoto")}</FormLabel>
                    <FormControl>
                      <ImageInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("guideExpertise.label")}</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-4">
                        {expertiseOptions.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex flex-row items-center space-x-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...(field.value || []),
                                      option.value,
                                    ]);
                                  } else {
                                    field.onChange(
                                      (field.value || []).filter(
                                        (v: string) => v !== option.value,
                                      ),
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-2">
                <span className="block text-xs bg-background text-muted-foreground border rounded-md p-2">
                  {t("shopDetailsInfoText")}
                </span>
              </div>
            </div>
          </StepperStep>
          {/* Step 3: Recent Tours Photos */}
          <StepperStep label={steps[2].label} onValidate={steps[2].onValidate}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="additionalPhotos"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>{t("guideRecentToursPhotos")}</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-5 gap-2 gap-x-4">
                        {Array.from({ length: 8 }).map((_, index) => {
                          const slotKey = `photo-upload-slot-${index}-guide`;
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
          <StepperFooter className="flex gap-6">
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
