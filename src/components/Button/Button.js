import React, { useState } from 'react';
import './Button.css';
export default function Button(props) {
  const { title, type, clickEvent, icon, disabled } = props;
  var btnStyle = 'container-authbtn';
  type === 'light'
    ? (btnStyle = 'container-btnlight')
    : type == 'primary'
    ? (btnStyle = 'container-btnprimary')
    : 'container-authbtn';

  if (icon) {
    return (
      <div
        onClick={clickEvent}
        className={
          disabled ? 'iconbtn-container_disabled' : 'iconbtn-container'
        }
      >
        <img className="btnIconImage" src={icon} />
        <div className="btnTitle">{title}</div>
      </div>
    );
  } else
    return (
      <div onClick={clickEvent} className={btnStyle}>
        {title}
      </div>
    );
}
