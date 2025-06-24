"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Camera, Weight, Ruler } from "lucide-react";
import { PriceQuotationsDialog } from "../components/PriceQuotationDialog";

import packagesImage from "../assets/packages.jpg";

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  photos: z.array(z.instanceof(File)).optional(),
  dimensionWidth: z.string().min(1, "Width is required"),
  dimensionHeight: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  isToday: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddPackagePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showQuotationsDialog, setShowQuotationsDialog] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      photos: [],
      dimensionWidth: "",
      dimensionHeight: "",
      weight: "",
      pickupDate: "",
      pickupTime: "",
      isToday: false,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      form.setValue("photos", fileArray);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Show price quotations dialog
    setShowQuotationsDialog(true);
  };

  return (
    <div className="">
      <div
        className="h-72 bg-cover flex flex-col justify-center items-center bg-center text-white"
        style={{ backgroundImage: `url(${packagesImage.src})` }}
      >
        <h1 className="text-5xl font-bold ">Add Your Package Details</h1>
        <p className="text-xl mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="mx-auto max-w-6xl p-10">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-lg">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description related to things you move"
                        className="min-h-[100px] bg-background rounded"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photos / Videos */}
                <div className="space-y-4">
                  <FormLabel className="font-medium text-lg">
                    Photos / videos{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </FormLabel>
                  <div className="border border-dashed rounded border-border bg-background p-8 text-center hover:border-gray-300 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Camera className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload files
                      </span>
                    </label>
                    {selectedFiles.length > 0 && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        {selectedFiles.length} file(s) selected
                      </div>
                    )}
                  </div>
                </div>

                {/* Dimensions */}
                <div className="space-y-4">
                  <FormLabel className="font-medium text-lg flex items-center gap-2">
                    Dimensions of goods
                  </FormLabel>
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="dimensionWidth"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="-- - -- CM"
                                className="bg-background rounded h-14"
                                {...field}
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Ruler className="size-5 text-muted-foreground" />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dimensionHeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="-- - -- CM"
                                className="bg-background rounded h-14"
                                {...field}
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Ruler className="size-5 text-muted-foreground" />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Weight */}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-lg flex items-center gap-2">
                      Weight (kg)
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="-- - -- KG"
                          className="bg-background rounded h-14"
                          {...field}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Weight className="size-5 text-muted-foreground" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pick Up Date & Time */}
              <div className="space-y-4">
                <FormLabel className="font-medium text-lg">
                  Pick Up date & time
                </FormLabel>
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="pickupDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="date"
                              className="bg-background rounded h-14 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                              {...field}
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
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
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="time"
                              className="bg-background rounded h-14 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                              {...field}
                            />
                            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
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
                            onCheckedChange={field.onChange}
                            className="size-6 bg-background"
                          />
                        </FormControl>
                        <FormLabel className="font-medium">Today</FormLabel>
                      </div>
                      <FormDescription>
                        Request after 4 pm to be transferred for the next day
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end">
                <Button type="submit" className="w-52 h-12">
                  NEXT
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Price Quotations Dialog */}
      <PriceQuotationsDialog
        open={showQuotationsDialog}
        onOpenChange={setShowQuotationsDialog}
      />
    </div>
  );
}
