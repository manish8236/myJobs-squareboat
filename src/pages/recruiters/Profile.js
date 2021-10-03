import React, { useContext, useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import { AppContext } from '../../context/AppContext';
import Breadcrumbs from '../../components/Breadcrumbs/BreadCrumbs';
import JobPosts from '../../components/JobPostsSection/JobPosts';
import Pagination from '../../components/Pagination/Pagination';
import { GetJobsPosted } from '../../utils/AxiosHandler';

export default function Profile(props) {
  const context = useContext(AppContext);
  const [jobsExist, setJobsExist] = useState(false);
  useEffect(() => {
    console.log('Stack log ', context.breadcrumbStack);
  }, [context.breadcrumbStack]);

  const getJobsPosted = async () => {
    const response = await GetJobsPosted();
    if (response.success) {
      console.log('here', response);
      if (response?.results?.data && response?.results?.data.length > 0) {
        context.getJobs(response.results);
        setJobsExist(true);
      }
    } else {
      console.log(response);
      setJobsExist(false);

      // setErrors(response.results);
      // setSuccess(false);
    }
  };

  useEffect(() => {
    //Get jobs posts;
    getJobsPosted();

    return () => {
      const newArray = context.breadcrumbStack.pop();
      console.log('Umounting profile', newArray);
      context.popFromBreadcrum(newArray);
    };
  }, []);

  return (
    <Container
      recruiterContainer={true}
      header={<Header type="loggedIn" history={props.history} />}
      breadcrumbs={<Breadcrumbs crumbs={context.breadcrumbStack} />}
      posts={<JobPosts jobsExist={jobsExist} />}
      paginator={<Pagination jobsExist={jobsExist} />}
    />
  );
}
