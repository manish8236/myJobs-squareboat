import React from 'react';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Form from '../../components/Form/Form';
export default function Signup(props) {
  return (
    <Container
      header={<Header type="secondary" history={props.history} />}
      form={<Form type="signup" enableForgotPassword={false} />}
    />
  );
}
