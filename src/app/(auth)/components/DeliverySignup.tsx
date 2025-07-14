"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "lucide-react";
import Image from "next/image";
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
import { toast } from "@/store/toastStore";

import uploadIcon from "../assets/upload.png";
import { GenderSelector } from "./GenderSelector";

const deliverySignupSchema = z
  .object({
    gender: z.enum(["male", "female"], {
      required_error: "required",
    }),
    firstName: z.string().min(1, "required"),
    lastName: z.string().min(1, "required"),
    dateOfBirth: z.string().min(1, "required"),
    houseNo: z.string().min(1, "required"),
    streetArea: z.string().min(1, "required"),
    city: z.string().min(1, "required"),
    state: z.string().min(1, "required"),
    zipCode: z.string().min(1, "required"),
    landmark: z.string().optional(),
    vehicleManufacturer: z.string().min(1, "required"),
    carNumber: z.string().min(1, "required"),
    vehicleModel: z.string().min(1, "required"),
    vehicleManufacturerYear: z.string().min(1, "required"),
    vehiclePhotos: z.any().optional(),
    bankName: z.string().min(1, "required"),
    branch: z.string().min(1, "required"),
    accountHolderName: z.string().min(1, "required"),
    ifscCode: z.string().min(1, "required"),
    accountNumber: z.string().min(1, "required"),
    reEnterAccountNumber: z.string().min(1, "required"),
    nationalIdFront: z.any().optional(),
    nationalIdBack: z.any().optional(),
    drivingLicenseFront: z.any().optional(),
    drivingLicenseBack: z.any().optional(),
    passbookFront: z.any().optional(),
    passbookBack: z.any().optional(),
    passportFront: z.any().optional(),
    passportBack: z.any().optional(),
    agree: z.literal(true, {
      errorMap: () => ({ message: "mustAgree" }),
    }),
  })
  .refine((data) => data.accountNumber === data.reEnterAccountNumber, {
    message: "Account numbers must match",
    path: ["reEnterAccountNumber"],
  });

type DeliverySignupFormValues = z.infer<typeof deliverySignupSchema>;

