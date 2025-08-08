import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface CustomInputProps {
  inputType: React.HTMLInputTypeAttribute;
  label?: string;
  labelFor?: string;
  error?: string;
  labelStyle?: React.HTMLAttributes<HTMLLabelElement>["className"];
  inputStyle?: React.HTMLAttributes<HTMLInputElement>["className"];
  errorStyle?: React.HTMLAttributes<HTMLParagraphElement>["className"];
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
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
  ...rest
}: CustomInputProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={labelFor}
          className={`${labelStyle} ${error ? "text-red-500" : ""}`}
        >
          {label}
        </Label>
      )}
      <Input
        type={inputType}
        className={`${inputStyle} + ${
          error ? "text-red-500 border-red-500" : ""
        }`}
        {...rest}
        placeholder={placeholder}
      />
      {error && <p className={errorStyle}>{error}</p>}
    </div>
  );
};

export default CustomInput;
