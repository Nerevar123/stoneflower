import React from 'react';

function Modal({ image, closeModal, children }) {
  function handleCloseEvent() {
    closeModal();
  }
  return (
    <div className="modal">
      {children}
    </div>
  )



}

export default Modal;