export function DeliverySignup() {
  const t = useTranslations("deliverySignup");
  const router = useRouter();

  const form = useForm<DeliverySignupFormValues>({
    resolver: zodResolver(deliverySignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      houseNo: "",
      streetArea: "",
      city: "",
      state: "",
      zipCode: "",
      landmark: "",
      vehicleManufacturer: "",
      carNumber: "",
      vehicleModel: "",
      vehicleManufacturerYear: "",
      bankName: "",
      branch: "",
      accountHolderName: "",
      ifscCode: "",
      accountNumber: "",
      reEnterAccountNumber: "",
    },
  });

  const steps = [
    {
      label: t("profileDetails"),
      onValidate: () =>
        form.trigger([
          "gender",
          "firstName",
          "lastName",
          "dateOfBirth",
          "agree",
        ]),
    },
    {
      label: t("addressDetails"),
      onValidate: () =>
        form.trigger([
          "houseNo",
          "streetArea",
          "city",
          "state",
          "zipCode",
          "landmark",
        ]),
    },
    {
      label: t("vehicleDetail"),
      onValidate: () =>
        form.trigger([
          "vehicleManufacturer",
          "carNumber",
          "vehicleModel",
          "vehicleManufacturerYear",
        ]),
    },
    {
      label: t("addBankDetails"),
      onValidate: () =>
        form.trigger([
          "bankName",
          "branch",
          "accountHolderName",
          "ifscCode",
          "accountNumber",
          "reEnterAccountNumber",
        ]),
    },
    {
      label: t("submitDocuments"),
      onValidate: () => Promise.resolve(true),
    },
  ];

  const onSubmit = (_data: DeliverySignupFormValues) => {
    // TODO: handle submit
    toast(t("accountCreatedSuccess"));
    router.push("/delivery-partner/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stepper indicatorStyle="line">
          {/* Step 1: Profile Details */}
          <StepperStep label={steps[0].label} onValidate={steps[0].onValidate}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <GenderSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("firstName")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="given-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("lastName")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="family-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("dateOfBirth")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="date"
                          className="pr-10"
                          autoComplete="bday"
                        />
                        <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-xs font-normal">
                        {t("byCreatingAccount")}{" "}
                        <Link href="/terms" className="text-primary underline">
                          {t("termsOfUse")}
                        </Link>{" "}
                        {t("and")}{" "}
                        <Link
                          href="/privacy"
                          className="text-primary underline"
                        >
                          {t("privacyPolicy")}
                        </Link>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </StepperStep>

          {/* Step 2: Address Details */}
          <StepperStep label={steps[1].label} onValidate={steps[1].onValidate}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="houseNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("houseNo")}</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="address-line1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("streetArea")}</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="address-line2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("city")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="address-level2" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("state")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="address-level1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("zipCode")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="postal-code" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landmark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("landmark")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </StepperStep>

          {/* Step 3: Vehicle Details */}
          <StepperStep label={steps[2].label} onValidate={steps[2].onValidate}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vehicleManufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("vehicleManufacturer")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="carNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("carNumber")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vehicleModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("vehicleModel")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleManufacturerYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("vehicleManufacturerYear")}</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="1900" max="2024" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="vehiclePhotos"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>{t("attachPhotosVehicle")}</FormLabel>
                    <FormControl>
                      <ImageInput
                        {...rest}
                        value={value}
                        onChange={onChange}
                        multiple
                        maxFiles={4}
                        className="h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </StepperStep>

          {/* Step 4: Bank Details */}
          <StepperStep label={steps[3].label} onValidate={steps[3].onValidate}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("enterBankName")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("branch")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="accountHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("accountHolderName")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ifscCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("ifscCode")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("accountNumber")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reEnterAccountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("reEnterAccountNumber")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </StepperStep>

          {/* Step 5: Submit Documents */}
          <StepperStep label={steps[4].label} onValidate={steps[4].onValidate}>
            <div className="space-y-6">
              {[
                {
                  title: t("nationalIdCardDetails"),
                  fields: [
                    { name: "nationalIdFront", label: t("frontSide") },
                    { name: "nationalIdBack", label: t("backSide") },
                  ],
                },
                {
                  title: t("drivingLicenseDetails"),
                  fields: [
                    { name: "drivingLicenseFront", label: t("frontSide") },
                    { name: "drivingLicenseBack", label: t("backSide") },
                  ],
                },
                {
                  title: t("passbookDetails"),
                  fields: [
                    { name: "passbookFront", label: t("frontSide") },
                    { name: "passbookBack", label: t("backSide") },
                  ],
                },
                {
                  title: `${t("passportDetails")} (${t("optional")})`,
                  fields: [
                    { name: "passportFront", label: t("frontSide") },
                    { name: "passportBack", label: t("backSide") },
                  ],
                },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-medium mb-2">{section.title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {section.fields.map((field) => (
                      <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name as keyof DeliverySignupFormValues}
                        render={({ field: { onChange } }) => (
                          <FormItem>
                            <FormControl>
                              <label className="flex w-full cursor-pointer items-center border border-gray-300 rounded-md px-4 py-3 bg-transparent hover:bg-muted transition relative">
                                <Image
                                  src={uploadIcon}
                                  alt="Upload Icon"
                                  className="mr-3 h-5 w-5 text-muted-foreground"
                                />
                                <span className="text-sm text-muted-foreground font-semibold">
                                  {field.label}
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    onChange(e.target.files?.[0])
                                  }
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  tabIndex={-1}
                                />
                              </label>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
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
                <Button
                  type={isLastStep ? "submit" : "button"}
                  className="flex-1 bg-primary text-primary-foreground rounded-full py-3"
                >
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
