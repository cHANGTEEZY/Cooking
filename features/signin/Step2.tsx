import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import React from "react";
import StepHeader from "./components/StepHeader";
import { Controller, useFormContext } from "react-hook-form";
import { signUpSchemaType } from "@/schema/auth-schema";

const Step2 = () => {
  const { control, setValue } = useFormContext<signUpSchemaType>();

  return (
    <>
      <StepHeader Step={2} />
      <div className="flex flex-col justify-center items-center ">
        <Controller
          name="otpCode"
          control={control}
          render={({ field, fieldState: { error } }) => {
            let inputSlotStyles = "w-10 md:w-20 ";

            if (error) {
              inputSlotStyles += "border-red-500";
            }

            return (
              <>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      autoFocus
                      index={0}
                      className={cn(inputSlotStyles)}
                    />
                    <InputOTPSlot index={1} className={cn(inputSlotStyles)} />
                    <InputOTPSlot index={2} className={cn(inputSlotStyles)} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={3} className={cn(inputSlotStyles)} />
                    <InputOTPSlot index={4} className={cn(inputSlotStyles)} />
                    <InputOTPSlot index={5} className={cn(inputSlotStyles)} />
                  </InputOTPGroup>
                </InputOTP>

                {error && error.message && (
                  <p className="text-red-500 ">{error.message}</p>
                )}
              </>
            );
          }}
        />
      </div>
    </>
  );
};

export default Step2;
