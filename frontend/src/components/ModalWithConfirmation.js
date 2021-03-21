import React from "react";
import Modal from "./Modal";

function ModalWithConfirmation({ closeModal }) {
  function handleClose(evt) {
    evt.target.closest(".modal").classList.remove("modal_visible");
    closeModal();
  }
  return (
    <Modal
      closeModal={closeModal}
      carousel={false}
      children={
        <>
          <div onClick={handleClose} className="modal__overlay"></div>
          <div className="modal__message-container">
            <p className="modal__submit-message">
              {`Спасибо за вашу заявку!
              В ближайшее время мы с вами свяжемся.`}
            </p>
            <button className="modal__button button" onClick={handleClose}>
              ок
            </button>
          </div>
        </>
      }
    />
  );
}
export default ModalWithConfirmation;
