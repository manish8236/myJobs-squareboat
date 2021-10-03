import React from 'react';
import { Link } from 'react-router-dom';
import './BreadCrumbs.css';
import homeIcon from '../../assets/icons/homeIcon.png';
// import * as ROUTES from "../../constants/Routes"
const Breadcrumbs = ({ crumbs }) => {
  // Don't render a single breadcrumb.

  return (
    <div className="container-breadcrumb">
      {crumbs.map((item, key) =>
        item.title === 'Home' ? (
          <Link key={key} to={item.to}>
            <div className="container-crumbItem">
              <img src={homeIcon} alt="home icon" />
              <span> {item.title}</span>
            </div>
          </Link>
        ) : (
          <Link key={key} to={item.to}>
            <div className="crumbItem">{item.title}</div>
          </Link>
        )
      )}
      {/* Link back to any previous steps of the breadcrumb.
      {crumbs.map(({ name, path }, key) =>
        key + 1 === crumbs.length ? (
          <span key={key}>{name}</span>
        ) : (
          <Link key={key} to={path}>
            {name}
          </Link>
        )
      )} */}
    </div>
  );
};
export default Breadcrumbs;
