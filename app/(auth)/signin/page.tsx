"use client";

import React from "react";
import Step1 from "@/features/signin/Step1";
import Step2 from "@/features/signin/Step2";
import Step3 from "@/features/signin/Step3";
import Step4 from "@/features/signin/Step4";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, set } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { signUpSchema, signUpSchemaType } from "@/schema/auth-schema";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";
import { useSignupState } from "@/hooks/store/useSignupState";
import { useSignUp } from "@clerk/nextjs";
import Step5 from "@/features/signin/Step5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AlertBox from "@/components/AlertBox";

const page = () => {
  const { step, incrementStep, decrementStep, setOtpCode } = useSignupState();
  const { signUp } = useSignUp();
  const [showAlert, setShowAlert] = React.useState(false);

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
      case (step = 4):
        return <Step4 />;
      case (step = 5):
        return <Step5 />;
      default:
        return <Step1 />;
    }
  };

  const handleIncrement = async () => {
    let fieldsToValidate = [] as any;

    if (step === 1) {
      fieldsToValidate = ["firstName", "lastName", "email"];
    }

    if (step === 2) {
      fieldsToValidate = ["otpCode"];
    }

    if (step === 3) {
      fieldsToValidate = ["password", "confirmPassword"];
    }

    if (step === 4) {
      fieldsToValidate = ["username", "phoneNumber", "preferences"];
    }

    if (step === 5) {
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
        icon: <CircleAlert color="red" size={20} />,
      });
      return;
    }

    incrementStep(step);
  };

  const submitForm = (data: any) => {
    console.log("Form submitted", data);
    // router.push("/");
  };

  const handleDecrement = () => {
    if (step === 1) {
    }

    if (step === 2) {
      return (
        <AlertBox
          showAlert={showAlert}
          setShowAlert={() => setShowAlert(true)}
          alertTitle="Are you sure?"
          alertDescription="You will need to reverify your email!"
        />
      );
    }

    console.log("Decrementing step");
    decrementStep(step);
  };

  const endReached = step === 5;

  return (
    <FormProvider {...methods}>
      <section className="my-24 max-w-xs w-full mx-auto space-y-6 ">
        <form onSubmit={methods.handleSubmit(submitForm)}>
          {renderStep(step)}
        </form>
        <div className="flex gap-4">
          {step !== 1 && (
            <Button onClick={handleDecrement} className={cn("flex-1")}>
              Previous
            </Button>
          )}
          <Button
            onClick={!endReached ? handleIncrement : submitForm}
            type={"button"}
            className={cn("flex-1")}
          >
            {!endReached ? "Next" : "Finish"}
          </Button>
        </div>
      </section>
    </FormProvider>
  );
};

export default page;
