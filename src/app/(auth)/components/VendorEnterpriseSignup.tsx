"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { BusinessTypeSelector } from "@/components/BusinessTypeSelector";
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

const staffMemberSchema = z.object({
  photo: z.any().optional(),
  fullName: z.string().min(1, "required"),
  profession: z.string().min(1, "required"),
  experience: z.string().min(1, "required"),
  mobile: z.string().min(1, "required"),
});

const AMENITY_KEYS = [
  "cable",
  "internet",
  "electricity",
  "satelliteTv",
  "dryer",
  "fireplace",
  "laundryHookups",
  "alarmSystem",
] as const;
type AmenityKey = (typeof AMENITY_KEYS)[number];
type Amenities = Record<AmenityKey, boolean>;

const ALL_SERVICES = [
  {
    key: "womens-haircut-long-1",
    name: "Women’s hair-cut long hair",
    description: "Shampoo, cut and blow dry are included",
    selected: false,
    duration: undefined,
    amount: undefined,
  },
  {
    key: "womens-haircut-1",
    name: "Women’s haircut",
    description: "Shampoo, cut and blow dry are included",
    selected: false,
    duration: undefined,
    amount: undefined,
  },
  {
    key: "mens-haircut-1",
    name: "Men’s haircut",
    description: "Shampoo, cut and blow dry are included",
    selected: false,
    duration: undefined,
    amount: undefined,
  },
  {
    key: "womens-haircut-long-2",
    name: "Women’s hair-cut long hair",
    description: "Shampoo, cut and blow dry are included",
    selected: false,
    duration: undefined,
    amount: undefined,
  },
  {
    key: "womens-haircut-2",
    name: "Women’s haircut",
    description: "Shampoo, cut and blow dry are included",
    selected: false,
    duration: undefined,
    amount: undefined,
  },
  {
    key: "mens-haircut-2",
    name: "Men’s haircut",
    description: "Shampoo, cut and blow dry are included",
    selected: false,
    duration: undefined,
    amount: undefined,
  },
];

const serviceSchema = z.object({
  name: z.string().min(1, "required"),
  description: z.string().min(1, "required"),
  selected: z.boolean(),
  duration: z.coerce.number().min(0.1, "required").optional(),
  amount: z.coerce.number().min(0, "required").optional(),
});

const companySignupSchema = z.object({
  companyName: z.string().min(1, "required"),
  companyAddress: z.string().min(1, "required"),
  city: z.string().min(1, "required"),
  state: z.string().min(1, "required"),
  zipCode: z.string().min(1, "required"),
  yearBuild: z.string().optional(),
  businessType: z.string().min(1, "required"),
  businessName: z.string().optional(),
  companyDescription: z.string().min(1, "required"),
  videoTour: z.string().url("invalidUrl").optional(),
  companyPhoto: z.any().optional(),
  companyReviewImage: z.any().optional(),
  numberOfSiting: z.coerce.number(),
  floorNumber: z.coerce.number(),
  squareFeet: z.coerce.number(),
  amenities: z.object(
    AMENITY_KEYS.reduce(
      (acc, key) => {
        acc[key] = z.boolean().optional();
        return acc;
      },
      {} as Record<AmenityKey, z.ZodTypeAny>,
    ),
  ),
  staff: z.array(staffMemberSchema).min(1, "atLeastOneStaff").optional(),
  services: z.array(serviceSchema).min(1, "atLeastOneService").optional(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "mustAgree" }),
  }),
});

type CompanySignupFormValues = z.infer<typeof companySignupSchema>;

