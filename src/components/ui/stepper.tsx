"use client";

import { Check, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { Slot } from "radix-ui";
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { cn } from "@/lib/utils";

/** Types */
type Step = {
  label?: string;
  description?: string;
  onValidate?: () => boolean | Promise<boolean>;
  isLoading?: boolean;
  element: ReactElement;
};

interface StepperStepProps {
  children: ReactNode;
  label?: string;
  description?: string;
  onValidate?: () => boolean | Promise<boolean>;
  isLoading?: boolean;
}

export type UnifiedStepperRef = {
  goNext: () => void;
  goPrev: () => void;
  goToStep: (index: number) => void;
  currentStep: number;
  validateAndGoNext: () => Promise<void>;
};

type UnifiedStepperContextType = {
  currentStep: number;
  steps: Step[];
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  indicatorStyle?: "line" | "dot" | "progress";
  validateAndGoNext: () => Promise<void>;
};

const StepperContext = createContext<UnifiedStepperContextType | null>(null);

function useStepper() {
  const context = useContext(StepperContext);
  if (!context) throw new Error("Must be used inside UnifiedStepper");
  return context;
}

/** Unified Stepper */
const Stepper = forwardRef<
  UnifiedStepperRef,
  {
    children: ReactNode;
    defaultValue?: number;
    indicatorStyle?: "line" | "dot" | "progress";
  }
>(({ children, defaultValue = 1, indicatorStyle = "line" }, ref) => {
  const [step, setStep] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  // Filter children to only accept StepperStep, StepperHeader, StepperFooter
  const validChildren = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false;
    return (
      child.type === StepperStep ||
      child.type === StepperHeader ||
      child.type === StepperFooter
    );
  });

  const stepChildren = validChildren.filter(
    (child) => isValidElement(child) && child.type === StepperStep,
  ) as ReactElement[];

  const stepperHeader = validChildren.find(
    (child) => isValidElement(child) && child.type === StepperHeader,
  );

  const stepperFooter = validChildren.find(
    (child) => isValidElement(child) && child.type === StepperFooter,
  );

  const steps: Step[] = stepChildren.map((child) => ({
    element: child,
    label: (child.props as StepperStepProps)?.label,
    description: (child.props as StepperStepProps)?.description,
    onValidate: (child.props as StepperStepProps)?.onValidate,
    isLoading: (child.props as StepperStepProps)?.isLoading,
  }));

  const totalSteps = steps.length;
  const current = steps[step - 1];
  const canGoNext = step < totalSteps;
  const canGoPrev = step > 1;

  const nextStep = useCallback(() => {
    if (step < totalSteps) setStep((s) => s + 1);
  }, [step, totalSteps]);

  const prevStep = useCallback(() => {
    if (step > 1) setStep((s) => s - 1);
  }, [step]);

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 1 && index <= totalSteps) setStep(index);
    },
    [totalSteps],
  );

  const validateAndGoNext = useCallback(async () => {
    if (current?.onValidate) {
      setLoading(true);
      const result = await current.onValidate();
      setLoading(false);
      if (result) nextStep();
    } else {
      nextStep();
    }
  }, [current, nextStep]);

  useImperativeHandle(ref, () => ({
    goNext: nextStep,
    goPrev: prevStep,
    goToStep,
    currentStep: step,
    validateAndGoNext,
  }));

  return (
    <StepperContext.Provider
      value={{
        currentStep: step,
        steps,
        totalSteps,
        nextStep,
        prevStep,
        goToStep,
        canGoNext,
        canGoPrev,
        isLoading: loading,
        setLoading: setLoading,
        indicatorStyle,
        validateAndGoNext,
      }}
    >
      <div className="flex flex-col w-full space-y-4">
        {/* Header - Fixed at top */}
        {stepperHeader || <StepperHeader />}

        {/* Current Step Content */}
        <div className="flex-1">{current && cloneElement(current.element)}</div>

        {/* Footer - Fixed at bottom */}
        {stepperFooter || <StepperFooter />}
      </div>
    </StepperContext.Provider>
  );
});

