import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMultiFormStepState } from "@/hooks/store/useMultiFormState";
import { cn } from "@/lib/utils";
import useIsScreenReisze from "@/hooks/utils/useIsScreenReisze";

const Step = ({
  stepNumber,
  currentStep,
}: {
  stepNumber: number;
  currentStep: number;
}) => {
  return (
    <div
      className={cn(
        currentStep >= stepNumber ? "bg-primary" : "bg-accent",
        `rounded-full md:h-14 md:w-14 md:text-xl flex 
        items-center justify-center font-bold h-12 w-12 text-xs p-2 text-center`
      )}
    >
      Step <br /> {stepNumber}
    </div>
  );
};

const ProgressBar = () => {
  const { step } = useMultiFormStepState();

  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { screenResized } = useIsScreenReisze();

  useGSAP(
    () => {
      if (!containerRef.current || !barRef.current) {
        console.warn("ProgressBar refs not ready");
        return;
      }

      try {
        const containerRect = containerRef.current.getBoundingClientRect();
        if (!containerRect) {
          console.warn("Container getBoundingClientRect returned null");
          return;
        }

        const containerWidth = containerRect.width;
        const totalSteps = 5;
        const progressWidth = ((step - 1) / (totalSteps - 1)) * containerWidth;

        gsap.to(barRef.current, {
          width: progressWidth,
          duration: 0.6,
          ease: "power2.out",
        });
      } catch (error) {
        console.error("Error in ProgressBar GSAP animation:", error);
      }
    },
    { dependencies: [step, screenResized] }
  );

  return (
    <div
      ref={containerRef}
      className="flex justify-between items-center relative w-full"
      id="progress-container"
    >
      <div className="-z-20 absolute top-1/2 left-0 w-full h-2 bg-accent -translate-y-1/2 rounded-full"></div>

      <div
        ref={barRef}
        className="absolute -z-10 top-1/2 left-0 h-2 bg-primary -translate-y-1/2 rounded-full"
        style={{ width: 0 }}
      ></div>

      <Step stepNumber={1} currentStep={step} />
      <Step stepNumber={2} currentStep={step} />
      <Step stepNumber={3} currentStep={step} />
      <Step stepNumber={4} currentStep={step} />
      <Step stepNumber={5} currentStep={step} />
    </div>
  );
};

export default ProgressBar;
