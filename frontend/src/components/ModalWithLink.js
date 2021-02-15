import { useEffect, useRef, useState } from "react";
import React from "react";

function ModalWithLink({ link, setIsPopupVisible, isPopupVisible, _id }) {
  console.log(_id);
  const popupRef = useRef();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const closePopup = () => {
      setIsMounted(false);
        setTimeout(() => {
          setIsPopupVisible(false);
        }, 500);
    }
    const handleClickEvent = (e) => {
      if (!e.target.id) {
        closePopup();
        return;
      } else if (e.target.id && e.target.id !== popupRef.current.id) {
        closePopup();
      }
    };
    window.addEventListener("click", handleClickEvent);
    return function removeEventListener() {
      window.removeEventListener("click", handleClickEvent);
    };
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div
      id={_id}
      ref={popupRef}
      className={`suppliers__popup ${
        isMounted ? "suppliers__popup_visible" : ""
      }`}
    >
      <a
        className="suppliers__link"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        Открыть сайт производителя
      </a>
      <button className="suppliers__close-button">

      </button>
    </div>
  );
}
export default ModalWithLink;
