import { useState } from "react";
import { useSelector } from "react-redux";

import { useLazyGetUserQuery } from "@/entities/user/model/api";
import { selectIsAuth, setIsAuth, setUser } from "@/entities/user/model/user";
import {
  useLogoutMutation,
  useSignInMutation,
  useSignUpMutation,
} from "@/shared/api/auth/auth";

import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../api/auth/models";
import { useAppDispatch } from "./store";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [getUser] = useLazyGetUserQuery();
  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();
  const [logout] = useLogoutMutation();

  const checkIsUserAuth = async () => {
    try {
      const { isSuccess, data } = await getUser();
      dispatch(setIsAuth(isSuccess));
      if (isSuccess) {
        dispatch(setUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signInAuth = async (userForm: SignInRequest) => {
    try {
      const data = await signIn(userForm);
      // приводится к типу unknown, т.к в базовых типах нет поле data
      // из-за этого TS выдает ошибку
      if ((data as unknown as SignInResponse).error.data === "OK") {
        checkIsUserAuth();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signUpAuth = async (userForm: SignUpRequest) => {
    try {
      const data = await signUp(userForm);
      if ((data as unknown as SignUpResponse).data.id) {
        checkIsUserAuth();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutAuth = async () => {
    await logout("");
    dispatch(setUser(undefined));
    dispatch(setIsAuth(false));
  };
  return {
    logoutAuth,
    signUpAuth,
    signInAuth,
    checkIsUserAuth,
    isAuth,
  };
};
