import React from "react";

function AdminPopup({
  title,
  // name,
  // buttonText = "Сохранить",
  // onClose,
  // onSubmit,
  // isSaving,
  children,
  // isDisabled,
}) {
  return (
    <div className="popup admin__popup">
      <div className="admin__popup-container">
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
