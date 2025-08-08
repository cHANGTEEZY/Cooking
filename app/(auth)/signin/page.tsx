"use client";

import React from "react";
import Step1 from "@/features/signin/Step1";
import Step2 from "@/features/signin/Step2";
import Step3 from "@/features/signin/Step3";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, set } from "react-hook-form";
import { MehIcon } from "lucide-react";

const page = () => {
  const [step, setStep] = React.useState(1);

  const renderStep = (step: number) => {
    switch (step) {
      case (step = 1):
        return <Step1 />;
      case (step = 2):
        return <Step2 />;
      case (step = 3):
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  const handleIncrement = () => {
    setStep((prev) => prev + 1);
  };

  const methods = useForm();

  const handleSubmit = (data) => {
    console.log(data);
  };

  const handleDecrement = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <FormProvider {...methods}>
      {renderStep(step)}
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        {step !== 4 && <Button onClick={handleDecrement}>Previous</Button>}
        <Button onClick={handleIncrement}>
          {step !== 4 ? "Next" : "Finish"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default page;
