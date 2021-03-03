import React, { useEffect } from "react";

function AdminPopup({ title, popupVisible, setPopupVisible, children }) {
  useEffect(() => {
    setPopupVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`popup admin__popup ${
        popupVisible ? "admin__popup_visible" : ""
      }`}
    >
      <div className="admin__popup-container">
        <button className="admin__close-button button"></button>
        <h3 className="admin__popup-title">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default AdminPopup;
