import React, { useState, useContext, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import './Pagination.css';
import notepad from '../../assets/icons/notepad.png';

import Cards from '../Cards/Cards';
import Modal from '../Modal/Modal';
import ReactPaginate from 'react-paginate';
import { AppContext } from '../../context/AppContext';

export default function Pagination(props) {
  const { jobsExist } = props;
  const modalRef = useRef(null);
  const openModal = () => {
    //TODO add ref open here
    modalRef.current.openModal();
  };

  const setJobId = (id) => {
    modalRef.current.setId(id);
  };
  const closeModal = () => {
    modalRef.current.closeModal();
  };
  const context = useContext(AppContext);
  const [users, setUsers] = useState(
    context.jobs?.data ? context.jobs.data : []
  );
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    if (context.jobs && context.jobs.data.length > 0) {
      setUsers(context.jobs.data);
    }
  }, [context.jobs]);

  const viewCandidates = async (id) => {
    setJobId(id);
    openModal();
  };
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  console.log('Usersss', users, context.jobs);
  const displayUsers =
    users &&
    users.slice(pagesVisited, pagesVisited + usersPerPage).map((user, key) => {
      return (
        <Cards
          key={key}
          title={user.title}
          subtitle={user.description}
          location={user.location}
          type="jobCard"
          btnAction={() => {
            viewCandidates(user.id);
          }}
        />
      );
    });

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (!jobsExist) {
    return (
      <div className="container-nojobs">
        <div className="icon">
          <img src={notepad} alt="notepad icon" />
        </div>
        <div className="title">Your posted jobs will show here!</div>
        <Button type="primary" title="Post a Job" />
      </div>
    );
  } else
    return (
      <div className="container-paginator">
        <Modal ref={modalRef}></Modal>
        {context.jobs.data && (
          <>
            <div className="container-jobposts_cardsp">{displayUsers}</div>
            <div className="react-paginate">
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'paginationBttns'}
                previousLinkClassName={'previousBttn'}
                nextLinkClassName={'nextBttn'}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
              />
            </div>
          </>
        )}
      </div>
    );
}
