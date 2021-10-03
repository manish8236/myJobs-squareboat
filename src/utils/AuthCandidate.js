import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function AuthRecruiter({ component: Component, ...rest }) {
  const { user } = useContext(AppContext);
  console.log('User ', user);
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Redirect to="/login" />
        ) : !user.userRole || user.userRole !== 0 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default AuthRecruiter;
