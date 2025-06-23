"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { StarIcon, XIcon } from "lucide-react";

interface RateOrderDialogProps {
  children: React.ReactNode;
  orderId: string;
}

const formSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  description: z.string().min(1, "Please enter a description"),
  title: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function RateOrderDialog({ children, orderId }: RateOrderDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      description: "",
      title: "",
    },
  });

  const watchedRating = form.watch("rating");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Handle rating submission logic here
    console.log("Rating order:", {
      orderId,
      ...data,
    });

    setIsSubmitting(false);
    setOpen(false);

    // Reset form
    form.reset();
  };

  const handleStarClick = (rating: number) => {
    form.setValue("rating", rating);
  };

  const handleStarHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const getStarColor = (starIndex: number) => {
    const currentRating = hoveredRating || watchedRating;
    return starIndex <= currentRating
      ? "fill-yellow-400 text-yellow-400"
      : "fill-gray-300 text-gray-300";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 gap-0">
        <DialogHeader className="p-6 pb-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full w-8 h-8 bg-black text-white hover:bg-gray-800"
            onClick={() => setOpen(false)}
          >
            <XIcon className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Rate your order
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="px-6 space-y-6">
              {/* Star Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="size-8 transition-colors hover:scale-110"
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => handleStarHover(star)}
                            onMouseLeave={handleStarLeave}
                          >
                            <StarIcon
                              className={`w-full h-full ${getStarColor(star)}`}
                            />
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Review Section */}
              <div className="">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Review your order
                </h3>

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
                  name="title"
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

            <div className="p-6 pt-0 flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="font-medium py-3 rounded-xl"
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
