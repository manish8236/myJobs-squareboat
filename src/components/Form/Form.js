import React from 'react';
import './Form.css';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotForm from './ForgotForm';
import ResetPasswordForm from './ResetPasswordForm';
import PostJobForm from './PostJobForm';
export default function Form(props) {
  const { type, enableForgotPassword } = props;

  if (type === 'login') {
    return (
      <LoginForm type={type} enableForgotPassword={enableForgotPassword} />
    );
  } else if (type === 'signup') {
    return <SignupForm />;
  } else if (type === 'forgot') {
    return <ForgotForm />;
  } else if (type === 'resetPass') {
    return <ResetPasswordForm />;
  } else if (type === 'postJob') {
    return <PostJobForm />;
  } else {
    return <div></div>;
  }
}
