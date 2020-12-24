import Modal from "./Modal";
import useWindowSize from "../hooks/useWindowSize";

function ModalWithImage({ image, closeModal, showArrows }) {
  function handleClose() {
    closeModal();
  }
  const window = useWindowSize();
  return (
    <Modal
      closeModal={closeModal}
      showArrows={showArrows}
      children={
        <>
          <div onClick={handleClose} className="modal__overlay"></div>
          <div className="modal__image-container">
            {window.width > 849 && (
              <button
                onClick={handleClose}
                className="modal__close-button button"
              ></button>
            )}
            <img
              className="modal__image"
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
