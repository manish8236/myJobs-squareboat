import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/Routes';
import { AppContextProvider } from './context/AppContext';
import AuthRecruiter from './utils/AuthRecruiter';
import Snackbar from './components/Snackbar/Snackbar';

//Lazy Loading Pages
const Login = lazy(() => import('./pages/recruiters/Login'));
const Signup = lazy(() => import('./pages/recruiters/Signup'));
const Profile = lazy(() => import('./pages/recruiters/Profile'));
const LandingPage = lazy(() => import('./pages/recruiters/LandingPage'));
const ForgotPassword = lazy(() => import('./pages/recruiters/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/recruiters/ResetPassword'));
const PostJob = lazy(() => import('./pages/recruiters/PostJob'));
//Lazy loading Pages

const App = (props) => {
  return (
    <>
      <AppContextProvider>
        <Router>
          <Suspense
            fallback={() => {
              console.log('Loading');
            }}
          >
            <Switch>
              <Route exact path={ROUTES.LANDING_PAGE} component={LandingPage} />
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGNUP} component={Signup} />
              <AuthRecruiter path={ROUTES.PROFILE} component={Profile} />
              <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
              <Route path={ROUTES.RESET_PASS} component={ResetPassword} />
              <AuthRecruiter path={ROUTES.POST_JOB} component={PostJob} />
            </Switch>
          </Suspense>
        </Router>
        <Snackbar />
      </AppContextProvider>
    </>
  );
};

export default App;
