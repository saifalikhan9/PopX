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
        phoneNumber: z
          .string()
          .length(10, {
            message: "Phone number must be exactly 10 digits.",
          })
          .refine((value) => /^\d+$/.test(value), {
            message: "Phone number must contain only digits.",
          }),
        companyName: z.string().optional(),
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

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long"),
    username: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    phoneNumber: z
      .string()
      .length(10, {
        message: "Phone number must be exactly 10 digits.",
      })
      .refine((value) => /^\d+$/.test(value), {
        message: "Phone number must contain only digits.",
      }),
    companyName: z.string().optional(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
export default interface AuthFormData {
  name?: string;
  email: string;
  phoneNumber?: string;
  companyName?: string;
  password: string;
  confirmPassword?: string;
}
