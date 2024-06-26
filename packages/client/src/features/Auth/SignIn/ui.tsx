import { Paper } from '@mui/material';
import { useFormik } from 'formik';
import { PropsWithChildren } from 'react';

import { YandexOAuth } from '@/features/Auth/YanedxOAuth';
import { authTypes } from '@/shared/api';
import { SignInRequest } from '@/shared/api/auth/models';
import { RoutesName } from '@/shared/constants';
import { CardView } from '@/shared/ui';
import { cleanForm } from '@/shared/utils/clean';

import { signInSchema } from '../schemas/sign-in';

export type SignInProps = PropsWithChildren<{
  handleSignIn: (userForm: authTypes.SignInRequest) => void;
}>;

export const SignIn = ({ handleSignIn }: SignInProps) => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: () => {
      const userForm = cleanForm(values);
      handleSignIn(userForm);
    },
  });

  const props = {
    className: 'sign-in',
    title: 'Login',
    handleSubmit: handleSubmit,
    fields: [
      {
        id: 'login',
        label: 'Login',
        name: 'login',
        value: values.login,
        type: 'text',
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.login,
      },
      {
        id: 'password',
        label: 'Password',
        name: 'password',
        value: values.password,
        type: 'password',
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.password,
      },
    ],
    btn: 'sign in',
    link: 'Create account?',
  };
  return (
    <Paper className="form-paper" sx={{ my: 'auto' }}>
      <CardView
        handleSubmit={props.handleSubmit}
        className={props.className}
        title={props.title}
        fields={props.fields}
        buttonName={props.btn}
        linkName={props.link}
        linkHref={RoutesName.REGISTRATION}
      >
        <YandexOAuth />
      </CardView>
    </Paper>
  );
};
