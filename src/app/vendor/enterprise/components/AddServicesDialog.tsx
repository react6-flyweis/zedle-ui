"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { IUser } from "@/types/user";

const addServiceSchema = z.object({
  serviceName: z.string().min(1),
  duration: z.string().min(1),
  price: z.string().min(1),
  details: z.string().optional(),
  amenities: z.array(z.string()).optional(),
});

type AddServiceFormValues = z.infer<typeof addServiceSchema>;

interface AddServicesDialogProps {
  client: IUser;
  children: React.ReactNode;
}

export function AddServicesDialog({
  client,
  children,
}: AddServicesDialogProps) {
  const t = useTranslations("addServices");
  const [open, setOpen] = useState(false);

  const amenitiesList = [
    { key: "cable", label: t("amenities.cable") },
    { key: "internet", label: t("amenities.internet") },
    { key: "electricity", label: t("amenities.electricity") },
    { key: "satelliteTv", label: t("amenities.satelliteTv") },
    { key: "dryer", label: t("amenities.dryer") },
    { key: "fireplace", label: t("amenities.fireplace") },
    { key: "laundryHookups", label: t("amenities.laundryHookups") },
    { key: "alarmSystem", label: t("amenities.alarmSystem") },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<AddServiceFormValues>({
    resolver: zodResolver(addServiceSchema),
    defaultValues: { amenities: [] },
  });
  const selectedAmenities = watch("amenities") || [];

  const onSubmit = (_data: AddServiceFormValues) => {
    // handle submit
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl h-[520px] max-h-[90vh] flex flex-col overflow-hidden bg-background">
        <DialogHeader className="gap-1 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-primary">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-secondary flex-shrink-0">
                <Image
                  src={client.image}
                  alt={client.name}
                  width={56}
                  height={56}
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
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 text-foreground"
                htmlFor="serviceName"
              >
                {t("serviceName")}
              </label>
              <Input
                id="serviceName"
                placeholder={t("serviceNamePlaceholder")}
                {...register("serviceName")}
                aria-invalid={!!errors.serviceName}
              />
              {errors.serviceName && (
                <span className="text-xs text-destructive">
                  {t("required")}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-foreground"
                  htmlFor="duration"
                >
                  {t("duration")}
                </label>
                <Input
                  id="duration"
                  placeholder={t("durationPlaceholder")}
                  {...register("duration")}
                  aria-invalid={!!errors.duration}
                />
                {errors.duration && (
                  <span className="text-xs text-destructive">
                    {t("required")}
                  </span>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-foreground"
                  htmlFor="price"
                >
                  {t("price")}
                </label>
                <Input
                  id="price"
                  placeholder={t("pricePlaceholder")}
                  {...register("price")}
                  aria-invalid={!!errors.price}
                />
                {errors.price && (
                  <span className="text-xs text-destructive">
                    {t("required")}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 text-foreground"
                htmlFor="details"
              >
                {t("details")}
                <span className="text-xs text-muted-foreground ml-1">
                  {t("optional")}
                </span>
              </label>
              <Textarea
                id="details"
                placeholder={t("detailsPlaceholder")}
                {...register("details")}
                aria-invalid={!!errors.details}
                className="resize-none min-h-[60px]"
              />
            </div>
            <div className="mb-2">
              <div className="font-medium text-sm mb-1 text-foreground">
                {t("amenities.title")}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {amenitiesList.map((amenity) => (
                  <label
                    key={amenity.key}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      value={amenity.key}
                      checked={selectedAmenities.includes(amenity.key)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        let updated = [...selectedAmenities];
                        if (checked) {
                          updated.push(amenity.key);
                        } else {
                          updated = updated.filter((a) => a !== amenity.key);
                        }
                        setValue("amenities", updated, {
                          shouldValidate: true,
                        });
                      }}
                      className="accent-primary w-4 h-4 rounded border-gray-300"
                    />
                    <span>{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-full bg-primary text-primary-foreground text-lg font-semibold mt-2 flex-shrink-0"
          >
            {t("send")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
