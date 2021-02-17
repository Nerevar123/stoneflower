import React, { useEffect } from "react";

function AdminPopup({
  title,
  popupVisible,
  setPopupVisible,
  // name,
  // buttonText = "Сохранить",
  // onClose,
  // onSubmit,
  // isSaving,
  children,
  // isDisabled,
}) {
  useEffect(() => {
    setPopupVisible(true);
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
        {/* <Form
          name={name}
          onSubmit={onSubmit}
          isDisabled={isDisabled}
          isSaving={isSaving}
          buttonText={buttonText}
          children={children}
        /> */}
      </div>
    </div>
  );
}

export default AdminPopup;
