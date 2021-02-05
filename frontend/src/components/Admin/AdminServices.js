import React, { useState, useEffect, useRef } from "react";
import Services from "../Services";
import Label from "../Label";
import { api } from "../../utils/api";

function AdminServices({
  validation,
  // services,
  onSaveService,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState({});
  const [compiledData, setCompiledData] = useState(selectedService);
  const [picture, setPicture] = useState(selectedService.image);
  const [preview, showPreview] = useState(false);

  const uploadInputRef = useRef();

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    console.log(selectedService);
    resetForm(selectedService);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [selectedService, resetForm, setIsValid]);

  useEffect(() => {
    api.getServices().then((services) => {
      setServices(services);
      setSelectedService(services[0]);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsUploading(true);

    onSaveService(
      {
        heading: values.heading || selectedService.heading,
        description: values.description || selectedService.description,
        image: picture || JSON.stringify(selectedService.image),
      },
      selectedService._id
    );
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

  const handleUploadButtonClick = (e) => {
    e.preventDefault();

    if (imgData === null) {
      uploadInputRef.current.click();
    } else {
      handleSubmit(e);
    }
  };


  function handlePreviewClick() {
    setCompiledData({
      heading: values.heading || selectedService.heading,
      description: values.description || selectedService.description,
      image: picture || selectedService.image,
    });
    showPreview(!preview);
  }

  function handleSelectClick(num) {
    setSelectedService(services[num]);
    showPreview(false);
  }

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Услуги</h2>
        <div className="admin__select-buttons">
          <button
            className="admin__select-button"
            onClick={(_) => handleSelectClick(0)}
          >
            №1
          </button>
          <button
            className="admin__select-button"
            onClick={(_) => handleSelectClick(1)}
          >
            №2
          </button>
          <button
            className="admin__select-button"
            onClick={(_) => handleSelectClick(2)}
          >
            №3
          </button>
        </div>
        <form
          className="admin__form admin__form_type_upload admin__form_place_lead"
          encType="multipart/form-data"
          method="POST"
        >
          <div className="admin__form-heading-container">
            <p className="admin__form-heading">Изображение</p>
            <p className="admin__preview-link" onClick={handlePreviewClick}>
              Показать превью
            </p>
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
            <p className="admin__file-name">{picture ? picture.name : "название файла"}</p>
          </div>
          <div className="admin__buttons-container">
            <button
              type="submit"
              onClick={handleUploadButtonClick}
              className={`admin__upload-button admin__upload-button_type_select ${
                isUploading ? "admin__upload-button_state_uploading" : ""
              } ${
                isPictureSelected ? "admin__upload-button_state_uploaded" : ""
              }`}
            >
              {isPictureSelected ? "Сохранить" : "Выбрать файл"}
            </button>
            {isPictureSelected && (
              <button
                type="button"
                className="admin__upload-button admin__upload-button_type_cancel"
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
            <p onClick={handlePreviewClick} className="admin__preview-link">
              Показать превью
            </p>
          </div>
          <Label
            validation={validation}
            className="admin"
            name="heading"
            labelText="Заголовок"
            type="text"
            required
            maxLength="55"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="description"
            labelText="Пункт 1"
            type="text"
            required
            maxLength="150"
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
              onClick={(_) => resetForm(selectedService, {}, true)}
              className="admin__upload-button admin__upload-button_type_cancel"
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
      {preview && (
        <div className="admin__preview-container">
          <Services elements={compiledData} />
        </div>
      )}
    </div>
  );
}

export default AdminServices;
