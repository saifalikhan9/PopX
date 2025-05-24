import { z } from "zod";

export const createAuthSchema = (type: "signup" | "signin") => {
  const baseSchema = {
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  };

  if (type === "signup") {
    return z
      .object({
        ...baseSchema,
        username: z.string().min(2, {
          message: "Name must be at least 2 characters.",
        }),
        // Changed phoneNumber to string and used .length() for exact 10 digits
        phoneNumber: z.string().length(10, {
          message: "Phone number must be exactly 10 digits.",
        }).refine(value => /^\d+$/.test(value), {
            message: "Phone number must contain only digits.",
        }),
        companyName : z.string().optional(),
        confirmPassword: z.string().min(8, {
          message: "Confirm Password must be at least 8 characters.",
        }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
  }

  return z.object(baseSchema);
};

export default interface AuthFormData {
  name?: string;
  email: string;
  phoneNumber?: string;
  companyName?: string;
  password: string;
  confirmPassword?: string;
}