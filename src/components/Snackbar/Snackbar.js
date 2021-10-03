import React, {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useContext,
} from 'react';
import ReactDOM from 'react-dom';
import closeIcon from '../../assets/icons/cancelred.png';

import { AppContext } from '../../context/AppContext';
import './Snackbar.css';

const Snackbar = forwardRef((props, ref) => {
  const context = useContext(AppContext);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessageActive, setSnackbarMessageActive] = useState(false);
  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
    },
  }));

  useEffect(() => {
    if (context.snackbarMessage && !snackbarMessageActive) {
      setShowSnackbar(true);
      setSnackbarMessageActive(true);
      setTimeout(() => {
        setShowSnackbar(false);
        setSnackbarMessageActive(false);
        context.updateSnackbarMessage(null);
      }, 3000);
    }
  }, [context.snackbarMessage]);

  return ReactDOM.createPortal(
    <div className="snackbar" id={showSnackbar ? 'show' : 'hide'}>
      <div className="close">
        <img
          className="closeSnack"
          src={closeIcon}
          onClick={() => {
            setShowSnackbar(false);
            setSnackbarMessageActive(false);
            context.updateSnackbarMessage(null);
          }}
          alt="close"
        />
      </div>
      <div className="snacktitle">{context.snackbarMessage?.title}</div>
      <div className="messagesubtitle">{context.snackbarMessage?.subtitle}</div>
    </div>,
    document.getElementById('portal')
  );
});

export default Snackbar;
