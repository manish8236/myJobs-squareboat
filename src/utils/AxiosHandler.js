import axios from 'axios';
axios.defaults.baseURL = 'https://jobs-api.squareboat.info/api/v1/';
export const Login = async (body) => {
  return axios
    .post('/auth/login', {
      email: body.email,
      password: body.password,
    })
    .then((results) => {
      console.log('Results ', results.data);
      const success = results.data?.success;

      return { success, results: results.data?.data };
    })
    .catch((error) => {
      const errors = error?.response?.data?.errors;
      const success = error?.response?.data?.success;
      console.log('Errors', errors);
      return { success, results: errors };
    });
};

export const Forgot = async (email) => {
  return axios
    .get('/auth/resetpassword', { params: { email } })
    .then((results) => {
      console.log('Results ', results.data);
      const success = results.data?.success;

      return { success, results: results.data?.data };
    })
    .catch((error) => {
      const errors = error?.response?.data?.errors;
      const success = error?.response?.data?.success;
      console.log('Errors', errors);
      return { success, results: errors };
    });
};

export const GetJobsPosted = async () => {
  const token = localStorage.getItem('jwtToken');
  return axios
    .get('/recruiters/jobs', { headers: { Authorization: `${token}` } })
    .then((results) => {
      console.log('Results ', results.data);
      const success = results.data?.success;

      return { success, results: results.data?.data };
    })
    .catch((error) => {
      const errors = error?.response?.data?.errors;
      const success = error?.response?.data?.success;
      console.log('Errors', errors);
      return { success, results: errors };
    });
};

export const GetCandidates = async (jobId) => {
  const token = localStorage.getItem('jwtToken');
  return axios
    .get(`/recruiters/jobs/${jobId}/candidates`, {
      headers: { Authorization: `${token}` },
    })
    .then((results) => {
      console.log('Results ', results.data);
      const success = results.data?.success;

      return { success, results: results.data?.data };
    })
    .catch((error) => {
      const errors = error?.response?.data?.errors;
      const success = error?.response?.data?.success;
      console.log('Errors', errors);
      return { success, results: errors };
    });
};

export const Reset = async (body) => {
  return axios
    .post('/auth/resetpassword', {
      password: body.password,
      confirmPassword: body.confirmPassword,
      token: localStorage.getItem('resetToken'),
    })
    .then((results) => {
      console.log('Results ', results.data);
      const success = results.data?.success;

      return { success, results: results.data?.data };
    })
    .catch((error) => {
      const errors = error?.response?.data?.errors;
      const success = error?.response?.data?.success;
      console.log('Errors', errors);
      return { success, results: errors };
    });
};

export const Signup = async (body) => {
  return axios
    .post('/auth/register', {
      email: body.email,
      userRole: body.userRole,
      password: body.password,
      confirmPassword: body.confirmPassword,
      name: body.name,
      skills: body.skills,
    })
    .then((results) => {
      console.log('Results ', results.data);
      const success = results.data?.success;

      return { success, results: results.data?.data };
    })
    .catch((error) => {
      const errors = error?.response?.data?.errors;
      const success = error?.response?.data?.success;
      console.log('Errors', errors);
      return { success, results: errors };
    });
};
