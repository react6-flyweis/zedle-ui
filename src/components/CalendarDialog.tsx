"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CalendarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectDate: (date?: Date) => void;
}

export function CalendarDialog({
  open,
  onOpenChange,
  onSelectDate,
}: CalendarDialogProps) {
  const t = useTranslations();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(date || new Date());

  const handleContinue = () => {
    onSelectDate(date);
    onOpenChange(false);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0" showCloseButton={false}>
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handlePreviousMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 pt-0">
          <Calendar
            mode="single"
            hideNavigation
            components={{
              MonthCaption: () => <></>,
            }}
            selected={date}
            showOutsideDays={false}
            onSelect={setDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="p-0 w-full"
            disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </div>
        <DialogFooter className="p-6 pt-0">
          <Button
            onClick={handleContinue}
            className="w-full bg-black text-white h-12 hover:bg-black/90"
          >
            {t("actions.continue")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
