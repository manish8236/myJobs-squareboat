import React, { useState, useContext, useEffect } from 'react';
import './Form.css';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Login } from '../../utils/AxiosHandler';
import * as ROUTES from '../../constants/Routes';
export default function LoginForm(props) {
  const { enableForgotPassword } = props;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(null);
  const context = useContext(AppContext);

  const loginHandler = async () => {
    //Trigger login from context
    console.log('clicked');
    const response = await Login({ email, password });
    console.log('Response ', response);

    if (response.success) {
      if (response?.results?.userRole === 0) {
        setSuccess(true);
        setErrors(null);
        setEmail('');
        setPassword('');
        context.login(response.results);
        //   context.pushToBreadcrumb({ to: ROUTES.PROFILE, title: 'Home' });
        history.push(ROUTES.PROFILE);
      } else {
        setErrors([response.results]);
      }
    } else {
      console.log('Res');
      setErrors([response.results]);
      setSuccess(false);
    }
  };

  const onChange = (e) => {
    console.log('e', e.target.name);
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  return (
    <form className="container-form">
      <div className="title">Login</div>

      <div className={'container-form_email'}>
        <TextInput
          name="email"
          type="email"
          errors={errors && errors.length > 0}
          value={email}
          label="Email address"
          placeholder="Enter your email"
          onChange={onChange}
        />
      </div>
      <div className="container-form_password">
        <TextInput
          enableForgotPassword={enableForgotPassword}
          name="password"
          type="password"
          errors={errors && errors.length > 0}
          value={password}
          label="Password"
          onChange={onChange}
          placeholder="Enter your password"
        />
        {errors && errors.length > 0 && (
          <div className="login_error">Incorrect email address or password</div>
        )}
      </div>

      <div className="container-loginBtn">
        <Button title="Login" type="primary" clickEvent={loginHandler} />
      </div>

      <div className="footer-signup">
        New to MyJobs?{' '}
        <span
          onClick={() => {
            history.push(ROUTES.SIGNUP);
          }}
        >
          Create an account
        </span>{' '}
      </div>
    </form>
  );
}
