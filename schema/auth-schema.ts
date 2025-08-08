import * as z from "zod";

export const baseAuthSchema = z.object({
  email: z.email().min(1, "Email is required"),
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
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signUpSchemaType = z.infer<typeof signUpSchema>;
