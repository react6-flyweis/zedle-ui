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
// import { ImageInput } from "@/components/ui/image-input";
import { Input } from "@/components/ui/input";
import {
  Stepper,
  StepperBack,
  StepperFooter,
  StepperNext,
  StepperStep,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

const amenitiesKeys = [
  "cable",
  "internet",
  "electricity",
  "satelliteTv",
  "food",
  "fireplace",
  "bathTub",
  "pool",
  "alarmSystem",
  "fireExit",
];

const hotelLodgeSignupSchema = z.object({
  businessName: z.string().min(1),
  streetAddress: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  yearBuild: z.string().optional(),
  // Step 2 fields
  numberOfSiting: z.coerce.number().min(1),
  floorNumber: z.coerce.number().min(1),
  squareFeet: z.coerce.number().min(1),
  amenities: z
    .object(
      amenitiesKeys.reduce(
        (acc, key) => {
          acc[key] = z.boolean().optional();
          return acc;
        },
        {} as Record<string, z.ZodTypeAny>,
      ),
    )
    .optional(),
  // Step 3 fields
  description: z.string().min(1),
  videoTour: z.string().url().optional(),
  storeShopPhotos: z.any().optional(),
  // Step 4 fields
  additionalPhotos: z.any().optional(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "mustAgree" }),
  }),
});

type HotelLodgeSignupFormValues = z.infer<typeof hotelLodgeSignupSchema>;

export function VendorHotelLodgeSignup() {
  const t = useTranslations("vendorSignup");
  const form = useForm<HotelLodgeSignupFormValues>({
    resolver: zodResolver(hotelLodgeSignupSchema),
    defaultValues: {
      businessName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      yearBuild: "",
      description: "",
      videoTour: "",
      storeShopPhotos: undefined,
    },
  });

  const steps = [
    {
      label: t("hotelLodgeAddress"),
      onValidate: () =>
        form.trigger([
          "businessName",
          "streetAddress",
          "city",
          "state",
          "zipCode",
          "yearBuild",
          "agree",
        ]),
    },
    {
      label: t("hotelLodgeDetails"),
      onValidate: () =>
        form.trigger([
          "numberOfSiting",
          "floorNumber",
          "squareFeet",
          "amenities",
        ]),
    },
    {
      label: t("listingDescription"),
      onValidate: () => form.trigger(["businessName", "description"]),
    },
    {
      label: t("photosVideos"),
      onValidate: () => form.trigger(["videoTour", "additionalPhotos"]),
    },
  ];

  const onSubmit = (_data: HotelLodgeSignupFormValues) => {
    // handle submit
    // Optionally, use stepper's loading state if needed
    console.log(_data);
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stepper indicatorStyle="line">
            {/* Step 1: Address */}
            <StepperStep
              label={steps[0].label}
              onValidate={steps[0].onValidate}
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("hotelLodgeName")}</FormLabel>
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

            {/* Step 2: Hotel/Lodge Details */}
            <StepperStep
              label={steps[1].label}
              onValidate={steps[1].onValidate}
            >
              <div className="space-y-4">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="numberOfSiting"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{t("numberOfRooms")}</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="floorNumber"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{t("numberOfFloors")}</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="squareFeet"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{t("squareFeet")}</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} {...field} />
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
                <div>
                  <FormLabel className="block mb-2">
                    {t("utilitiesAmenities")}
                  </FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {amenitiesKeys.map((key) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={`amenities.${key}`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={!!field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {t(key)}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="block text-xs bg-background text-muted-foreground border rounded-md p-2">
                    {t("shopDetailsInfoText")}
                  </span>
                </div>
              </div>
            </StepperStep>
            <StepperStep
              label={steps[2].label}
              onValidate={steps[2].onValidate}
            >
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("businessName")}
                        <span className="text-xs text-muted-foreground ml-2">
                          ({t("ifDifferent")})
                        </span>
                      </FormLabel>
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
                      <FormLabel>{t("companyDescription")}</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={6}
                          className="w-full rounded-md border border-input px-3 py-2 text-sm resize-none"
                        />
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
              <div className="space-y-6">
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
                <FormField
                  control={form.control}
                  name="storeShopPhotos"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>{t("addHotelLodgePhotos")}</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-5 gap-4">
                          {Array.from({ length: 7 }).map((_, index) => {
                            const slotKey = `photo-upload-slot-${index}-main`;
                            return (
                              <label
                                key={slotKey}
                                className={cn(
                                  "min-h-28 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/60 transition-colors",
                                  { "col-span-2 row-span-2": index === 0 },
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
                                {index === 0 ? (
                                  <div className="flex flex-col items-center">
                                    <span className="mt-2 text-sm text-muted-foreground text-center">
                                      {t("clickToUpload")}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col size-7 bg-gray-700 rounded-full items-center justify-center">
                                    <PlusIcon className="size-5 text-white" />
                                  </div>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 mt-4">
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

            {/* Stepper navigation buttons */}
            <StepperFooter className="flex gap-6 ">
              <StepperBack asChild>
                <Button
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
