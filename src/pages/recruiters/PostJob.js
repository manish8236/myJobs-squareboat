import React, { useContext, useEffect } from 'react';
import { Container, Header, Form, BreadCrumbs } from '../../components';

import { AppContext } from '../../context/AppContext';

import * as ROUTES from '../../constants/Routes';

export default function PostJob(props) {
  const context = useContext(AppContext);
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
      breadcrumbs={<BreadCrumbs />}
      form={<Form type="postJob" enableForgotPassword={false} />}
    />
  );
}
