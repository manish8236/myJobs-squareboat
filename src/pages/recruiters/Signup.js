import React, { useEffect, useContext } from 'react';
import { Container, Header, Form } from '../../components';

import { AppContext } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/Routes';
export default function Signup(props) {
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
      form={<Form type="signup" enableForgotPassword={false} />}
    />
  );
}
