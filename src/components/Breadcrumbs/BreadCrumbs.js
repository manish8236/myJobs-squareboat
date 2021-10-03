import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BreadCrumbs.css';
import homeIcon from '../../assets/icons/homeIcon.png';
import { AppContext } from '../../context/AppContext';
// import * as ROUTES from "../../constants/Routes"
const Breadcrumbs = () => {
  const context = useContext(AppContext);
  // Don't render a single breadcrumb.
  useEffect(() => {
    console.log('Check stack ', context.breadcrumbStack);
  }, [context.breadcrumbStack]);

  return (
    <div className="container-breadcrumb">
      {context.breadcrumbStack &&
        context.breadcrumbStack.length > 0 &&
        context.breadcrumbStack.map((item, key) =>
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
