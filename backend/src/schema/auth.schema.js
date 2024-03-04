import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "User name is required" })
    .min(3)
    .max(20),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  confirm_password: z
    .string({ required_error: "Confirm password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
