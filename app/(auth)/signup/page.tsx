"use client";

import React, { useState } from "react";
import Step1 from "@/features/signin/Step1";
import Step2 from "@/features/signin/Step2";
import Step3 from "@/features/signin/Step3";
import Step4 from "@/features/signin/Step4";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { signUpSchema, signUpSchemaType } from "@/schema/auth-schema";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";
import { useSignupState } from "@/hooks/store/useSignupState";
import Step5 from "@/features/signin/Step5";
import AlertBox from "@/components/AlertBox";
import { useSignUp, useAuth, useClerk } from "@clerk/nextjs";

import { createUser } from "@/lib/api";

const page = () => {
  const {
    step,
    incrementStep,
    decrementStep,
    setOtpCode,
    otpCode,
    clearStore,
  } = useSignupState();
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { signUp } = useSignUp();
  const { getToken } = useAuth();
  const { setActive } = useClerk();

  const getOtpCode = async (email: string) => {
    try {
      const signUpAttempt = await signUp?.create({
        emailAddress: email,
      });

      if (!signUpAttempt?.id) {
        throw new Error("Failed to create signup attempt");
      }

      console.log("SignUp attempt created:", signUpAttempt.id);
      console.log("Missing requirements:", signUpAttempt.missingFields);

      await signUpAttempt.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      console.log("Email verification prepared");
      return signUpAttempt?.id;
    } catch (error) {
      console.error("Error fetching OTP code:", error);
      toast.error("Error sending OTP", {
        description: "Failed to send verification code. Please try again.",
        duration: 3000,
        icon: <CircleAlert color="red" size={20} />,
      });
      throw error;
    }
  };

  const verifyOtpCode = async (code: string) => {
    try {
      console.log("Attempting to verify OTP code:", code);

      const verifyResult = await signUp?.attemptEmailAddressVerification({
        code,
      });

      console.log("Verification result:", verifyResult);
      console.log("Verification status:", verifyResult?.status);
      console.log("Missing fields:", verifyResult?.missingFields);
      console.log("Unverified fields:", verifyResult?.unverifiedFields);

      if (verifyResult?.status === "complete") {
        return true;
      } else if (verifyResult?.status === "missing_requirements") {
        console.log(
          "Missing requirements - but email verification successful!"
        );

        return true;
      } else {
        console.log("Email verification incomplete:", verifyResult?.status);
        return false;
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Verification failed", {
        description: "Invalid OTP code. Please try again.",
        duration: 3000,
      });
      return false;
    }
  };

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
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      default:
        return <Step1 />;
    }
  };

  const endReached = step === 5;

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

    if (!validForm) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields correctly.",
        descriptionClassName: "text-sm",
        duration: 3000,
        icon: <CircleAlert color="red" size={20} />,
      });
      return;
    }

    if (step === 1) {
      try {
        const email = methods.getValues("email");
        setIsLoading(true);
        const otpCode = await getOtpCode(email);
        setOtpCode(otpCode);

        toast.success("OTP sent!", {
          description: "Please check your email for the verification code.",
          duration: 3000,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to send OTP:", error);
        return;
      }
    }

    if (step === 2) {
      const userOtpCode = methods.getValues("otpCode");
      console.log("User entered OTP:", userOtpCode);

      if (!userOtpCode || userOtpCode.length < 6) {
        toast.error("Please enter a valid OTP code.");
        return;
      }

      const isVerified = await verifyOtpCode(userOtpCode);
      if (!isVerified) {
        return;
      }

      toast.success("Email verified!", {
        description: "Your email has been successfully verified.",
        duration: 3000,
      });
    }

    incrementStep(step);
  };

  const handleDecrement = () => {
    if (step === 1) {
      return;
    }

    if (step === 2) {
      setShowAlert(true);
      return;
    }

    console.log("Decrementing step");
    decrementStep(step);
  };

  const submitForm = async () => {
    try {
      setIsLoading(true);
      const formData = methods.getValues();
      console.log("Completing signup with data:", formData);

      const result = await signUp?.update({
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        ...(formData.username && { username: formData.username }),
      });

      console.log("Clerk signup result:", result);

      if (result?.status === "complete") {
        const userId = result.createdUserId || result.id;
        console.log("Clerk user id is:", userId);

        if (!userId) {
          throw new Error("Failed to get user ID from Clerk");
        }

        await setActive({ session: result.createdSessionId });
        console.log("User signed in successfully");

        const token = await getToken();
        console.log("Got Clerk token:", token ? "✓" : "No token");

        if (token) {
          const userData = {
            userId,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
          };

          console.log("Sending user data to backend:", userData);

          try {
            const backendResponse = await createUser(userData, token);
            console.log(backendResponse);
          } catch (backendError) {
            console.error(
              "Backend error (but user created in Clerk):",
              backendError
            );
          }
        }

        toast.success("Account created successfully!", {
          description: "Welcome to Event Finder!",
          duration: 3000,
        });

        clearStore();

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        console.log("Signup still incomplete:", result?.status);
        console.log("Missing fields:", result?.missingFields);
        console.log("Unverified fields:", result?.unverifiedFields);

        toast.error("Signup incomplete", {
          description: `Status: ${result?.status}. Missing: ${
            result?.missingFields?.join(", ") || "unknown"
          }`,
          duration: 5000,
        });
      }
    } catch (error: any) {
      console.error("Error completing signup:", error);
      let errorMessage = "Failed to create account. Please try again.";
      if (error?.errors?.[0]?.message) {
        errorMessage = error.errors[0].message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error("Signup failed", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmGoBack = () => {
    console.log("User confirmed going back - will need to reverify email");
    decrementStep(step);
  };

  const cancelGoBack = () => {
    console.log("User cancelled going back");
  };

  return (
    <FormProvider {...methods}>
      <section className=" max-w-xs w-full mx-auto space-y-6">
        <div id="clerk-captcha"></div>

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
            type="button"
            className={cn("flex-1")}
            disabled={isLoading}
          >
            {!endReached ? "Next" : "Finish"}
          </Button>
        </div>

        <AlertBox
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          alertTitle="Are you sure?"
          alertDescription="You will need to reverify your email if you go back!"
          confirmText="Yes, go back"
          cancelText="Stay here"
          onConfirm={confirmGoBack}
          onCancel={cancelGoBack}
        />
      </section>
    </FormProvider>
  );
};

export default page;
