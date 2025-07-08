"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import dimensionIcon from "@/assets/icons/dimension.png";
import weightIcon from "@/assets/icons/weight.png";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendQuoteDialog } from "./SendQuoteDialog";

const packageDetailsSchema = z.object({
  pickupPoint: z.string().min(1),
  dropPoint: z.string().min(1),
  description: z.string().min(1),
  dimensions1: z.string().min(1),
  dimensions2: z.string().min(1),
  weight: z.string().min(1),
  pickupDate: z.string().min(1),
  pickupTime: z.string().min(1),
  isToday: z.boolean().optional(),
});

type PackageDetailsFormValues = z.infer<typeof packageDetailsSchema>;

export function PackageDetailsForm() {
  const data = {
    date: "8 May 2025, Mon",
    pickup: "1901 Thornridge Cir. Shiloh, Hawaii",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    weight: "80 : 20 KG",
    pickupDate: "22 / 12 / 2024",
    pickupTime: "04 : 30 PM",
    pickupPoint: "1901 Thornridge Cir. Shiloh, Hawaii",
    dropPoint: "2464 Royal Ln. Mesa, New Jersey",
    dimension1: "60",
    dimension2: "60",
    customer: "Chance Septimus",
    phone: "+1 9876543210",
    paymentMethod: "Cash",
    status: "Pending",
    isToday: true,
  };

  const t = useTranslations("packageForm");
  const form = useForm<PackageDetailsFormValues>({
    resolver: zodResolver(packageDetailsSchema),
    defaultValues: {
      pickupPoint: data.pickupPoint,
      dropPoint: data.dropPoint,
      description: data.description,
      dimensions1: data.dimension1,
      dimensions2: data.dimension2,
      weight: data.weight,
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
      isToday: data.isToday,
    },
  });

  function onSubmit(_data: PackageDetailsFormValues) {}

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Pickup Point */}
          <FormField
            control={form.control}
            name="pickupPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-muted-foreground">
                  {t("pickupPoint")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-background rounded h-14"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Drop Point */}
          <FormField
            control={form.control}
            name="dropPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-muted-foreground">
                  {t("dropPoint")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-background rounded h-14"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-muted-foreground">
                  {t("description")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="bg-background rounded min-h-[100px]"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Photos / videos & Dimensions */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="">
              <FormLabel className="text-lg text-muted-foreground">
                {t("photosVideos")}
              </FormLabel>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="col-span-2 overflow-hidden rounded">
                  <Image
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                    alt="Goods 1"
                    width={200}
                    height={200}
                    className="object-cover w-full h-[7.5rem]"
                  />
                </div>
                <div className="overflow-hidden rounded">
                  <Image
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
                    alt="Goods 2"
                    width={200}
                    height={200}
                    className="object-cover w-full h-[7.5rem]"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <FormLabel className="text-lg text-muted-foreground">
                {t("dimensionsOfGoods")}
              </FormLabel>
              <FormField
                control={form.control}
                name="dimensions1"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="bg-background rounded h-14 pr-10"
                          readOnly
                        />
                        <Image
                          src={dimensionIcon}
                          alt="Dimension Icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 max-h-6 max-w-6 text-muted-foreground rotate-90"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dimensions2"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="bg-background rounded h-14 pr-10"
                          readOnly
                        />
                        <Image
                          src={dimensionIcon}
                          alt="Dimension Icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 max-h-6 max-w-6 text-muted-foreground"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Weight */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-muted-foreground">
                  {t("weight")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className="bg-background rounded h-14 pr-10"
                      readOnly
                    />
                    <Image
                      src={weightIcon}
                      alt="Weight Icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 max-h-6 max-w-6 text-muted-foreground"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Pick Up date & time */}
          <div className="space-y-2">
            <FormLabel className="text-lg text-muted-foreground">
              {t("PickupDateAndTime")}
            </FormLabel>
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg text-muted-foreground sr-only">
                    {t("pickupDate")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="bg-background rounded h-14 pr-10"
                        readOnly
                      />
                      <CalendarDaysIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg text-muted-foreground sr-only">
                    {t("pickupTime")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="bg-background rounded h-14 pr-10"
                        readOnly
                      />
                      <ClockIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Today Checkbox */}
          <FormField
            control={form.control}
            name="isToday"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-3 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      className="size-6 bg-background"
                    />
                  </FormControl>
                  <FormLabel className="font-medium">{t("isToday")}</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex justify-end mt-5">
        <SendQuoteDialog orderDetails={data}>
          <Button className="w-52 rounded-md h-14">{t("makeAQuote")}</Button>
        </SendQuoteDialog>
      </div>
    </div>
  );
}
