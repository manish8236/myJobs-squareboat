import React, { useContext, useEffect } from 'react';

import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import BottomSection from '../../components/BottomSection/BottomSection';
import Container from '../../components/Container/Container';
import { AppContext } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/Routes';
function LandingPage(props) {
  const context = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    if (context.user && context.user.userRole === 0) {
      history.push(ROUTES.PROFILE);
    }
  }, [context.user]);
  return (
    <Container
      header={<Header type="primary" history={props.history} />}
      heroSection={<HeroSection />}
      bottomSection={<BottomSection />}
    />
  );
}

export default LandingPage;
