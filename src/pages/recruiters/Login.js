import React, { useContext, useEffect } from 'react';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Form from '../../components/Form/Form';
import { AppContext } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/Routes';
export default function Login(props) {
  const context = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (context.user && context.user.userRole === 0) {
      history.push(ROUTES.PROFILE);
    }
  }, [context.user]);

  return (
    <Container
      header={<Header type="secondary" history={props.history} />}
      form={<Form type="login" enableForgotPassword={true} />}
    />
  );
}
