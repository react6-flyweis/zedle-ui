"use client";

import { useState } from "react";
import { CaptureImageDialog } from "./CaptureImageDialog";
import { StepRouteCard } from "./StepRouteCard";

export default function ParcelRouteCard() {
  const steps = [
    {
      label: "Start",
      address: "sector 66, lane no 2, Noida, Uttar Pradesh",
      buttonText: "Click here when you start",
      step: 1,
    },
    {
      label: "Pick Up",
      address: "sector 66, lane no 2, Noida, Uttar Pradesh",
      buttonText: "Click here when Pick up is done",
      time: "12:00 Min",
      step: 2,
    },
    {
      label: "In Transit",
      address: "sector 66, lane no 2, Noida, Uttar Pradesh",
      buttonText: "Click here when you Reach",
      time: "06:00 Min",
      step: 3,
    },
    {
      label: "Enter OTP",
      address: "sector 66, lane no 2, Noida, Uttar Pradesh",
      buttonText: "Click here to Enter OTP or Scan QR",
      time: "08:00 Min",
      step: 4,
    },
    // Add more steps as needed
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [showCaptureDialog, setShowCaptureDialog] = useState(false);

  const handleNextStep = () => {
    // If next step is 'Pick Up', show dialog
    if (steps[currentStep + 1]?.label === "In Transit") {
      setShowCaptureDialog(true);
      return;
    }
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const handleCloseDialog = () => {
    setShowCaptureDialog(false);
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  return (
    <>
      <StepRouteCard
        stepData={steps[currentStep]}
        onNextStep={handleNextStep}
      />
      <CaptureImageDialog
        open={showCaptureDialog}
        onClose={handleCloseDialog}
      />
    </>
  );
}
