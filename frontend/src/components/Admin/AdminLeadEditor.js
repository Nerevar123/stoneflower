import React, { useState } from "react";
import Lead from "../Lead";
import Label from "../Label";

function AdminLeadEditor({ validation, onSaveText, leadContent }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(true);
  const [compiledData, setCompiledData] = useState(leadContent);

  const { values, isValid, resetForm, setIsValid } = validation;

  React.useEffect(() => {
    resetForm(leadContent);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [leadContent, resetForm, setIsValid]);

  // function onSaveLead(data) {
  //   console.log(data);
  // }

  function handleSubmit(e) {
    e.preventDefault();

    onSaveText(
      {
        title: "lead",
        content: [
          {
            name: "leadTitle",
            text: values.leadTitle,
          },
          {
            name: "leadText1",
            text: values.leadText1,
          },
          {
            name: "leadText2",
            text: values.leadText2,
          },
          {
            name: "leadText3",
            text: values.leadText3,
          },
        ],
      },
      leadContent.id
    );
  }

  function handlePreview() {
    setCompiledData({
      leadTitle: values.leadTitle || "",
      leadText1: values.leadText1 || "",
      leadText2: values.leadText2 || "",
      leadText3: values.leadText3 || "",
    });
  }

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Главная</h2>
        <form className="admin__form admin__form_type_upload admin__form_place_lead">
          <div className="admin__form-heading-container">
            <p className="admin__form-heading">Изображение</p>
            <p className="admin__preview-link">Показать превью</p>
          </div>
          <p className="admin_requirements-heading">Требования:</p>
          <ul className="admin__requirements-list">
            <li className="admin__requirements-item">• Размер: 1440x752px</li>
            <li className="admin__requirements-item">• Вес: не более 1Мб</li>
            <li className="admin__requirements-item">• Формат: JPEG/PNG</li>
          </ul>
          <div className="admin__upload-info admin__upload-info_visible">
            <div className="admin__progress-info admin__progress-info_completed"></div>
            <p className="admin__file-name">картинка_1.jpg</p>
          </div>
          <div className="admin__buttons-container">
            <button
              type="button"
              className={`admin__upload-button admin__upload-button_type_select ${
                isUploading ? "admin__upload-button_state_uploading" : ""
              } ${isUploaded ? "admin__upload-button_state_uploaded" : ""}`}
            >
              {isUploaded ? "Сохранить" : "Выбрать файл"}
            </button>
            {isUploaded && (
              <button
                type="button"
                className="admin__upload-button admin__upload-button_type_cancell"
              >
                Отменить
              </button>
            )}
          </div>
        </form>
        <form
          className="admin__form admin__form_type_lead-text"
          name="admin-lead"
          method="GET"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="admin__form-heading-container">
            <p className="admin__form-heading">Текст</p>
            <p onClick={handlePreview} className="admin__preview-link">
              Показать превью
            </p>
          </div>
          <Label
            validation={validation}
            className="admin"
            name="leadTitle"
            labelText="Заголовок"
            type="text"
            required
            maxLength="45"
          />
          <Label
            validation={validation}
            className="admin"
            name="leadText1"
            labelText="Пункт 1"
            type="text"
            required
            maxLength="65"
          />
          <Label
            validation={validation}
            className="admin"
            name="leadText2"
            labelText="Пункт 2"
            type="text"
            required
            maxLength="65"
          />
          <Label
            validation={validation}
            className="admin"
            name="leadText3"
            labelText="Пункт 3"
            type="text"
            required
            maxLength="65"
          />
          <div className="admin__buttons-container">
            <button
              type="submit"
              disabled={!isValid}
              className={`admin__upload-button admin__upload-button_type_select ${
                !isValid ? "admin__upload-button_disabled" : ""
              }`}
            >
              Сохранить
            </button>
            <button
              type="button"
              onClick={(_) => resetForm(leadContent, {}, true)}
              className="admin__upload-button admin__upload-button_type_cancell"
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
      <div className="admin__preview-container">
        <Lead content={compiledData} />
      </div>
    </div>
  );
}

export default AdminLeadEditor;