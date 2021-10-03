import React from 'react';
import WhyUsData from '../../constants/WhyUs';
import Companies from '../../constants/Companies';
import Cards from '../Cards/Cards';
import './BottomSection.css';
export default function BottomSection() {
  return (
    <div className="container-bottom">
      <h3>Why us</h3>
      <div className="container-whyus">
        {WhyUsData.map((item, index) => (
          <Cards
            key={index}
            type="basic"
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </div>
      <h3>Companies Who Trust Us</h3>
      <div className="container-companies">
        {Companies.map((item, index) => (
          <img className="companyLogos" key={index} src={item.image} />
        ))}
      </div>
    </div>
  );
}
