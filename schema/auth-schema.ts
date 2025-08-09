import * as z from "zod";

export const baseAuthSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = baseAuthSchema
  .extend({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(15, "First name must be less than 15 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(15, "Last name must be less than 15 characters"),
    otpCode: z
      .string()
      .min(1, "OTP code is required")
      .max(6, "OTP code lenght should be 6 "),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .max(10, "Phone number must be less than 10 character"),
    preferences: z.array(
      z.enum([
        "Concert",
        "Sports",
        "Theater",
        "Comedy",
        "Festival",
        "Exhibition",
        "Conference",
        "Workshop",
        "Party",
        "Other",
      ])
    ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    socialInstagram: z.string().optional(),
    socialFacebook: z.string().optional(),
    socialTwitter: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signUpSchemaType = z.infer<typeof signUpSchema>;
