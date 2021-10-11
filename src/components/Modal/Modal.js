import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import notepad from '../../assets/icons/notepad.png';

import { GetCandidates } from '../../utils/AxiosHandler';
import closeIcon from '../../assets/icons/cancel.png';
import Cards from '../Cards/Cards';
const Modal = forwardRef((props, ref) => {
  const nestedRef = useRef(null);
  const [display, setDisplay] = useState(false);
  const [jobId, setJobsId] = useState(null);
  const [candidateList, setCandidateList] = useState(null);
  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close(),
      setId: (id) => setJobId(id),
    };
  });

  const setJobId = (id) => {
    console.log('id ', id);
    if (id !== jobId) {
      setJobsId(id);
    }
  };

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  const GetCandidatesArray = async () => {
    const response = await GetCandidates(jobId);
    if (response.success) {
      console.log('Result ', response);

      setCandidateList(response.results);
      // setSuccess(true);
      // setErrors(null);
      // setEmail('');
      // setPassword('');
      // context.login(response.results);
      // //   context.pushToBreadcrumb({ to: ROUTES.PROFILE, title: 'Home' });
      // history.push('/profile');
    } else {
      console.log('Result ', response);

      // setErrors(response.results);
      // setSuccess(false);
    }
  };
  useEffect(() => {
    if (jobId) {
      GetCandidatesArray();
    }
  }, [jobId]);

  const outsideClickHandler = (event) => {
    if (!nestedRef?.current?.contains(event.target)) {
      close();
    }
  };

  //NOTE the useEffect workaround before custom hook implementation
  useEffect(() => {
    document.addEventListener('mousedown', outsideClickHandler);

    return () => {
      document.removeEventListener('mousedown', outsideClickHandler);
    };
  });

  if (display) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper">
        <div className="modal-backdrop">
          <div className="modal-box" ref={nestedRef}>
            <div className="modal-header">
              <div className="title"> Applicants for this job</div>
              <img
                className="close"
                src={closeIcon}
                onClick={close}
                alt="close"
              />
            </div>
            <div className="modal-header_count">{`Total ${
              candidateList && candidateList.length > 0
                ? candidateList.length
                : 0
            } applicants`}</div>

            <div className="container_candidatelist">
              {candidateList && candidateList.length > 0 ? (
                candidateList.map((item, key) => (
                  <Cards
                    key={key}
                    type="applicantsCard"
                    title={item.name}
                    subtitle={item.email}
                    skills={item.skills}
                  />
                ))
              ) : (
                <div className="container-noapplicants">
                  <div className="icon">
                    <img src={notepad} alt="notepad icon" />
                  </div>
                  <div className="title">No applications available</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('portal')
    );
  }

  return null;
});

export default Modal;
