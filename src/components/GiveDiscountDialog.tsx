"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { type PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/store/toastStore";
import type { IUser } from "@/types/user";

const discountSchema = z.object({
  offerName: z.string().min(1),
  couponCode: z.string().min(1),
  discountType: z.enum(["flat", "percentage"]),
  flatAmount: z.string().optional(),
  percentageAmount: z.string().optional(),
  maxDiscount: z.string().optional(),
  startDate: z.string().min(1),
  startTime: z.string().min(1),
  endDate: z.string().min(1),
  endTime: z.string().min(1),
  lifetime: z.boolean().optional(),
});

type DiscountFormValues = z.infer<typeof discountSchema>;

interface GiveDiscountDialogProps {
  client: IUser;
}

export function GiveDiscountDialog({
  client,
  children,
}: PropsWithChildren<GiveDiscountDialogProps>) {
  const t = useTranslations("giveDiscount");
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      discountType: "flat",
      lifetime: false,
    },
  });
  const discountType = watch("discountType");
  const lifetime = watch("lifetime");

  const onSubmit = () => {
    // handle submit
    setOpen(false);
    toast(t("successToast"));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg rounded-2xl max-h-[90vh] md:max-h-[70vh] flex flex-col overflow-hidden">
        <DialogHeader className="gap-1 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-primary">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={client.image}
                  alt={client.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-lg text-primary truncate">
                  {client.name}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {t("phoneLabel", { phone: client.phone })}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {t("emailLabel", { email: client.email })}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="offerName"
                >
                  {t("offerName")}
                </label>
                <Input
                  id="offerName"
                  placeholder={t("offerNamePlaceholder")}
                  {...register("offerName")}
                  aria-invalid={!!errors.offerName}
                />
                {errors.offerName && (
                  <span className="text-xs text-destructive">
                    {t("required")}
                  </span>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="couponCode"
                >
                  {t("couponCode")}
                </label>
                <Input
                  id="couponCode"
                  placeholder={t("couponCodePlaceholder")}
                  {...register("couponCode")}
                  aria-invalid={!!errors.couponCode}
                />
                {errors.couponCode && (
                  <span className="text-xs text-destructive">
                    {t("required")}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <span className="block text-sm font-medium mb-2">
                {t("discountType")}
              </span>
              <RadioGroup
                className="flex gap-8 mb-2"
                defaultValue="flat"
                {...register("discountType")}
                onValueChange={(val) =>
                  setValue("discountType", val as "flat" | "percentage")
                }
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="flat" id="flat" />
                  <label
                    htmlFor="flat"
                    className="text-base font-medium cursor-pointer"
                  >
                    {t("flatDiscount")}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <label
                    htmlFor="percentage"
                    className="text-base font-medium cursor-pointer"
                  >
                    {t("percentageDiscount")}
                  </label>
                </div>
              </RadioGroup>
              {discountType === "flat" ? (
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="flatAmount"
                  >
                    {t("flatAmount")}
                  </label>
                  <Input
                    id="flatAmount"
                    placeholder={t("flatAmountPlaceholder")}
                    {...register("flatAmount")}
                    aria-invalid={!!errors.flatAmount}
                  />
                  {errors.flatAmount && (
                    <span className="text-xs text-destructive">
                      {t("required")}
                    </span>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="percentageAmount"
                    >
                      {t("percentageAmount")}
                    </label>
                    <Input
                      id="percentageAmount"
                      placeholder={t("percentageAmountPlaceholder")}
                      {...register("percentageAmount")}
                      aria-invalid={!!errors.percentageAmount}
                    />
                    {errors.percentageAmount && (
                      <span className="text-xs text-destructive">
                        {t("required")}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="maxDiscount"
                    >
                      {t("maxDiscount")}
                    </label>
                    <Input
                      id="maxDiscount"
                      placeholder={t("maxDiscountPlaceholder")}
                      {...register("maxDiscount")}
                      aria-invalid={!!errors.maxDiscount}
                    />
                    {errors.maxDiscount && (
                      <span className="text-xs text-destructive">
                        {t("required")}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="startDate"
                >
                  {t("startDate")}
                </label>
                <Input
                  id="startDate"
                  type="date"
                  placeholder="DD/MM/YYYY"
                  {...register("startDate")}
                  aria-invalid={!!errors.startDate}
                  disabled={lifetime}
                />
                {errors.startDate && (
                  <span className="text-xs text-destructive">
                    {t("required")}
                  </span>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="startTime"
                >
                  {t("startTime")}
                </label>
                <Input
                  id="startTime"
                  type="time"
                  placeholder="00:00"
                  {...register("startTime")}
                  aria-invalid={!!errors.startTime}
                  disabled={lifetime}
                />
                {errors.startTime && (
                  <span className="text-xs text-destructive">
                    {t("required")}
                  </span>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="endDate"
                >
                  {t("endDate")}
                </label>
                <Input
                  id="endDate"
                  type="date"
                  placeholder="DD/MM/YYYY"
                  {...register("endDate")}
                  aria-invalid={!!errors.endDate}
                  disabled={lifetime}
                />
                {errors.endDate && (
                  <span className="text-xs text-destructive">
                    {t("required")}
                  </span>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="endTime"
                >
                  {t("endTime")}
                </label>
                <Input
                  id="endTime"
                  type="time"
                  placeholder="00:00"
                  {...register("endTime")}
                  aria-invalid={!!errors.endTime}
                  disabled={lifetime}
                />
                {errors.endTime && (
                  <span className="text-xs text-destructive">
                    {t("required")}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <Checkbox
                id="lifetime"
                checked={lifetime}
                onCheckedChange={(checked) => setValue("lifetime", !!checked)}
              />
              <label
                htmlFor="lifetime"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {t("lifetime")}
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-full bg-primary text-primary-foreground text-lg font-semibold mt-2 flex-shrink-0"
          >
            {t("send")}
          </Button>
        </form>
        <DialogClose asChild>
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            aria-label="Close"
          >
            <span aria-hidden>×</span>
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
