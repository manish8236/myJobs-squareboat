import React from 'react';
import Button from '../Button/Button';
import './Cards.css';
import pin from '../../assets/icons/pin.png';
export default function Cards(props) {
  const { type, title, subtitle, location, btnAction } = props;

  if (type === 'jobCard') {
    return (
      <div className="container-jobcard">
        <div className="container-card_title">{title}</div>

        <div className="container-card_subtitle">{subtitle}</div>
        <div className="container-card_footer">
          <div className="location">
            <img src={pin} alt="location" />
            <span>{location}</span>
          </div>
          <Button
            type="light"
            title="View Applications"
            clickEvent={btnAction}
          />
        </div>
      </div>
    );
  } else if (type === 'applicantsCard') {
    return (
      <div className="container-applicantscard">
        <div className="container-cardheaader">
          <div className="name-avatar">{title.charAt(0).toUpperCase()}</div>

          <div className="cardheader_textcontainer">
            <div className="cardheader_title">{title}</div>
            <div className="cardheader_subtitle">{subtitle}</div>
          </div>
        </div>

        <div className="container-cardfooter">
          <div className="cardheader_textcontainer">
            <div className="cardheader_title">Skills</div>
            <div className="cardheader_subtitle">{props.skills}</div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="container-card">
        <div className="container-card_title">{title}</div>

        <div className="container-card_subtitle">{subtitle}</div>
      </div>
    );
}
