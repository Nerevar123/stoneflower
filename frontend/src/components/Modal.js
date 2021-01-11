import React from 'react';

function Modal({ closeModal, children, carousel }) {
  function handleCloseEvent() {
    closeModal();
  }
  return (
    <div className={`modal ${carousel?'modal_type_carousel':''}`}>
      {children}
    </div>
  )



}

export default Modal;
