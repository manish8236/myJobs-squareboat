import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './TextInput.css';
export default function TextInput(props) {
  const history = useHistory();
  const {
    label,
    name,
    type,
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
              history.push('/forgot-password');
            }}
          >
            Forgot your password ?
          </div>
        </div>
      ) : (
        <label className="label">{label}</label>
      )}

      <input
        name={name}
        type={type}
        className={errors ? 'form-textInput_error' : 'form-textInput'}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
