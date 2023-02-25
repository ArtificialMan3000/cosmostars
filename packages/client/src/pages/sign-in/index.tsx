import { useLocation, useNavigate } from "react-router-dom";

import { SignIn } from "@/features/Auth/SignIn";
import { useSignInMutation } from "@/shared/api/auth/auth";
import { SignInRequest } from "@/shared/api/auth/models";
import { RoutesName } from "@/shared/constants";
import { BasicLayout } from "@/shared/layouts/BasicLayout";
export const SignInPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const handleSignIn = async (userForm: SignInRequest) => {
    const response = await signIn(userForm);
    if (response.error?.data === "OK") {
      navigate(location?.state?.from ?? RoutesName.MAIN);
    }
  };
  return (
    <BasicLayout>
      <SignIn handleSignIn={handleSignIn} />
    </BasicLayout>
  );
};
