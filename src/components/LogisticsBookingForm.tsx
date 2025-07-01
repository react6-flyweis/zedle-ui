"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Plus } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import logisticTruckIcon from "@/assets/icons/logistic-truck.png";
import { AnimatedInput } from "@/components/ui/animated-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { GeoCoordinates } from "@/types/geo";
import { MapSearchInput } from "./map/MapSearchInput";

type LogisticBookingFormProps = {
  onPickupChange: (value: GeoCoordinates | null) => void;
  onDropoffChange: (value: GeoCoordinates | null) => void;
  onSubmit: () => void;
};

export function LogisticsBookingForm({
  onPickupChange,
  onDropoffChange,
  onSubmit,
}: LogisticBookingFormProps) {
  const t = useTranslations("logisticsBooking");

  const formSchema = z.object({
    pickup: z.string(),
    dropoff: z.string(),
    date: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickup: "",
      dropoff: "",
      date: "",
    },
  });

  const submitHandler = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted with data:", data);
    onSubmit();
  };

  return (
    <section className="relative z-10 mb-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          {/* Header */}
          <div className="flex mb-4">
            <div className="flex items-center gap-2 mb-3 border-b-3 border-primary pb-3">
              <Image
                src={logisticTruckIcon}
                alt={t("truckIconAlt")}
                className="max-h-8 max-w-8"
              />
              <span className="font-medium">{t("logisticsTitle")}</span>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pickup Point */}
                <FormField
                  control={form.control}
                  name="pickup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        {t("pickupLabel")}
                      </FormLabel>
                      <FormControl>
                        <MapSearchInput
                          placeholder={t("pickupLabel")}
                          {...field}
                          onChange={(value) => {
                            field.onChange(value?.full_address);
                            onPickupChange(value?.coordinates || null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Dropoff Point */}
                <FormField
                  control={form.control}
                  name="dropoff"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        {t("dropoffLabel")}
                      </FormLabel>
                      <FormControl>
                        <MapSearchInput
                          placeholder={t("dropoffLabel")}
                          {...field}
                          onChange={(value) => {
                            field.onChange(value?.full_address);
                            onDropoffChange(value?.coordinates || null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        {t("dateLabel")}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <AnimatedInput
                            type="text"
                            placeholder={t("dateLabel")}
                            className="pr-10 rounded-none"
                            {...field}
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Action Buttons */}
              <div className="w-full flex justify-end gap-2 mt-4">
                <Button variant="ghost" type="button">
                  <Plus className="h-4 w-4 mr-1" />
                  {t("addPromoCode")}
                </Button>
                <Button type="submit">{t("searchVehicles")}</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
