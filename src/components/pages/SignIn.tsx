
import AuthForm from "../AuthForm";
import type AuthFormData from "@/lib/types";
import { useNavigate } from "react-router-dom";
export const SignIn = () => {
  const navigate = useNavigate();
  const handleSubmit = (data: AuthFormData) => {
    // call backend api to save the data
    console.log(data);
    navigate("/profile");
  };
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <AuthForm type="signin" onSubmitForm={handleSubmit} />
    </div>
  );
};
