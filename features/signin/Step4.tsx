import React from "react";
import StepHeader from "./components/StepHeader";
import CustomInput from "@/components/CustomInput";
import { Controller, useFormContext } from "react-hook-form";
import { signUpSchemaType } from "@/schema/auth-schema";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { eventTypes } from "./constant";

const Step4 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<signUpSchemaType>();

  return (
    <div>
      <StepHeader Step={4} />

      <div className="space-y-4">
        <CustomInput
          {...register("username")}
          label="Username*"
          placeholder="Enter your username"
          inputType="text"
          error={
            typeof errors.username?.message === "string"
              ? errors.username.message
              : ""
          }
        />

        <CustomInput
          {...register("phoneNumber")}
          label="Phone Number*"
          placeholder="Enter your Phonenumber"
          inputType="text"
          error={
            typeof errors.phoneNumber?.message === "string"
              ? errors.phoneNumber.message
              : ""
          }
        />

        <div className="space-y-4">
          <p>Preferences</p>
          <Controller
            name="preferences"
            render={({ field, fieldState: { error } }) => (
              <ToggleGroup
                type="multiple"
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                value={field.value}
                onValueChange={field.onChange}
              >
                {eventTypes.map((event) => (
                  <ToggleGroupItem
                    key={event.id}
                    value={event.title}
                    className="cursor-pointer p-3 rounded-2xl border"
                  >
                    {event.title}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          />

          {errors.preferences?.message && (
            <p className="text-red-500">{errors.preferences.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step4;
