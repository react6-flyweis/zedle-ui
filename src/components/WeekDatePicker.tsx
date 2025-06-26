"use client";

import {
  addDays,
  endOfToday,
  format,
  isAfter,
  isBefore,
  startOfWeek,
  subDays,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type WeekDatePickerProps = {
  value?: Date | string | undefined;
  onChange?: (date: Date) => void;
  pastDates?: boolean;
  futureDates?: boolean;
};

export const WeekDatePicker = ({
  value,
  onChange,
  pastDates = true,
  futureDates = true,
}: WeekDatePickerProps) => {
  const today = new Date();

  const initialDate = value ? new Date(value) : today;
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [weekStart, setWeekStart] = useState(
    startOfWeek(initialDate, { weekStartsOn: 0 }),
  );

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const isSelected = (day: Date) =>
    day.toDateString() === selectedDate.toDateString();

  const isDisabled = (day: Date) =>
    (!pastDates && isBefore(day, today)) ||
    (!futureDates && isAfter(day, endOfToday()));

  const handleSelect = (day: Date) => {
    if (isDisabled(day)) return;
    setSelectedDate(day);
    onChange?.(day);
  };

  return (
    <Card className="p-4 w-full rounded shadow-none border gap-5">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-primary text-lg">
          {format(selectedDate, "dd MMMM")}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded"
            onClick={() => setWeekStart(subDays(weekStart, 7))}
          >
            <ChevronLeft className="h-4 w-4 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setWeekStart(addDays(weekStart, 7))}
          >
            <ChevronRight className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day) => {
          const selected = isSelected(day);
          const disabled = isDisabled(day);
          return (
            <Button
              variant={selected ? "default" : "ghost"}
              className={`h-auto rounded text-sm shadow-none border-none flex-col  ${
                selected ? "" : "text-primary"
              }`}
              onClick={() => !disabled && handleSelect(day)}
              disabled={disabled}
              tabIndex={-1}
              type="button"
            >
              <span
                className={cn(
                  selected ? "text-white" : "text-muted-foreground",
                )}
              >
                {format(day, "E").charAt(0)}
              </span>

              <span>{format(day, "d")}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};
