"use client";

import { AlertTriangle, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HavingIssueDialog } from "./HavingIssueDialog";
import MessagesDialog from "./MessagesDialog";

interface StepData {
  label: string;
  address: string;
  buttonText: string;
  time?: string;
  step: number;
}

export const StepRouteCard = ({
  stepData,
  onNextStep,
}: {
  stepData: StepData;
  onNextStep: () => void;
}) => {
  const t = useTranslations("route");
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-lg text-primary">
              {stepData.label}
            </span>
            {stepData.time && (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {stepData.time}
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground leading-tight mb-2">
            {stepData.address}
          </div>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-md px-4 py-2"
            onClick={onNextStep}
          >
            {stepData.buttonText}
          </Button>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <div className="flex gap-2">
            <MessagesDialog>
              <Button
                size="sm"
                variant="outline"
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                {t("chat")}
              </Button>
            </MessagesDialog>
            <Button
              size="sm"
              variant="outline"
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2"
            >
              <Phone className="w-4 h-4 mr-1" />
              {t("call")}
            </Button>
          </div>
          <HavingIssueDialog>
            <Button
              size="icon"
              className="bg-primary text-white rounded-full w-9 h-9 shadow-md"
            >
              <AlertTriangle className="w-5 h-5" />
            </Button>
          </HavingIssueDialog>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white font-bold">
          {stepData.step}
        </div>
        <div className="flex-1 h-1 bg-gray-200 ml-2 rounded" />
      </div>
    </div>
  );
};
