import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { createAuthSchema } from "@/lib/types";
import type AuthFormData from "@/lib/types";



interface AuthFormProps {
  type: "signup" | "signin";
  onSubmitForm: (data: AuthFormData) => void;
  isLoading?: boolean;
}

const AuthForm = ({ type, onSubmitForm, isLoading = false }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isSignup = type === "signup";

  const FormSchema = createAuthSchema(type);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isSignup
        ? { name: "", phoneNumber: "", companyName: "", confirmPassword: "" }
        : {}),
    },
  });

  const submitButtonText = isSignup ? "Sign Up" : "Sign In";
  const cardTitle = isSignup ? <span>Create your <br /> PopX acoount</span> : <span>Signin to your <br /> PopX acoount</span>;
  const cardDescription = isSignup
    ? "Enter your details below to create your account."
    : "Enter your email and password to sign in.";

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Form Data:", data);
    onSubmitForm(data as AuthFormData);
  };

  interface FormInputFieldProps {
    name: `${keyof z.infer<typeof FormSchema>}`;
    label: string;
    type?: string;
    placeholder?: string;
    isRequired?: boolean;
  }

  const FormInputField = ({
    name,
    label,
    type = "text",
    placeholder,
    isRequired = false,
  }: FormInputFieldProps) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  interface PasswordInputFieldProps {
    name: keyof z.infer<typeof FormSchema>;
    label: string;
    show: boolean;
    setShow: (value: boolean) => void;
    isRequired?: boolean;
  }

  const PasswordInputField = ({
    name,
    label,
    show,
    setShow,
    isRequired = false,
  }: PasswordInputFieldProps) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel >
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                placeholder="••••••••"
                {...field}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShow(!show)}
                aria-label={show ? `Hide ${label}` : `Show ${label}`}
              >
                {show ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Card className="w-sm h-196">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4 text-primary">
            {isSignup && (
              <FormInputField
                name="username"
                label="Full Name"
                placeholder="John Doe"
                isRequired
              />
            )}

            {isSignup && (
              <FormInputField
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="1234567890"
                isRequired
              />
            )}

            <FormInputField
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              isRequired
            />

            <PasswordInputField
              name="password"
              label="Password"
              show={showPassword}
              setShow={setShowPassword}
              isRequired
            />

            {isSignup && (
              <PasswordInputField
                name="confirmPassword"
                label="Confirm Password"
                show={showConfirmPassword}
                setShow={setShowConfirmPassword}
                isRequired
              />
            )}
            {isSignup && (
              <FormInputField
                name="companyName"
                label="Company Name"
                placeholder="Acme Corp"
              />
            )}
          </CardContent>

          <CardFooter className=" py-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : submitButtonText}
            </Button>
          </CardFooter>
        </form>
      </Form>

      <div className="px-6 pb-4 text-center">
        {isSignup ? (
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </Card>
  );
};

export default AuthForm;
