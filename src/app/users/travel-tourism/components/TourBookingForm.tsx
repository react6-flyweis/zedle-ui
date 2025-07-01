"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { SearchBoxFeatureProperties } from "@mapbox/search-js-core/dist/searchbox/types";
import { Calendar, Plus } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import logisticTruckIcon from "@/assets/icons/logistic-truck.png";
import { MapSearchInput } from "@/components/map/MapSearchInput";
import { AnimatedInput } from "@/components/ui/animated-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type TourBookingFormProps = {
  onPickupChange: (value: SearchBoxFeatureProperties | null) => void;
  onDropoffChange: (value: SearchBoxFeatureProperties | null) => void;
  onSubmit: () => void;
};

const createTourBookingSchema = (t: (key: string) => string) =>
  z.object({
    pickupPoint: z.string().min(1, t("pickupPointRequired")),
    dropoffPoint: z.string().min(1, t("dropoffPointRequired")),
    date: z.string().min(1, t("dateRequired")),
    promoCode: z.string().optional(),
  });

export const TourBookingForm: FC<TourBookingFormProps> = ({
  onPickupChange,
  onDropoffChange,
  onSubmit,
}) => {
  const t = useTranslations("tourBooking");
  const tourBookingSchema = createTourBookingSchema(t);
  type TourBookingFormValues = z.infer<typeof tourBookingSchema>;

  const form = useForm<TourBookingFormValues>({
    resolver: zodResolver(tourBookingSchema),
    defaultValues: {
      pickupPoint: "",
      dropoffPoint: "",
      date: "",
      promoCode: "",
    },
  });

  return (
    <Card className="w-full gap-0">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Image
            src={logisticTruckIcon}
            alt={t("logisticsTruckIconAlt")}
            className="max-h-8 max-w-8"
          />
          <CardTitle className="font-medium text-lg  border-b-2 border-primary pb-1">
            {t("getDriversQuotation")}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-end gap-4"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pickup Point */}
              <FormField
                control={form.control}
                name="pickupPoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      {t("pickupPoint")}
                    </FormLabel>
                    <FormControl>
                      <MapSearchInput
                        placeholder={t("pickupPoint")}
                        {...field}
                        onChange={(value) => {
                          field.onChange(value?.full_address);
                          onPickupChange(value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Dropoff Point */}
              <FormField
                control={form.control}
                name="dropoffPoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      {t("dropoffPoint")}
                    </FormLabel>
                    <FormControl>
                      <MapSearchInput
                        {...field}
                        placeholder={t("dropoffPoint")}
                        onChange={(value) => {
                          field.onChange(value?.full_address);
                          onDropoffChange(value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">{t("date")}</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <AnimatedInput
                          {...field}
                          placeholder={t("date")}
                          className="pr-10 rounded-none"
                        />
                      </FormControl>
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button type="button" variant="ghost">
                <Plus className="h-4 w-4 mr-1" />
                {t("addPromoCode")}
              </Button>
              <Button type="submit">{t("next")}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TourBookingForm;
