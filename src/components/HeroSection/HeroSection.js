import React from 'react';
import './HeroSection.css';
import banner from '../../assets/images/banners/banner.jpg';

import Button from '../Button/Button';
export default function HeroSection() {
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
          <Button title="Get Started" type="primary" />
        </div>
      </div>
      <div className="container-hero_right">
        <img src={banner}></img>
      </div>
    </div>
  );
}
