import React, { useEffect } from "react";
import Modal from "./Modal";

function ModalWithImage({ image, closeModal }) {
  function handleClose(evt) {
    evt.target.closest('.modal').classList.remove('modal_visible');
    closeModal();
  }

  useEffect(() => {
    function closeModalWithEsc(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", closeModalWithEsc);

    return () => {
      document.removeEventListener("keydown", closeModalWithEsc);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      closeModal={closeModal}
      carousel={false}
      children={
        <>
          <div onClick={handleClose} className="modal__overlay"></div>
          <div className="modal__image-container modal__image-container_type_regular">
              <button
                onClick={handleClose}
                className="modal__close-button button"
              ></button>
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
