import React from "react";

function Modal({ closeModal, children, carousel, isModalWithCarouselOpen }) {
  // function handleCloseEvent() {
  //   closeModal();
  // }
  return <div className="modal">{children}</div>;
}

export default Modal;
