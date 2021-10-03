import * as ROUTES from './Routes';
import Profile from '../pages/recruiters/Profile';
import PostJob from '../pages/recruiters/PostJob';
export default [
  { path: ROUTES.PROFILE, name: 'Home', Component: Profile },
  { path: ROUTES.POST_JOB, name: 'Post a Job', Component: PostJob },
];
