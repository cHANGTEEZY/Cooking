"use client";

import React from "react";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { LockIcon, Mail, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { signInSchema, signInSchemaType } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginPage = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInSchemaType>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });
  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  const onSubmitForm = async (data: signInSchemaType) => {
    if (!signIn) return;

    try {
      console.log("Form data:", data);

      const identifier = data.username! || data.email!;

      const result = await signIn.create({
        identifier,
        password: data.password,
      });

      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });

        toast.success("Welcome back!", {
          description: "You've been successfully signed in.",
          duration: 3000,
        });
        reset();
        router.push("/dashboard");
      } else {
        console.log("Sign-in incomplete:", result?.status);
        toast.error("Sign-in incomplete", {
          description: "Please complete the sign-in process.",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error("Sign-in error:", error);

      let errorMessage = "Invalid email/username or password";
      if (error?.errors?.[0]?.message) {
        errorMessage = error.errors[0].message;
      }

      toast.error("Sign-in failed", {
        description: errorMessage,
        duration: 4000,
      });
    }
  };

  return (
    <section
      className="flex items-center justify-center h-screen w-full p-10 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('/images/voidBg.jpg')`,
        backgroundColor: "#0a0a0a",
      }}
    >
      <div className="absolute inset-0 bg-slate-800/40 backdrop-blur-[3px]"></div>

      <div className="w-sm relative z-10 bg-black/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
          <CustomInput
            {...register("username")}
            label="Email or Username"
            inputType="text"
            placeholder="Enter your email or username"
            icon={<Mail size={20} />}
            error={errors.username?.message}
          />

          <CustomInput
            {...register("password")}
            label="Password"
            inputType="password"
            placeholder="**********************"
            icon={<LockIcon size={20} />}
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full mt-5" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Login"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
