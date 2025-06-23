"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";

interface CancelOrderDialogProps {
  children: React.ReactNode;
  orderId: string;
}

const formSchema = z.object({
  reason: z.string().min(1, "Please select a reason for cancellation"),
  description: z.string().optional(),
  reviewNote: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const cancellationReasons = [
  "Order Delay",
  "Wrong Items Selected",
  "Change of Plans",
  "Payment Issues",
  "Poor Reviews or Doubts",
  "Other Reason",
];

export function CancelOrderDialog({
  children,
  orderId,
}: CancelOrderDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      description: "",
      reviewNote: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Handle cancellation logic here
    console.log("Cancelling order:", {
      orderId,
      ...data,
    });

    setIsSubmitting(false);
    setOpen(false);

    // Reset form
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-foreground">
            Cancel This Order
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="px-6 py-4 space-y-6">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Reason for the cancellation
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="select a reason..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cancellationReasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <label
                            htmlFor="rate-order-description"
                            className="absolute top-1 left-2 px-1 text-sm"
                          >
                            Description
                          </label>
                          <Textarea
                            id="rate-order-description"
                            placeholder="Description"
                            className="min-h-[100px] resize-none text-sm border-gray-300 rounded-md pt-5 rounded-b-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reviewNote"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <label
                            htmlFor="rate-order-title"
                            className="absolute top-1 left-2 px-1 text-sm"
                          >
                            Title (optional)
                          </label>
                          <Input
                            id="rate-order-title"
                            placeholder="Review title..."
                            className="text-sm h-14 border-gray-300 rounded-md pt-5 rounded-t-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="p-6 pt-0">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-medium py-3 rounded-lg"
              >
                {isSubmitting ? "CANCELLING..." : "CANCEL THIS BOOKING"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
