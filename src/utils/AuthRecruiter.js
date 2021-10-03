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
        !user || user?.userRole === 1 ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default AuthRecruiter;
