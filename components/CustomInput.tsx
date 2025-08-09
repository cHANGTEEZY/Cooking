import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface CustomInputProps {
  inputType: React.HTMLInputTypeAttribute;
  label?: string;
  labelFor?: string;
  error?: string;
  labelStyle?: string;
  inputStyle?: string;
  errorStyle?: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  icon?: React.ReactNode;
}

const CustomInput = ({
  inputType,
  label,
  labelFor,
  error,
  labelStyle,
  inputStyle,
  errorStyle,
  placeholder,
  value,
  onChange,
  icon,
  ...rest
}: CustomInputProps) => {
  return (
    <div className="space-y-4">
      {label && (
        <Label
          htmlFor={labelFor}
          className={cn(labelStyle, error && "text-red-500")}
        >
          {label}
        </Label>
      )}

      <div
        className={cn(
          "flex items-center rounded-md border px-3",
          error && "border-red-500"
        )}
      >
        {icon && <span className="mr-2 text-gray-500">{icon}</span>}
        <Input
          type={inputType}
          className={cn("border-0 p-0 focus-visible:ring-0", inputStyle)}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </div>

      {error && <p className={cn(errorStyle, "text-red-500")}>{error}</p>}
    </div>
  );
};

export default CustomInput;
