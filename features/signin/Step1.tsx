import CustomInput from "@/components/CustomInput";
import { signUpSchemaType } from "@/schema/auth-schema";
import React from "react";
import { useFormContext } from "react-hook-form";
import StepHeader from "./components/StepHeader";

const Step1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<signUpSchemaType>();

  return (
    <div className="space-y-4">
      <StepHeader Step={1} />

      <CustomInput
        {...register("firstName")}
        placeholder="Enter your first name"
        inputType="text"
        error={
          typeof errors.firstName?.message === "string"
            ? errors.firstName?.message
            : ""
        }
        label="First Name*"
        labelFor="first-name"
      />
      <CustomInput
        {...register("lastName")}
        placeholder="Enter your last name"
        inputType="text"
        error={
          typeof errors.lastName?.message === "string"
            ? errors.lastName?.message
            : ""
        }
        label="Last Name*"
        labelFor="last-name"
      />
      <CustomInput
        {...register("email")}
        placeholder="Enter your email"
        inputType="email"
        error={
          typeof errors.email?.message === "string" ? errors.email?.message : ""
        }
        label="Email*"
        labelFor="email"
      />
    </div>
  );
};

export default Step1;
