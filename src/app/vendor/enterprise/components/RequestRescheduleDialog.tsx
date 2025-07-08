"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { createRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "@/store/toastStore";

const formSchema = z.object({
  description: z.string().min(5, "Description is required"),
  date: z.string(),
  time: z.string(),
});

const periods = ["Morning", "Afternoon", "Evening"];

function generateTimeSlots() {
  // 10:30 AM - 8:30 PM, 30 min interval
  const slots = [];
  let hour = 10,
    minute = 30;
  while (hour < 21 || (hour === 20 && minute <= 30)) {
    const label = `${(hour % 12 || 12).toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}${hour < 12 ? " AM" : " PM"}`;
    const value = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    let period = "Morning";
    // Morning: 10:30 AM - 1:00 PM
    // Afternoon: 1:30 PM - 5:30 PM
    // Evening: 6:00 PM - 8:30 PM
    if (hour > 13 || (hour === 13 && minute >= 30)) period = "Afternoon";
    if (hour >= 18) period = "Evening";
    slots.push({ label, value, period });
    minute += 30;
    if (minute >= 60) {
      minute = 0;
      hour++;
    }
  }
  return slots;
}

const timeSlots = generateTimeSlots();

function getNextDays(count: number) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
      }),
      value: date.toISOString().split("T")[0],
    });
  }
  return days;
}

export function RequestRescheduleDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("rescheduleDialog");
  const days = getNextDays(14);
  const [selectedDate, setSelectedDate] = useState(days[0].value);
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0].value);
  const timeSlotRefs = {} as Record<string, React.RefObject<HTMLButtonElement>>;
  timeSlots.forEach((slot) => {
    timeSlotRefs[slot.value] =
      timeSlotRefs[slot.value] ||
      (typeof window !== "undefined" ? createRef() : null);
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      date: days[0].value,
      time: selectedTime,
    },
    mode: "onChange",
  });

  function onSubmit() {
    // handle submit
    // e.g. send to API
    toast("Your Reschedule Request Has Been Sent Successfully.");
    onOpenChange(false);
  }

  // Scroll to first slot of period
  function scrollToPeriod(period: string) {
    setSelectedPeriod(period);
    let targetTime = "";

    // Define specific times to scroll to for each period
    if (period === "Morning") {
      targetTime = "10:30"; // First morning slot
    } else if (period === "Afternoon") {
      targetTime = "13:30"; // 1:30 PM - first afternoon slot
    } else if (period === "Evening") {
      targetTime = "18:00"; // 6:00 PM - first evening slot
    }

    if (targetTime && timeSlotRefs[targetTime]?.current) {
      timeSlotRefs[targetTime].current.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-5 max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-lg font-bold">
            {t("requestRescheduleTitle")}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="font-semibold text-base mb-1 mt-2">
            {t("whyReschedule")}
          </div>
          <div className="text-sm text-muted-foreground mb-3">
            {t("whyRescheduleDesc")}
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="min-h-[80px] resize-none w-full"
                        placeholder={t("enterDescription")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3">
                <div className="font-semibold text-base">
                  {t("suggestedDateTime")}
                </div>
                <ScrollArea type="auto" className="w-full pb-3">
                  <div className="flex gap-3 select-none px-1">
                    {days.map((d) => (
                      <Button
                        key={d.value}
                        type="button"
                        variant="outline"
                        className="flex flex-col items-center py-3 flex-shrink-0 w-18 h-20 rounded bg-background hover:bg-muted"
                        onClick={() => {
                          setSelectedDate(d.value);
                          form.setValue("date", d.value);
                        }}
                      >
                        <span
                          className={cn("text-lg font-bold", {
                            "text-primary": selectedDate === d.value,
                          })}
                        >
                          {d.label.split(" ")[1]}
                        </span>
                        <span
                          className={cn("font-medium pb-1", {
                            "text-primary border-b-2 border-primary":
                              selectedDate === d.value,
                          })}
                        >
                          {d.label.split(" ")[0]}
                        </span>
                      </Button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className="grid grid-cols-3 gap-2 bg-gray-100 rounded-xl p-1">
                  {periods.map((period) => (
                    <button
                      key={period}
                      type="button"
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${selectedPeriod === period ? "bg-white shadow text-black" : "bg-transparent text-gray-500"}`}
                      onClick={() => scrollToPeriod(period)}
                    >
                      {t(period.toLowerCase())}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.value}
                      ref={timeSlotRefs[slot.value]}
                      type="button"
                      variant={
                        selectedTime === slot.value ? "default" : "outline"
                      }
                      className="bg-gray-100 text-black font-medium rounded-xl px-3 py-2 shadow-none border-none flex-shrink-0 text-sm"
                      onClick={() => {
                        setSelectedTime(slot.value);
                        form.setValue("time", slot.value);
                      }}
                    >
                      {slot.label}
                    </Button>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full rounded-full h-12 ">
                {t("send")}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
