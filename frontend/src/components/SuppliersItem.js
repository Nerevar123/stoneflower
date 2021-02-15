import React, { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import ModalWithLink from "./ModalWithLink";

function SuppliersItem({ item, id, showModal }) {
  const window = useWindowSize();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const showPopup = () => {
    window.width > 849?setIsPopupVisible(true):showModal(item.link)
  };
  return (
    <li id={`${id}_${item._id}`} className="suppliers__list-item" onClick={showPopup}>
      <div className="suppliers__logo-container">
        <img className="suppliers__logo" alt="Логотип" src={item.logo} />
      </div>
      {isPopupVisible && window.width > 849 && (
        <ModalWithLink
          _id={`${id}_${item._id}`}
          setIsPopupVisible={setIsPopupVisible}
          link={item.link}
          i
        />
      )}
    </li>
  );
}

export default SuppliersItem;
