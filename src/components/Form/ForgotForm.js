import React, { useState, useContext, useEffect } from 'react';
import './Form.css';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Forgot } from '../../utils/AxiosHandler';
import * as ROUTES from '../../constants/Routes';
export default function ForgotForm(props) {
  const { enableForgotPassword } = props;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(null);
  const context = useContext(AppContext);

  const ForgotPassHandler = async () => {
    //Trigger login from context
    console.log('clicked');
    const response = await Forgot(email);
    console.log('Response ', response);

    if (response.success) {
      setSuccess(true);
      setErrors(null);
      setEmail('');

      localStorage.setItem('resetToken', response.results.token);
      //   context.login(response.results);
      history.push(ROUTES.RESET_PASS);
    } else {
      setErrors(response.results);
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
    <form className="container-forgotform">
      <div className="title">Forgot Your Password ?</div>
      <div className="subtitle">
        Enter the email associated with your account and we’ll send you
        instructions to reset your password.
      </div>
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

      <div className="container-loginBtn">
        <Button title="Submit" type="primary" clickEvent={ForgotPassHandler} />
      </div>
    </form>
  );
}
