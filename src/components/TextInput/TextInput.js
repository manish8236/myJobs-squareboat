import React from 'react';
import { useHistory } from 'react-router-dom';
import './TextInput.css';
import * as ROUTES from '../../constants/Routes';
export default function TextInput(props) {
  const history = useHistory();
  const {
    label,
    name,
    type,
    variant,
    placeholder,
    onChange,
    value,
    errors,
    enableForgotPassword,
  } = props;

  return (
    <div className="container-textinput">
      {enableForgotPassword ? (
        <div className="container-textinput_forgot">
          <label className="label">{label}</label>
          <div
            className="forgotPass"
            onClick={() => {
              history.push(ROUTES.FORGOT_PASSWORD);
            }}
          >
            Forgot your password ?
          </div>
        </div>
      ) : (
        <label className="label">{label}</label>
      )}

      {variant === 'textarea' ? (
        <textarea
          rows={4}
          name={name}
          type={type}
          className={errors ? 'form-textInput_error' : 'form-textareaInput'}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          name={name}
          type={type}
          className={errors ? 'form-textInput_error' : 'form-textInput'}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
}
