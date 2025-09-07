"use client";

import React from "react";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { LockIcon, Mail, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { signInSchema, signInSchemaType } from "@/schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

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
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/voidBg.jpg')`,
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/20 backdrop-blur-[2px]"></div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="space-y-4">
              <div className="relative">
                <CustomInput
                  {...register("username")}
                  label="Email or Username"
                  inputType="text"
                  placeholder="Enter your email or username"
                  icon={<Mail size={20} className="text-gray-400" />}
                  error={errors.username?.message}
                  inputStyle="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>

              <div className="relative">
                <CustomInput
                  {...register("password")}
                  label="Password"
                  inputType={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  icon={<LockIcon size={20} className="text-gray-400" />}
                  error={errors.password?.message}
                  inputStyle="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn size={20} />
                  <span>Sign In</span>
                </div>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-300 text-sm mb-4">Don't have an account?</p>
            <Link href="/signup">
              <Button
                type="button"
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/5 hover:border-white/30 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <UserPlus size={20} className="mr-2" />
                Create Account
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500/20 rounded-full blur-sm"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-500/20 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 -right-6 w-4 h-4 bg-indigo-500/20 rounded-full blur-sm"></div>
      </div>
    </section>
  );
};

export default LoginPage;
