import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import * as ROUTES from '../constants/Routes';
const initialState = {
  user: null,
  errors: null,
  role: null,
  snackbarMessage: null,
  breadcrumbStack: [{ to: ROUTES.PROFILE, title: 'Home' }],
  jobs: null,
  activeRoute: null,
  avatar: null,
  applicants: null,
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  if (decodedToken?.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

const AppContext = createContext({
  user: null,
  role: null,
  jobs: null,
  snackbarMessage: null,
  avatar: null,
  applicants: null,
  activeRoute: null,
  breadcrumbStack: [{ to: ROUTES.PROFILE, title: 'Home' }],
  getApplicants: (jobData) => {},
  getJobs: (userData) => {},
  updateSnackbarMessage: (message) => {},
  postJob: (jobPayload) => {},
  createAvatar: (username) => {},
  setActiveRoute: (route) => {},
  login: (userData) => {},
  pushToBreadcrumb: (routes) => {},
  popFromBreadcrum: (route) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };

    case 'GET_JOBS':
      return {
        ...state,
        jobs: action.payload,
      };

    case 'UPDATE_SNACKBAR_MESSAGE':
      return {
        ...state,
        snackbarMessage: action.payload,
      };

    case 'SET_ACTIVE_ROUTE':
      return {
        ...state,
        jobs: action.payload,
      };
    case 'CREATE_AVATAR':
      return {
        ...state,
        avatar: action.payload,
      };

    case 'PUSH_CRUMB':
      return {
        ...state,
        breadcrumbStack: action.payload,
      };

    case 'POP_CRUMB':
      return {
        ...state,
        breadcrumbStack: action.payload,
      };
    case 'GET_APPLICANTS':
      return {
        ...state,
        applicants: action.payload,
      };
    case 'POST_JOBS':
      return {
        ...state,
        jobs: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AppContextProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token);
    console.log('We here ', userData);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function setActiveRoute(route) {
    dispatch({
      type: 'SET_ACTIVE_ROUTE',
      payload: route,
    });
  }

  function updateSnackbarMessage(message) {
    dispatch({
      type: 'UPDATE_SNACKBAR_MESSAGE',
      payload: message,
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  function pushToBreadcrumb(routes) {
    console.log('Routes ', routes);
    dispatch({ type: 'PUSH_CRUMB', payload: routes });
  }

  function popFromBreadcrum(routes) {
    dispatch({ type: 'PUSH_CRUMB', payload: routes });
  }
  function getApplicants(jobData) {
    dispatch({
      type: 'GET_APPLICANTS',
      payload: jobData,
    });
  }

  function getJobs(userData) {
    dispatch({
      type: 'GET_JOBS',
      payload: userData,
    });
  }

  function postJob(jobPayload) {
    dispatch({
      type: 'POST_JOBS',
      payload: jobPayload,
    });
  }

  function createAvatar(username) {
    function capFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function generateName() {
      var first = capFirst(username);

      return first;
    }

    let generatedname = generateName();

    const generatedAvatar =
      'https://ui-avatars.com/api/?name=' +
      generatedname +
      '?size=100&rounded=true&uppercase=true&bold=true&background=#D9EFFF&color=#303F60';

    dispatch({
      type: 'CREATE_AVATAR',
      payload: generatedAvatar,
    });
  }

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        role: state.role,
        activeRoute: state.activeRoute,
        breadcrumbStack: state.breadcrumbStack,
        jobs: state.jobs,
        snackbarMessage: state.snackbarMessage,
        avatar: state.avatar,
        applicants: state.applicants,
        getApplicants,
        setActiveRoute,
        pushToBreadcrumb,
        updateSnackbarMessage,
        popFromBreadcrum,
        getJobs,
        postJob,
        createAvatar,
        login,
        logout,
      }}
      {...props}
    />
  );
}

export { AppContext, AppContextProvider };
