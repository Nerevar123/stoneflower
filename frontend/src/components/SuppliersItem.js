import React, { useState } from "react";
import ModalWithLink from "./ModalWithLink";

function SuppliersItem({ item, id }) {
  // console.log(item);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const showPopup = () => {
    setIsPopupVisible(true);
  };
  return (
    <li id={`${id}_${item._id}`} className="suppliers__list-item" onClick={showPopup}>
      <div className="suppliers__logo-container">
        <img className="suppliers__logo" alt="Логотип" src={item.logo} />
      </div>
      {isPopupVisible && (
        <ModalWithLink
          _id={`${id}_${item._id}`}
          isPopupVisible={isPopupVisible}
          setIsPopupVisible={setIsPopupVisible}
          link={item.link}
          i
        />
      )}
    </li>
  );
}

export default SuppliersItem;
