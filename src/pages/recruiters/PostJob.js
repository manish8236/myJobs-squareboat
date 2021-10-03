import React, { useContext, useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Form from '../../components/Form/Form';
import { AppContext } from '../../context/AppContext';
import Breadcrumbs from '../../components/Breadcrumbs/BreadCrumbs';
import JobPosts from '../../components/JobPostsSection/JobPosts';
import Pagination from '../../components/Pagination/Pagination';
import * as ROUTES from '../../constants/Routes';

export default function PostJob(props) {
  const context = useContext(AppContext);
  const [jobsExist, setJobsExist] = useState(false);
  useEffect(() => {
    console.log('Stack log ', context.breadcrumbStack);

    if (
      context.breadcrumbStack &&
      context.breadcrumbStack.length > 0 &&
      context.breadcrumbStack.filter((item) => item.to === ROUTES.POST_JOB)
        .length > 0
    ) {
      console.log('already exists');
    } else {
      const newArray = [
        { to: ROUTES.PROFILE, title: 'Home' },
        { to: ROUTES.POST_JOB, title: ' > Post a Job' },
      ];
      context.pushToBreadcrumb(newArray);
    }

    return () => {
      const newArray = [{ to: ROUTES.PROFILE, title: 'Home' }];
      context.pushToBreadcrumb(newArray);
    };
  }, []);

  return (
    <Container
      recruiterContainer={false}
      header={<Header type="loggedIn" history={props.history} />}
      breadcrumbs={<Breadcrumbs />}
      form={<Form type="postJob" enableForgotPassword={false} />}
    />
  );
}
