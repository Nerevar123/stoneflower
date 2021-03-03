import React, { useState } from "react";
import AdminPopup from "./AdminPopup";
import ClosablePopup from "../ClosablePopup";
import { deleteEmail } from "../../utils/api";

function AdminRequests({ requests, onDeleteData }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedForDeleteMessage, setSelectedForDeleteMessage] = useState(
    null
  );
  const [popupVisible, setPopupVisible] = useState(true);
  const [delMessage, setDelMessage] = useState(false);

  const getSelectedMessage = (evt) => {
    return requests.find((item) => item._id === evt.target.closest("li").id);
  };

  const handleMessageItemClick = (evt) => {
    const message = getSelectedMessage(evt);
    setSelectedMessage(message);
    document.body.style.overflow = "hidden";
  };

  function isValidDate(date) {
    const dateWrapper = new Date(date);
    return !isNaN(dateWrapper.getDate());
  }
  function handleDeleteClick(evt) {
    setDelMessage(true);
    const message = getSelectedMessage(evt);
    setSelectedForDeleteMessage(message);
  }

  function handleDeleteMessage() {
    console.log(selectedForDeleteMessage);
    onDeleteData(selectedForDeleteMessage._id, deleteEmail);
  }

  function formatDate(date) {
    if (!isValidDate(date)) return null;

    return date.toString().slice(0, 16).replace(/T/, " ");
  }
  function closeAllPopups() {
    setPopupVisible(false);
    setTimeout(() => {
      setDelMessage(false);
      setSelectedMessage(null);
      setSelectedForDeleteMessage(null);
    }, 300);
  }

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
              <li className="admin__table-item admin__table-item_place_requests" key={item._id} id={item._id}>
                <div
                  className="admin__table-text-container"
                  onClick={handleMessageItemClick}
                >
                  <span className="admin__table-text admin__table-text_place_requests">
                    {formatDate(item.createdAt)}
                  </span>
                  <span className="admin__table-text admin__table-text_place_requests">
                    {item.tel}
                  </span>
                  <span className="admin__table-text admin__table-text_place_requests">
                    {item.name}
                  </span>
                </div>
                <div className="admin__table-buttons admin__table-buttons_place_requests">
                  <button
                    onClick={handleDeleteClick}
                    className="admin__table-button admin__table-button_type_delete"
                  ></button>
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
                    <textarea
                      className="admin__request-message"
                      defaultValue={selectedMessage.description}
                    ></textarea>
                  </div>
                }
              />
            </ClosablePopup>
          )}
          {delMessage && (
            <ClosablePopup>
              <AdminPopup
                title="Удалить производителя?"
                onClose={closeAllPopups}
                popupVisible={popupVisible}
                setPopupVisible={setPopupVisible}
                children={
                  <form
                    className="admin__form admin__form_type_lead-text"
                    name="admin-lead"
                    method="GET"
                    noValidate
                  >
                    <div className="admin__buttons-container">
                      <button
                        type="submit"
                        onClick={handleDeleteMessage}
                        className="admin__upload-button admin__upload-button_type_select"
                      >
                        Удалить
                      </button>
                      <button
                        type="button"
                        onClick={() => setDelMessage(false)}
                        className="admin__upload-button admin__upload-button_type_select"
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
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
