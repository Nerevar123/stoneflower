import React, { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import ModalWithLink from "./ModalWithLink";

function SuppliersItem({ item, id, showModal }) {
  const size = useWindowSize();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const showPopup = () => {
    size.width > 849 ? setIsPopupVisible(true) : showModal(item.link);
  };
  return (
    <li
      id={`${id}_${item._id}`}
      className="suppliers__list-item"
      onClick={showPopup}
    >
      <div className="suppliers__logo-container">
        <img
          className="suppliers__logo"
          alt="Логотип"
          src={
            item.image.path
              ? process.env.REACT_APP_URL + item.image.path
              : item.image
          }
        />
      </div>
      {isPopupVisible && size.width > 849 && (
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
