import React, { useContext } from 'react';
import './JobPosts.css';
import { AppContext } from '../../context/AppContext';
import Cards from '../Cards/Cards';
//implement job cards
export default function JobPosts(props) {
  const { jobsExist } = props;
  const context = useContext(AppContext);
  return (
    <div className="container-jobposts">
      <div className="jobHeader">Jobs Posted by you</div>
      {/* <div className="container-jobposts_cards">
        {jobsExist &&
          context.jobs.data &&
          context.jobs.data.length > 0 &&
          context.jobs.data.map((item, key) => (
            <Cards
              key={key}
              title={item.title}
              subtitle={item.description}
              location={item.location}
              type="jobCard"
            />
          ))}
      </div> */}
    </div>
  );
}
