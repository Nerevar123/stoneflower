import React, {useEffect, useState} from "react";

function Modal({ closeModal, children, carousel, isModalWithCarouselOpen }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  },[])
  return <div className={`modal ${isMounted?'modal_visible':''}`}>{children}</div>;
}

export default Modal;
