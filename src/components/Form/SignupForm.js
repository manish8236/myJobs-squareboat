import React, { useState, useContext, useEffect } from 'react';
import './Form.css';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Signup } from '../../utils/AxiosHandler';
import Recruiter from '../../assets/icons/recruiter.png';
import Candidate from '../../assets/icons/candidate.png';

export default function SignupForm(props) {
  const { enableForgotPassword } = props;
  const history = useHistory();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [commaSeperatedSkills, setCommaSeperatedSkills] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(null);
  const context = useContext(AppContext);

  const testEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const checkPassword = () => {
    let empty = false;
    let same = false;
    if (!password.length > 0 || !confirmPassword.length > 0) {
      empty = true;
    } else {
      if (password === confirmPassword) {
        same = true;
      }
    }

    return empty && same;
  };

  const signupHandler = async () => {
    //Trigger login from context
    console.log('clicked');

    const response = await Signup({
      email,
      userRole: 0,
      password,
      confirmPassword,
      name: fullname,
      skills: commaSeperatedSkills,
    });
    console.log('Response ', response);

    if (response.success) {
      setSuccess(true);
      setErrors(null);
      setEmail('');
      setPassword('');
      setCommaSeperatedSkills('');
      setFullname('');
      setConfirmPassword('');
      context.login(response.results);
      history.push('/profile');
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

    if (e.target.name === 'fullname') {
      setFullname(e.target.value);
    }

    if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }

    if (e.target.name === 'commaSeperated') {
      setCommaSeperatedSkills(e.target.value);
    }
  };

  return (
    <form className="container-signupform">
      <div className="title">Signup</div>
      <div>
        <div className="subtitle">I'm a*</div>
        <div className="icon-btn-container">
          <Button title="Recruiter" type="primary" icon={Recruiter} />
          <Button
            title="Candidate"
            type="primary"
            icon={Candidate}
            disabled={true}
          />
        </div>
      </div>

      <div className={'container-form_fullname'}>
        <TextInput
          required={true}
          name="fullname"
          type="text"
          errors={errors && errors.length > 0}
          value={fullname}
          label="Full Name*"
          placeholder="Enter Your Full Name"
          onChange={onChange}
        />
        {errors && errors.length > 0 && fullname.length < 1 && (
          <div className="login_error">This field is mandatory</div>
        )}
      </div>
      <div className={'container-form_email'}>
        <TextInput
          required={true}
          name="email"
          type="email"
          errors={errors && errors.length > 0}
          value={email}
          label="Email address*"
          placeholder="Enter your email"
          onChange={onChange}
        />
        {errors && errors.length > 0 && !testEmail(email) && (
          <div className="login_error">Invalid email address</div>
        )}
      </div>
      <div>
        <div className="container-signupform_password">
          <TextInput
            required={true}
            className={'createPassword'}
            enableForgotPassword={enableForgotPassword}
            name="password"
            type="password"
            errors={errors && errors.length > 0}
            value={password}
            label="Create Password*"
            onChange={onChange}
            placeholder="Enter your password"
          />

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
        {errors && errors.length > 0 && checkPassword && (
          <div className="login_error">This field is mandatory</div>
        )}
      </div>

      <div className="container-comma_seperated">
        <TextInput
          enableForgotPassword={enableForgotPassword}
          name="commaSeperated"
          type="text"
          errors={false}
          value={commaSeperatedSkills}
          label="Skills"
          onChange={onChange}
          placeholder="Enter comma seperated skills"
        />
      </div>

      <div className="container-loginBtn">
        <Button title="Signup" type="primary" clickEvent={signupHandler} />
      </div>

      <div className="footer-signup">
        Have an account?{' '}
        <span
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </span>{' '}
      </div>
    </form>
  );
}
