import { useEffect, useRef, useState } from "react";
import React from "react";
import useWindowSize from "../hooks/useWindowSize";
import Modal from "./Modal";

function ModalWithLink({
  link,
  setIsPopupVisible,
  _id,
  closeModal,
  isModalWithLinkOpen,
}) {
  const windowSize = useWindowSize();
  const popupRef = useRef();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isModalWithLinkOpen && windowSize.width >= 849) {
      closeModal();
    }
  }, [windowSize, isModalWithLinkOpen, closeModal]);

  useEffect(() => {
    const closePopup = () => {
      setIsMounted(false);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 500);
    };

    const handleClickEvent = (e) => {
      if (!e.target.id) {
        closePopup();
        return;
      } else if (e.target.id && e.target.id !== popupRef.current.id) {
        closePopup();
      }
    };

    if (windowSize.width > 849) {
      window.addEventListener("click", handleClickEvent);
    }
    return function removeEventListener() {
      if (windowSize.width > 849) {
        window.removeEventListener("click", handleClickEvent);
      }
    };
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const handleClose = (evt) => {
    evt.target.closest(".modal").classList.remove("modal_visible");
    closeModal();
  };

  return (
    <>
      {windowSize.width > 849 && (
        <div
          id={_id}
          ref={popupRef}
          className={`suppliers__popup ${
            isMounted ? "suppliers__popup_visible" : ""
          }`}
        >
          <>
            <a
              className="suppliers__link"
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              Открыть сайт производителя
            </a>
            <button className="suppliers__close-button"></button>
          </>
        </div>
      )}
      {windowSize.width <= 849 && (
        <Modal
          closeModal={closeModal}
          carousel={false}
          children={
            <>
              <div onClick={handleClose} className="modal__overlay"></div>
              <div className="modal__link-container">
                <p className="modal__link-text">
                  Открыть сайт производителя?
                </p>
                <a
                  className="modal__link"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть
                </a>
                <button
                  onClick={handleClose}
                  className="modal__close-button button modal__close-button_place_link"
                ></button>
              </div>
            </>
          }
        />
      )}
    </>
  );
}
export default ModalWithLink;
