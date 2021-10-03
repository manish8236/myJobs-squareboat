import React, { useContext, useState } from 'react';
import './Header.css';
import Button from '../Button/Button';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import dropdown from '../../assets/icons/dropdown.png';
import useToggle from '../../hooks/useToggle';
import * as ROUTES from '../../constants/Routes';

function Header(props) {
  const context = useContext(AppContext);
  const { type } = props;

  const [isOpen, setIsOpen] = useToggle();

  const handleBreadcrumb = () => {
    // console.log('Current stack ', context.breadcrumbStack);
    // const newArray = [
    //   ...context.breadcrumbStack,
    //   { to: ROUTES.POST_JOB, title: ' > Post a Job' },
    // ];
    // context.pushToBreadcrumb(newArray);
  };

  const navigateToLogin = () => {
    console.log('clicked !');
    props.history.push('/login');
  };

  const logoutHandler = () => {
    context.logout();
  };
  //   const navigateToHome = () => {
  //     console.log('clicked !');
  //     props.history.
  //   };

  if (type === 'primary') {
    return (
      <div className="container-header">
        <div className="container-header_logo">
          My<span className="container-header__span">Jobs</span>
        </div>

        <div>
          <Button
            clickEvent={navigateToLogin}
            title="Login/Signup"
            type="secondary"
          />
        </div>
      </div>
    );
  } else if (type === 'secondary') {
    return (
      <div className="container-header">
        <Link to="/">
          <div className="container-header_logo">
            My<span className="container-header__span">Jobs</span>
          </div>
        </Link>

        <div>
          {/* <Button
            clickEvent={navigateToLogin}
            title="Login/Signup"
            type="secondary"
          /> */}
        </div>
      </div>
    );
  } else if (type === 'loggedIn') {
    return (
      <div className="container-header">
        {context.user ? (
          <Link to="/profile">
            <div className="container-header_logo">
              My<span className="container-header__span">Jobs</span>
            </div>
          </Link>
        ) : (
          <Link to="/">
            <div className="container-header_logo">
              My<span className="container-header__span">Jobs</span>
            </div>
          </Link>
        )}

        <div className="container-header_right">
          <NavLink to={ROUTES.POST_JOB} activeClassName="linkactive">
            <div className="container-postJob" onClick={handleBreadcrumb}>
              Post a Job
            </div>
          </NavLink>
          <div className="container-dropdown" onClick={setIsOpen}>
            <div className="name-avatar">
              {context.user.name.charAt(0).toUpperCase()}
            </div>
            <div className="expand-arrow">
              <img src={dropdown} alt="dropdown icon" />
            </div>

            {isOpen ? (
              <div className="dropdown-menu">
                <div className="container-triangle">
                  <div className="triangle"></div>
                </div>
                <div className="logout" onClick={logoutHandler}>
                  Logout
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Header;
