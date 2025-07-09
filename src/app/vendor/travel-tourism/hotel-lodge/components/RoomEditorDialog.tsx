"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roomSchema = z.object({
  roomType: z.string().min(1),
  roomNumber: z.string().min(1),
  floorNumber: z.string().min(1),
  width: z.string().min(1),
  length: z.string().min(1),
  price: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.any()).optional(),
});

type RoomFormValues = z.infer<typeof roomSchema>;

const AMENITIES = [
  "cable",
  "internet",
  "satelliteTV",
  "electricity",
  "pool",
  "fireplace",
  "fireExit",
  "alarmSystem",
  "food",
  "bathroom",
];

const ROOM_TYPES = [
  { value: "singleRoom", label: "singleRoom" },
  { value: "doubleRoom", label: "doubleRoom" },
  { value: "twinRoom", label: "twinRoom" },
  { value: "suiteRoom", label: "suiteRoom" },
  { value: "deluxeRoom", label: "deluxeRoom" },
];

interface RoomEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RoomFormValues) => void;
}

export function RoomEditorDialog({
  open,
  onOpenChange,
  onSubmit,
}: RoomEditorDialogProps) {
  const t = useTranslations("roomEditor");
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      amenities: [],
      images: [],
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl p-5 max-h-[75vh] flex flex-col">
        <DialogHeader className="">
          <DialogTitle className="text-2xl font-semibold">
            {t("addRoomTitle")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t("addRoomSubtitle")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 h-full min-h-0"
          >
            <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1">
              <FormField
                control={form.control}
                name="roomType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("roomType")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="roomType" className="w-full">
                          <SelectValue placeholder={t("selectRoomType")} />
                        </SelectTrigger>
                        <SelectContent>
                          {ROOM_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {t(type.label)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("roomNumber")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("roomNumberPlaceholder")}
                          {...field}
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
                    <FormItem>
                      <FormLabel>{t("floorNumber")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("floorNumberPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("width")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("widthPlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("length")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("lengthPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("price")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("pricePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amenities"
                render={() => (
                  <FormItem>
                    <FormLabel>{t("amenities")}</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-2">
                        {AMENITIES.map((amenity) => {
                          const checkboxId = `amenity-${amenity}`;
                          return (
                            <div
                              key={amenity}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Checkbox
                                id={checkboxId}
                                checked={
                                  !!form.watch("amenities")?.includes(amenity)
                                }
                                onCheckedChange={() => {
                                  const current =
                                    form.getValues("amenities") || [];
                                  if (current.includes(amenity)) {
                                    form.setValue(
                                      "amenities",
                                      current.filter((a) => a !== amenity),
                                    );
                                  } else {
                                    form.setValue("amenities", [
                                      ...current,
                                      amenity,
                                    ]);
                                  }
                                }}
                              />
                              <label htmlFor={checkboxId}>{t(amenity)}</label>
                            </div>
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
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>{t("roomImages")}</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        {[0, 1, 2, 3, 4, 5].map((idx) => {
                          const inputId = `room-image-${idx}`;
                          const images = form.watch("images") || [];
                          return (
                            <label
                              key={idx}
                              htmlFor={inputId}
                              className="w-14 h-14 border-2 border-dashed rounded flex items-center justify-center cursor-pointer bg-muted"
                            >
                              {images[idx] ? (
                                <Image
                                  src={URL.createObjectURL(images[idx])}
                                  alt="room image"
                                  width={56}
                                  height={56}
                                  className="object-cover rounded"
                                />
                              ) : (
                                <span className="text-2xl text-muted-foreground">
                                  +
                                </span>
                              )}
                              <input
                                id={inputId}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const files = e.target.files;
                                  if (files?.[0]) {
                                    const newImages = [...images];
                                    newImages[idx] = files[0];
                                    form.setValue("images", newImages);
                                  }
                                }}
                              />
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
            <div className="bg-white border-t border-gray-100 mb-2 pt-4 shrink-0">
              <Button
                type="submit"
                className="w-full rounded-full bg-primary text-white"
              >
                {t("add")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
