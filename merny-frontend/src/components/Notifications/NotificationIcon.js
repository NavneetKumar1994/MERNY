import React, { useState } from 'react';
import Notifications from './Notifications';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../../styles/NotifIcon.css'

Modal.setAppElement('#root'); // Set the root element for modal accessibility

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
  },
};

const NotificationIcon = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="icon-container">
      <div onClick={handleClick}>
        <FontAwesomeIcon icon={faBell} className='icon' />
      </div>

      {/* <Modal isOpen={showModal} onRequestClose={handleCloseModal} > */}
         <div className="icon-pop-up">
            <Notifications />
         </div>
        {/* <button onClick={handleCloseModal}>Close Modal</button> */}
      {/* </Modal> */}
    </div>
  );
};

export default NotificationIcon;
