"use client";

import { useState } from "react";
import { CaptureImageDialog } from "./CaptureImageDialog";
import { ReceivePaymentDialog } from "./ReceivePaymentDialog";
import { StepRouteCard } from "./StepRouteCard";
import { VerificationMethodDialog } from "./VerificationMethodDialog";

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
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [showReceivePaymentDialog, setShowReceivePaymentDialog] =
    useState(false);

  const handleNextStep = () => {
    // If next step is 'Pick Up', show dialog
    if (steps[currentStep + 1]?.label === "In Transit") {
      setShowCaptureDialog(true);
      return;
    }
    // last step
    if (currentStep === steps.length - 1) {
      setShowVerificationDialog(true);
      return;
    }
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
        onClose={() => setShowCaptureDialog(false)}
        onCapture={() => {
          setShowCaptureDialog(false);
          // Proceed to next step
          setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }}
      />
      <VerificationMethodDialog
        open={showVerificationDialog}
        onOpenChange={() => setShowVerificationDialog(false)}
        onVerify={() => {
          setShowVerificationDialog(false);
          setShowReceivePaymentDialog(true);
        }}
      />
      <ReceivePaymentDialog
        open={showReceivePaymentDialog}
        onClose={() => setShowReceivePaymentDialog(false)}
      />
    </>
  );
}
