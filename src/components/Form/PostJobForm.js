import React, { useState } from 'react';
import './Form.css';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { PostJob } from '../../utils/AxiosHandler';
import * as ROUTES from '../../constants/Routes';
export default function PostJobForm(props) {
  const history = useHistory();
  const [jobTitle, setjobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(null);

  const postJobHandler = async () => {
    console.log('clicked');

    const response = await PostJob({ title: jobTitle, description, location });
    console.log('Response ', response);

    if (response.success) {
      setSuccess(true);
      setErrors(null);
      setjobTitle('');
      setDescription('');
      setLocation('');

      history.push(ROUTES.PROFILE);
    } else {
      setErrors(response.results);
      setSuccess(false);
    }
  };

  const onChange = (e) => {
    console.log('e', e.target.name);
    if (e.target.name === 'jobtitle') {
      setjobTitle(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    }

    if (e.target.name === 'location') {
      setLocation(e.target.value);
    }
  };

  return (
    <form className="container-postjobform">
      <div className="title">Post a job</div>

      <div className="container-form_password">
        <TextInput
          name="jobtitle"
          type="text"
          errors={errors && errors.length > 0}
          value={jobTitle}
          label="Job Title*"
          onChange={onChange}
          placeholder="Enter your job title"
        />
      </div>
      <div className={'container-form_email'}>
        <TextInput
          variant="textarea"
          name="description"
          type="text"
          errors={errors && errors.length > 0}
          value={description}
          label="Description*"
          onChange={onChange}
          placeholder="Enter job description"
        />
      </div>
      <div className={'container-form_email'}>
        <TextInput
          name="location"
          type="text"
          errors={errors && errors.length > 0}
          value={location}
          label="Location*"
          onChange={onChange}
          placeholder="Enter job location"
        />
        {errors && errors.length > 0 && (
          <div className="login_error">All fields are mandatory</div>
        )}
      </div>

      <div className="container-loginBtn">
        <Button title="Post" type="primary" clickEvent={postJobHandler} />
      </div>
    </form>
  );
}