export function VendorEnterpriseSignup() {
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
      businessType: "",
      businessName: "",
      companyDescription: "",
      videoTour: "",
      companyPhoto: undefined,
      companyReviewImage: undefined,
      amenities: Object.fromEntries(
        AMENITY_KEYS.map((k) => [k, false]),
      ) as Amenities,
      staff: [
        {
          photo: undefined,
          fullName: "",
          profession: "",
          experience: "",
          mobile: "",
        },
      ],
    },
  });

  const {
    fields: staffFields,
    append: appendStaff,
    remove: removeStaff,
  } = useFieldArray({
    control: form.control,
    name: "staff",
  });

  const steps = [
    {
      label: t("storeShopAddress"),
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
      label: t("chooseBusiness"),
      onValidate: () => form.trigger(["businessType"]),
    },
    {
      label: t("shopDetails"),
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
      onValidate: () =>
        form.trigger(["businessName", "companyDescription", "agree"]),
    },
    {
      label: t("photosVideos"),
      onValidate: () => form.trigger(["videoTour", "companyPhoto"]),
    },
    {
      label: t("addStaffMembers"),
      onValidate: () => form.trigger("staff"),
    },
    {
      label: t("addServices"),
      onValidate: () => form.trigger("services"),
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
            {/* Step 1: Store/Shop Address */}
            <StepperStep
              label={steps[0].label}
              onValidate={steps[0].onValidate}
            >
              <div className="space-y-4">
                {/* ...existing code for companyName, companyAddress, city, state, zipCode, yearBuild, agree... */}
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

            {/* Step 2: Choose Business */}
            <StepperStep
              label={steps[1].label}
              onValidate={steps[1].onValidate}
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => <BusinessTypeSelector {...field} />}
                />
              </div>
            </StepperStep>

            {/* Step 3: Shop Details */}
            <StepperStep
              label={steps[2].label}
              onValidate={steps[2].onValidate}
            >
              <div className="space-y-4">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="numberOfSiting"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{t("numberOfSiting")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            autoComplete="off"
                          />
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
                        <FormLabel>{t("floorNumber")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            autoComplete="off"
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
                    name="squareFeet"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>{t("squareFeet")}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            autoComplete="off"
                          />
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
                          <Input
                            {...field}
                            type="number"
                            min={1800}
                            max={3000}
                            autoComplete="off"
                          />
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {AMENITY_KEYS.map((key) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={`amenities.${key}` as const}
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
                <div>
                  <div className="rounded-md border border-input bg-background px-3 py-2 text-xs text-muted-foreground">
                    {t("shopDetailsInfoText")}
                  </div>
                </div>
              </div>
            </StepperStep>

            {/* Step 4: Listing Description */}
            <StepperStep
              label={steps[3].label}
              onValidate={steps[3].onValidate}
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
                          className="w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

            {/* Step 5: Photos & Videos */}
            <StepperStep
              label={steps[4].label}
              onValidate={steps[4].onValidate}
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
                          className="rounded-md px-3 py-2 w-full"
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

            {/* Step 6: Add Staff Members */}
            <StepperStep
              label={steps[5].label}
              onValidate={steps[5].onValidate}
            >
              <div className="space-y-8">
                {staffFields.map((staff, idx) => (
                  <div key={staff.id} className="flex flex-col gap-4">
                    {/* Staff photo upload */}
                    <div className="flex items-start justify-start">
                      <FormField
                        control={form.control}
                        name={`staff.${idx}.photo`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-center justify-center">
                            <FormLabel className="sr-only">
                              {t("addStaffPhoto")}
                            </FormLabel>
                            <FormControl>
                              <ImageInput {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 w-full">
                      <FormField
                        control={form.control}
                        name={`staff.${idx}.fullName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("staffFullName")}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete="off"
                                placeholder={t("staffFullNamePlaceholder")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`staff.${idx}.profession`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("staffProfession")}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete="off"
                                placeholder={t("staffProfessionPlaceholder")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`staff.${idx}.experience`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("staffExperience")}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete="off"
                                placeholder={t("staffExperiencePlaceholder")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`staff.${idx}.mobile`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("staffMobile")}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete="off"
                                placeholder={t("staffMobilePlaceholder")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {staffFields.length > 1 &&
                      idx !== staffFields.length - 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          className="self-center mt-2"
                          onClick={() => removeStaff(idx)}
                        >
                          <Trash2 className="w-4 h-4" />
                          {t("removeStaffMember")}
                        </Button>
                      )}
                  </div>
                ))}
                <div className="flex justify-center mt-4">
                  <Button
                    type="button"
                    className="px-8 py-3 flex items-center gap-2"
                    onClick={() =>
                      appendStaff({
                        photo: undefined,
                        fullName: "",
                        profession: "",
                        experience: "",
                        mobile: "",
                      })
                    }
                  >
                    {t("addStaffMemberButton")}
                    <PlusIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </StepperStep>

            {/* Step 7: Add Services */}
            <StepperStep
              label={steps[6].label}
              onValidate={() => form.trigger("services")}
            >
              <div className="space-y-4">
                {ALL_SERVICES.map((service, idx) => (
                  <div className="">
                    <div
                      key={service.key}
                      className="rounded-lg border border-muted-foreground bg-muted px-4 py-3 flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-base text-foreground">
                            {service.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {service.description}
                          </div>
                        </div>
                        <FormField
                          control={form.control}
                          name={`services.${idx}.selected` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    {form.watch(`services.${idx}.selected`) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 px-2">
                        <FormField
                          control={form.control}
                          name={`services.${idx}.duration` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">
                                Duration (in hours)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  min={0.1}
                                  step={0.1}
                                  className="bg-muted"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`services.${idx}.amount` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">
                                Amount
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  min={0}
                                  step={0.01}
                                  className="bg-muted"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                ))}
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
