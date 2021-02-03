import React, { useState, useEffect, useRef } from "react";
import Lead from "../Lead";
import Label from "../Label";

function AdminLeadEditor({
  validation,
  onSaveText,
  onSaveImage,
  leadContent,
  leadBgImage,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [compiledData, setCompiledData] = useState(leadContent);
  const [picture, setPicture] = useState({name: 'имя картинки'});
  const [imgData, setImgData] = useState(null);
  const [isPictureSelected, setIsPictureSelected] = useState(false);


  const uploadInputRef = useRef();

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(leadContent);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [leadContent, resetForm, setIsValid]);

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


  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setIsPictureSelected(true);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    console.log("upl");
  }, [isUploading]);
  const handleUploadButtonClick = () => {
    if(imgData === null) {
      uploadInputRef.current.click();
    }
  };
  function handleImageSubmit(e) {
    e.preventDefault();
    setIsUploading(true);
    onSaveImage(
      {
        name: "leadBgImage",
        image: picture,
      },
      leadBgImage.id
    );
  }

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Главная</h2>
        <form
          className="admin__form admin__form_type_upload admin__form_place_lead"
          onSubmit={handleImageSubmit}
          encType="multipart/form-data"
          method="POST"
        >
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
            <input
              className="admin__file-input"
              type="file"
              onChange={onChangePicture}
              ref={uploadInputRef}
            />
            <p className="admin__file-name">{picture.name}</p>
          </div>
          <div className="admin__buttons-container">
            <button
              type="submit"
              onClick={handleUploadButtonClick}
              className={`admin__upload-button admin__upload-button_type_select ${
                isUploading ? "admin__upload-button_state_uploading" : ""
              } ${isPictureSelected ? "admin__upload-button_state_uploaded" : ""}`}
            >
              {isPictureSelected ? "Сохранить" : "Выбрать файл"}
            </button>
            {isPictureSelected && (
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
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="leadText1"
            labelText="Пункт 1"
            type="text"
            required
            maxLength="65"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="leadText2"
            labelText="Пункт 2"
            type="text"
            required
            maxLength="65"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="leadText3"
            labelText="Пункт 3"
            type="text"
            required
            maxLength="65"
            withCount
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
        <Lead
          content={compiledData}
          leadBgImage={imgData ? imgData : leadBgImage}
        />
      </div>
    </div>
  );
}

export default AdminLeadEditor;
