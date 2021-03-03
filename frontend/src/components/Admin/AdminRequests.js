import React, { useState, useEffect } from "react";
import AdminPopup from "./AdminPopup";
import ClosablePopup from "../ClosablePopup";

function AdminRequests({ requests }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [popupVisible, setPopupVisible] = useState(true);

  const handleRequestItemClick = (evt) => {
    const message = requests.find(
      (item) => item._id === evt.target.closest("li").id
    );
    setSelectedMessage(message);
    document.body.style.overflow = "hidden";
  };


  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Заявки</h2>
        <div className="admin__form">
          <div className="admin__form-heading-container">
            <p className="admin__form-heading">Пришедшие заявки</p>
          </div>
          <div className="admin__table-titles">
            <p className="admin__table-title">Дата</p>
            <p className="admin__table-title">Телефон</p>
            <p className="admin__table-title">Имя</p>
          </div>
          <ul className="admin__table admin__table_place_requests">
            {requests.map((item) => (
              <li
                className="admin__table-item"
                onClick={handleRequestItemClick}
                key={item._id}
                id={item._id}
              >
                <span className="admin__table-text admin__table-text_place_requests">
                  {item.createdAt.toString().slice(0, 16).replace(/\T/, " ")}
                </span>
                <span className="admin__table-text admin__table-text_place_requests">
                  {item.tel}
                </span>
                <span className="admin__table-text admin__table-text_place_requests">
                  {item.name}
                </span>
                <div className="admin__table-buttons">
                  <button className="admin__table-button admin__table-button_type_delete"></button>
                </div>
              </li>
            ))}
          </ul>
          {selectedMessage && (
            <ClosablePopup>
              <AdminPopup
                title="Заявка"
                onClose={() => {
                  setPopupVisible(false);
                  setSelectedMessage(null);
                  document.body.style.overflow = "unset";
                }}
                popupVisible={popupVisible}
                setPopupVisible={setPopupVisible}
                children={
                  <div className="admin__message-container">
                    <p className="admin__form-heading">
                      {" "}
                      Имя: {selectedMessage.name}
                    </p>
                    <p className="admin__form-heading">
                      {" "}
                      Телефон: {selectedMessage.tel}
                    </p>
                    <p className="admin__form-heading">
                      {" "}
                      Почта: {selectedMessage.email}
                    </p>
                    <textarea className="admin__request-message" defaultValue={selectedMessage.description}>

                    </textarea>
                  </div>
                }
              />
            </ClosablePopup>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminRequests;
