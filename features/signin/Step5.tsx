import React from "react";
import StepHeader from "./components/StepHeader";
import CustomInput from "@/components/CustomInput";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { signUpSchemaType } from "@/schema/auth-schema";

const Step5 = () => {
  const { register } = useFormContext<signUpSchemaType>();

  return (
    <div className="space-y-4">
      <StepHeader Step={5} />
      <CustomInput
        {...register("socialTwitter")}
        label="Twitter"
        placeholder="twitter.com/@example"
        inputType="text"
        icon={<Twitter className="h-4 w-4 text-gray-500" />}
      />
      <CustomInput
        {...register("socialInstagram")}
        label="Instagram"
        placeholder="instagram.com/@example"
        inputType="text"
        icon={<Instagram className="h-4 w-4 text-gray-500" />}
      />
      <CustomInput
        {...register("socialFacebook")}
        label="Facebook"
        placeholder="facebook.com/@example"
        inputType="text"
        icon={<Facebook className="h-4 w-4 text-gray-500" />}
      />
    </div>
  );
};

export default Step5;
