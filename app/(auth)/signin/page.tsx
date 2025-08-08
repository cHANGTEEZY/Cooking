"use client";

import React from "react";
import Step1 from "@/features/signin/Step1";
import Step2 from "@/features/signin/Step2";
import Step3 from "@/features/signin/Step3";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, set } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { signUpSchema, signUpSchemaType } from "@/schema/auth-schema";
import { toast } from "sonner";

const page = () => {
  const [step, setStep] = React.useState(1);
  const router = useRouter();

  const methods = useForm<signUpSchemaType>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

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

  const handleIncrement = async () => {
    let fieldsToValidate = [] as any;

    if (step === 1) {
      fieldsToValidate = ["firstName", "lastName", "email"];
    }

    if (step === 3) {
      console.log("Final step reached");
      return;
    }

    const validForm = await methods.trigger(fieldsToValidate);
    console.log(
      "Validating form fields:",
      fieldsToValidate,
      "Result:",
      validForm
    );
    if (!validForm) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields correctly.",
        descriptionClassName: "text-sm",
        duration: 3000,
        icon: "⚠️",
      });
      return;
    }

    setStep((prev) => prev + 1);
  };

  const submitForm = (data: any) => {
    console.log("Form submitted", data);
    router.push("/");
  };

  const handleDecrement = () => {
    if (step === 1) return;
    console.log("Decrementing step");
    setStep((prev) => prev - 1);
  };

  const endReached = step === 3;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitForm)}>
        {renderStep(step)}
      </form>
      {step !== 1 && (
        <Button
          onClick={handleDecrement}
          // disabled={step === 1}
          className={cn(step === 1 && "cursor-not-allowed")}
        >
          Previous
        </Button>
      )}
      <Button
        onClick={!endReached ? handleIncrement : submitForm}
        type={"button"}
      >
        {!endReached ? "Next" : "Finish"}
      </Button>
    </FormProvider>
  );
};

export default page;
