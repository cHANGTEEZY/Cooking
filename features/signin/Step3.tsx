import React from "react";
import StepHeader from "./components/StepHeader";
import CustomInput from "@/components/CustomInput";
import { useFormContext } from "react-hook-form";
import { signUpSchemaType } from "@/schema/auth-schema";
import { error } from "console";

const Step3 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<signUpSchemaType>();

  return (
    <div>
      <StepHeader Step={3} />
      <div className="space-y-4">
        <CustomInput
          {...register("password")}
          label="Password*"
          placeholder="Choose a password"
          inputType="password"
          error={
            typeof errors.password?.message === "string"
              ? errors.password?.message
              : ""
          }
        />
        <CustomInput
          {...register("confirmPassword")}
          label="Password*"
          placeholder="Choose a password"
          inputType="password"
          error={
            typeof errors.confirmPassword?.message === "string"
              ? errors.confirmPassword.message
              : ""
          }
        />
      </div>
    </div>
  );
};

export default Step3;
