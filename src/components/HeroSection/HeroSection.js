import React from 'react';
import './HeroSection.css';
import banner from '../../assets/images/banners/banner.jpg';
import { useHistory } from 'react-router';
import Button from '../Button/Button';
import * as ROUTES from '../../constants/Routes';
export default function HeroSection() {
  const history = useHistory();
  return (
    <div className="container-hero">
      <div className="container-hero_left">
        <div className="container-heroText">
          <div className="heroText_text">Welcome To</div>
          <div className="heroText_logo">
            My<span className="heroText_logo__span">Jobs</span>
          </div>
        </div>
        <div className="container-heroBtn">
          <Button
            title="Get Started"
            type="primary"
            clickEvent={() => {
              history.push(ROUTES.LOGIN);
            }}
          />
        </div>
      </div>
      <div className="container-hero_right">
        <img className="heroimage" src={banner}></img>
      </div>
    </div>
  );
}
