import React, { useState, useEffect, useRef } from "react";
import Contacts from "../Contacts";
import Label from "../Label";
import { patchText, patchImage } from "../../utils/api";

function AdminContacts({
  validation,
  contactsContent,
  onPatchData,
  menuRef,
  entranceImage,
}) {
  const [compiledData, setCompiledData] = useState(contactsContent);
  const [preview, showPreview] = useState(false);
  const previewRef = useRef();
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  const { values, isValid, resetForm, setIsValid } = validation;
  const [isUploading, setIsUploading] = useState(false);
  const uploadInputRef = useRef();

  useEffect(() => {
    resetForm(contactsContent);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [contactsContent, resetForm, setIsValid]);

  const handleReset = () => {
    setPicture(null);
    setImgData(null);
    setIsPictureSelected(false);
    uploadInputRef.current.value = "";
  };
  function handleSubmit(e) {
    e.preventDefault();

    onPatchData(
      {
        title: "contacts",
        content: [
          {
            name: "heading",
            text: values.heading,
          },
          {
            name: "address",
            text: values.address,
          },
          {
            name: "phonePrimary",
            text: values.phonePrimary,
          },
          {
            name: "phoneAdditional",
            text: values.phoneAdditional,
          },
          {
            name: "emailAddress",
            text: values.emailAddress,
          },
          {
            name: "howToGetText",
            text: values.howToGetText,
          },
          {
            name: "byBusText",
            text: values.byBusText,
          },
          {
            name: "byTrainText",
            text: values.byTrainText,
          },
          {
            name: "byVehicleText",
            text: values.byVehicleText,
          },
          {
            name: "landmarksDescription",
            text: values.landmarksDescription,
          },
        ],
      },
      contactsContent.id,
      patchText
    );
  }

  function handlePreview() {
    setCompiledData({
      heading: values.heading || contactsContent.heading,
      address: values.address || contactsContent.address,
      phonePrimary: values.phonePrimary || contactsContent.phonePrimary,
      phoneAdditional:
        values.phoneAdditional || contactsContent.phoneAdditional,
      emailAddress: values.emailAddress || contactsContent.emailAddress,
      howToGetText: values.howToGetText || contactsContent.howToGetText,
      byBusText: values.byBusText || contactsContent.byBusText,
      byTrainText: values.byTrainText || contactsContent.byTrainText,
      byVehicleText: values.byVehicleText || contactsContent.byVehicleText,
      landmarksDescription:
        values.landmarksDescription || contactsContent.landmarksDescription,
    });
    showPreview(true);
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


  function handleImageSubmit(e) {
    setIsUploading(true);
    onPatchData(
      {
        name: "contactsEntranceImage",
        image: picture,
      },
      entranceImage.id,
      patchImage
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

  const handleUploadButtonClick = (evt) => {
    evt.preventDefault();
    if (imgData === null) {
      uploadInputRef.current.click();
    } else {
      handleImageSubmit(evt);
    }
  };

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Контакты</h2>
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
                handlePreview();
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
            maxLength="65"
            withCount
            height="20px"
          />
          <Label
            validation={validation}
            className="admin"
            name="address"
            labelText="Адрес"
            type="text"
            required
            maxLength="40"
            withCount
            height="20px"
          />
          <Label
            validation={validation}
            className="admin"
            name="phonePrimary"
            labelText="Телефон 1 (для WhatsApp)"
            type="text"
            required
            maxLength="40"
            withCount
            height="20px"
          />
          <Label
            validation={validation}
            className="admin"
            name="phoneAdditional"
            labelText="Телефон 2"
            type="text"
            required
            maxLength="40"
            withCount
            height="20px"
          />
          <Label
            validation={validation}
            className="admin"
            name="emailAddress"
            labelText="E-mail"
            type="text"
            required
            maxLength="40"
            withCount
            height="20px"
          />
          <Label
            validation={validation}
            className="admin"
            name="howToGetText"
            labelText="Как добраться"
            type="text"
            required
            maxLength="65"
            withCount
            height="20px"
          />
          <Label
            validation={validation}
            className="admin"
            name="byBusText"
            labelText="Автобусом из Москвы"
            type="text"
            required
            maxLength="40"
            withCount
            height="60px"
          />
          <Label
            validation={validation}
            className="admin"
            name="byTrainText"
            labelText="Пригородными поездами"
            type="text"
            required
            maxLength="40"
            withCount
            height="60px"
          />
          <Label
            validation={validation}
            className="admin"
            name="byVehicleText"
            labelText="На автомобиле"
            type="text"
            required
            maxLength="40"
            withCount
            height="60px"
          />
          <Label
            validation={validation}
            className="admin"
            name="landmarksDescription"
            labelText="Визуальные ориентиры"
            type="text"
            required
            maxLength="40"
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
              onClick={(_) => resetForm(contactsContent, {}, true)}
              className="admin__upload-button admin__upload-button_type_cancel"
            >
              Отменить
            </button>
          </div>
        </form>
        <form
        className="admin__form admin__form_type_upload admin__form_place_lead"
        onSubmit={handleImageSubmit}
        encType="multipart/form-data"
        method="POST"
      >
        <div className="admin__form-heading-container">
          <p className="admin__form-heading">Изображение</p>
          <p
            onClick={() => {
              scrollToPreview();
              handlePreview();
            }}
            className="admin__preview-link"
          >
            Показать превью
          </p>
        </div>
        <p className="admin_requirements-heading">Требования:</p>
        <ul className="admin__requirements-list">
          <li className="admin__requirements-item">• Размер: 600x600px</li>
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
              onClick={handleReset}
              type="button"
              className="admin__upload-button admin__upload-button_type_cancel"
            >
              Отменить
            </button>
          )}
        </div>
      </form>
      </div>


      <div
        ref={previewRef}
        className="admin__preview-container"
        style={{ minWidth: `${preview ? "1280px" : "0"}` }}
      >
        {preview && (
          <button onClick={scrollToMenu} className="admin__go-back">
            Назад
          </button>
        )}
        {preview && (
          <Contacts content={compiledData} entranceImage={imgData? imgData : entranceImage} />
        )}
      </div>
    </div>
  );
}

export default AdminContacts;
