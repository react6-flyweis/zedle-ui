"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
// import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
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

const restaurantSignupSchema = z.object({
  restaurantName: z.string().min(1, "required"),
  restaurantAddress: z.string().min(1, "required"),
  city: z.string().min(1, "required"),
  state: z.string().min(1, "required"),
  zipCode: z.string().min(1, "required"),
  yearBuild: z.string().optional(),
  description: z.string().min(1, "required"),
  videoTour: z.string().url("invalidUrl").optional(),
  restaurantPhoto: z.any().optional(),
  additionalPhotos: z.any().optional(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "mustAgree" }),
  }),
});

type RestaurantSignupFormValues = z.infer<typeof restaurantSignupSchema>;

export function VendorFoodSignup() {
  const t = useTranslations("vendorSignup");
  const form = useForm<RestaurantSignupFormValues>({
    resolver: zodResolver(restaurantSignupSchema),
    defaultValues: {
      restaurantName: "",
      restaurantAddress: "",
      city: "",
      state: "",
      zipCode: "",
      yearBuild: "",
      description: "",
      videoTour: "",
      restaurantPhoto: undefined,
      additionalPhotos: undefined,
    },
  });

  const steps = [
    {
      label: t("restaurantAddress"),
      onValidate: () =>
        form.trigger([
          "restaurantName",
          "restaurantAddress",
          "city",
          "state",
          "zipCode",
          "yearBuild",
        ]),
    },
    {
      label: t("listingDescription"),
      onValidate: () => form.trigger(["restaurantName", "description"]),
    },
    {
      label: t("photosVideos"),
      onValidate: () => Promise.resolve(true), // Placeholder
    },
    {
      label: t("restaurantImage"),
      onValidate: () => Promise.resolve(true), // Placeholder
    },
  ];

  const onSubmit = (_data: RestaurantSignupFormValues) => {
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
                  name="restaurantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("businessName")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="restaurantAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("restaurantAddress")}</FormLabel>
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
              </div>
            </StepperStep>
            <StepperStep
              label={steps[1].label}
              onValidate={steps[1].onValidate}
            >
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="restaurantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("restaurantName")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("restaurantDescription")}</FormLabel>
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
                {/* Restaurant Photo Upload */}
                <FormField
                  control={form.control}
                  name="restaurantPhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("addRestaurantPhoto")}</FormLabel>
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
                {/* Additional Photos Grid */}
                <FormField
                  control={form.control}
                  name="additionalPhotos"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>{t("addRestaurantImage")}</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-5 gap-2 gap-x-4">
                          {/* Generate 8 upload slots */}
                          {Array.from({ length: 8 }).map((_, index) => {
                            // Use a unique key based on a stable prefix and slot position
                            const slotKey = `photo-upload-slot-${index}-additional`;
                            return (
                              <label
                                key={slotKey}
                                className={cn(
                                  "min-h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/60 transition-colors bg-gray-50",
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
                                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
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
