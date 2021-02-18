import React, { useState, useEffect, useRef } from "react";
import Services from "../Services";
import Label from "../Label";
import { patchService } from "../../utils/api";

function AdminServices({ validation, services, onPatchData, menuRef }) {
  const [isUploading, setIsUploading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const [compiledData, setCompiledData] = useState(selectedService);
  const [picture, setPicture] = useState(selectedService.image);
  const [preview, showPreview] = useState(false);
  const uploadInputRef = useRef();
  const previewRef = useRef();
  const [selectedButton, setSelectedButton] = useState(0);

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(selectedService);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [selectedService, resetForm, setIsValid, services]);

  useEffect(() => {
    setSelectedService(services[0]);
    setSelectedButton(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsUploading(true);

    onPatchData(
      {
        heading: values.heading || selectedService.heading,
        description: values.description || selectedService.description,
        image: picture || JSON.stringify(selectedService.image),
      },
      selectedService._id,
      patchService
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
      image: imgData || selectedService.image,
    });
    showPreview(true);
  }

  function handleSelectClick(num) {
    setSelectedButton(num);
    setSelectedService(services[num]);
    showPreview(false);
  }

  const scrollToPreview = () => {
    setTimeout(() => {
      previewRef.current.scrollIntoView({
        inline: "start",
        behavior: "smooth",
      });
    }, 100);
  };

  const scrollToMenu = () => {
    menuRef.current.scrollIntoView({ inline: "start", behavior: "smooth" });
  };

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Услуги</h2>

        <div className="admin__select-buttons">
          <button
            className={`admin__select-button ${
              selectedButton === 0 ? "admin__select-button_active" : ""
            }`}
            onClick={(_) => handleSelectClick(0)}
          >
            №1
          </button>
          <button
            className={`admin__select-button ${
              selectedButton === 1 ? "admin__select-button_active" : ""
            }`}
            onClick={(_) => handleSelectClick(1)}
          >
            №2
          </button>
          <button
            className={`admin__select-button ${
              selectedButton === 2 ? "admin__select-button_active" : ""
            }`}
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
            <p
              className="admin__preview-link"
              onClick={() => {
                handlePreviewClick();
                scrollToPreview();
              }}
            >
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
            <div
              style={{ opacity: `${picture ? "1" : "0"}` }}
              className="admin__progress-info admin__progress-info_completed"
            ></div>
            <input
              className="admin__file-input"
              type="file"
              onChange={onChangePicture}
              ref={uploadInputRef}
            />
            <p className="admin__file-name">{picture ? picture.name : ""}</p>
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
            <p
              onClick={() => {
                handlePreviewClick();
                scrollToPreview();
              }}
              className="admin__preview-link"
            >
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
            height="40px"
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
            height="60px"
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

      <div
        ref={previewRef}
        style={{ minWidth: preview ? "400px" : "0" }}
        className="admin__preview-container"
      >
        {preview && (
          <button onClick={scrollToMenu} className="admin__go-back">
            Назад
          </button>
        )}
        {preview && <Services inPreview={true} elements={compiledData}/>}
      </div>
    </div>
  );
}

export default AdminServices;
