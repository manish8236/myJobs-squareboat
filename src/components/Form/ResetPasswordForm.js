import React, { useState } from 'react';
import './Form.css';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { useHistory } from 'react-router-dom';
import { Reset } from '../../utils/AxiosHandler';
import * as ROUTES from '../../constants/Routes';
export default function ResetPasswordForm(props) {
  const { enableForgotPassword } = props;
  const history = useHistory();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(null);

  const resetHandler = async () => {
    console.log('clicked');

    const response = await Reset({ password, confirmPassword });
    console.log('Response ', response);

    if (response.success) {
      setSuccess(true);
      setErrors(null);
      setConfirmPassword('');
      setPassword('');
      localStorage.removeItem('resetToken');
      history.push(ROUTES.LOGIN);
    } else {
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

    if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
  };

  return (
    <form className="container-resetform">
      <div className="title">Reset Your Password</div>
      <div className="subtitle">Enter your new password below.</div>

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
      </div>
      <div className={'container-form_email'}>
        <TextInput
          required={true}
          className={'confirmPassword'}
          enableForgotPassword={enableForgotPassword}
          name="confirmPassword"
          type="password"
          errors={errors && errors.length > 0}
          value={confirmPassword}
          label="Confirm Password"
          onChange={onChange}
          placeholder="Enter your password"
        />
      </div>

      <div className="container-loginBtn">
        <Button title="Reset" type="primary" clickEvent={resetHandler} />
      </div>
    </form>
  );
}
