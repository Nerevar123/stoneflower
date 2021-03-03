import React from "react";

function AdminRequests({ requests }) {


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
          <ul className="admin__table">
            {requests.map((item) => (
              <li className="admin__table-item" key={item._id}>
                <span className="admin__table-text">{item.date}</span>
                <span className="admin__table-text">{item.phone}</span>
                <span className="admin__table-text">
                  {item.name}
                </span>
                <div className="admin__table-buttons">
                  <button
                    className="admin__table-button admin__table-button_type_delete"
                  ></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminRequests;