Stepper.displayName = "Stepper";

/** Step Wrapper */
function StepperStep({ children }: StepperStepProps) {
  return <div>{children}</div>;
}

/** StepperHeader */
interface StepperHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

function StepperHeader({
  asChild = false,
  className,
  children,
  ...props
}: StepperHeaderProps) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn(
        "flex w-full items-center justify-between border-b border-border pb-4",
        className,
      )}
      {...props}
    >
      {children || <StepperIndicator />}
    </Comp>
  );
}

/** StepperFooter */
interface StepperFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

function StepperFooter({
  asChild = false,
  className,
  children,
  ...props
}: StepperFooterProps) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn(
        "flex w-full items-center justify-between border-t border-border pt-4",
        className,
      )}
      {...props}
    >
      {children || (
        <>
          <StepperBack />
          <StepperNext />
        </>
      )}
    </Comp>
  );
}

/** StepperNext */
interface StepperNextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

function StepperNext({
  asChild = false,
  className,
  children,
  ...props
}: StepperNextProps) {
  const { canGoNext, isLoading } = useStepper();
  const Comp = asChild ? Slot.Root : "button";
  const stepperContext = useStepper();
  // Use validateAndGoNext for validation before moving next
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (stepperContext.validateAndGoNext) {
      await stepperContext.validateAndGoNext();
    }
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={handleClick}
      disabled={!canGoNext || isLoading}
      {...props}
    >
      {children || (
        <>
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </>
      )}
    </Comp>
  );
}

/** StepperBack */
interface StepperBackProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

function StepperBack({
  asChild = false,
  className,
  children,
  ...props
}: StepperBackProps) {
  const { prevStep, canGoPrev, isLoading } = useStepper();
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={prevStep}
      disabled={!canGoPrev || isLoading}
      {...props}
    >
      {children || (
        <>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </>
      )}
    </Comp>
  );
}

/** StepperIndicator */
interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

function StepperIndicator({
  asChild = false,
  className,
  children,
  ...props
}: StepperIndicatorProps) {
  const { steps, currentStep, isLoading } = useStepper();
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp className={cn("flex w-full justify-between", className)} {...props}>
      {children ||
        steps.map((step, index) => {
          const stepIndex = index + 1;
          const isCompleted = stepIndex < currentStep;
          const isActive = stepIndex === currentStep;

          return (
            <div
              className="flex flex-col justify-center text-center flex-1 px-2"
              key={`step-${stepIndex}`}
            >
              <div className="w-full flex-1 flex items-center relative min-h-8">
                {index > 0 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1",
                      stepIndex <= currentStep ? "bg-primary" : "bg-muted",
                      "z-0",
                    )}
                  />
                )}
                <div
                  className={cn(
                    "rounded-full size-8 flex items-center justify-center text-xs font-medium border-2 border-white shadow-md bg-white z-10 transition-colors duration-200",
                    isCompleted
                      ? "bg-primary text-primary-foreground border-primary"
                      : isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-muted",
                  )}
                  style={{ position: "relative" }}
                >
                  {isLoading && isActive ? (
                    <LoaderCircle className="animate-spin size-4" />
                  ) : isCompleted ? (
                    <Check className="size-4" />
                  ) : (
                    stepIndex
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1",
                      stepIndex < currentStep ? "bg-primary" : "bg-muted",
                      "z-0",
                    )}
                  />
                )}
              </div>
              {step.label && (
                <div className="mt-2">
                  <div className="text-sm font-medium">{step.label}</div>
                  {step.description && (
                    <div className="text-sm text-muted-foreground">
                      {step.description}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
    </Comp>
  );
}

// Exports
export {
  Stepper,
  StepperStep,
  StepperHeader,
  StepperFooter,
  StepperNext,
  StepperBack,
  StepperIndicator,
  useStepper,
};
