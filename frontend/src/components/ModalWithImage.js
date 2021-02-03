import React from "react";
import Modal from "./Modal";
import useWindowSize from "../hooks/useWindowSize";

function ModalWithImage({ image, closeModal }) {
  function handleClose(evt) {
    evt.target.closest('.modal').classList.remove('modal_visible');
    closeModal();
  }
  const window = useWindowSize();
  return (
    <Modal
      closeModal={closeModal}
      carousel={false}
      children={
        <>
          <div onClick={handleClose} className="modal__overlay"></div>
          <div className="modal__image-container modal__image-container_type_regular">
            {window.width > 849 && (
              <button
                onClick={handleClose}
                className="modal__close-button button"
              ></button>
            )}
            <img
              className="modal__image modal__image_type_regular"
              src={image}
              alt="Картинка модального окна"
            />
          </div>
        </>
      }
    />
  );
}
export default ModalWithImage;
