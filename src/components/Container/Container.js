import React from 'react';
import './Container.css';

function Container(props) {
  const {
    heroSection,
    header,
    recruiterContainer,
    bottomSection,
    form,
    breadcrumbs,
    posts,
    paginator,
  } = props;

  if (recruiterContainer) {
    return (
      <div className="container-landing">
        {form}
        <div className="container-landing_top__recruiter">
          {header}
          {heroSection}

          <div className="container-landing__divider"></div>
          {breadcrumbs}
          {posts}
        </div>
        <div className="container-landing_bottom__recruiter">
          {bottomSection}
          {paginator}
        </div>
      </div>
    );
  } else
    return (
      <div className="container-landing">
        {form}
        <div className="container-landing_top">
          {header}
          {heroSection}

          <div className="container-landing__divider"></div>
          {breadcrumbs}
          {posts}
        </div>
        <div className="container-landing_bottom">
          {bottomSection}
          {paginator}
        </div>
      </div>
    );
}

export default Container;
