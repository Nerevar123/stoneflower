import React, { useState, useEffect, useRef } from "react";
import PostForm from "../PostForm";
import Label from "../Label";
import { patchImage, patchText } from "../../utils/api";

function AdminPostForm({
  validation,
  onPatchData,
  postFormContent,
  postFormOffer,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [compiledData, setCompiledData] = useState(postFormContent);
  const [offer, setOffer] = useState(postFormOffer);
  const [imgData, setImgData] = useState(null);
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  const [preview, showPreview] = useState(false);
  const uploadInputRef = useRef();

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(postFormContent);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [postFormContent, resetForm, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    onPatchData(
      {
        title: "postForm",
        content: [
          {
            name: "heading",
            text: values.heading,
          },
          {
            name: "subHeading",
            text: values.subHeading,
          },
        ],
      },
      postFormContent.id,
      patchText
    );
  }

  function handlePreviewClick() {
    setCompiledData({
      heading: values.heading || postFormContent.heading,
      subHeading: values.subHeading || postFormContent.subHeading,
    });
    showPreview(!preview);
  }

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setIsPictureSelected(true);
      setOffer(e.target.files[0]);
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

  function handleImageSubmit(e) {
    setIsUploading(true);
    onPatchData(
      {
        name: "postFormOffer",
        image: offer,
      },
      postFormOffer.id,
      patchImage
    );
  }

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Оставить заявку</h2>
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
            maxLength="65"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="subHeading"
            labelText="Описание"
            type="text"
            required
            maxLength="300"
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
              onClick={(_) => resetForm(postFormContent, {}, true)}
              className="admin__upload-button admin__upload-button_type_cancel"
            >
              Отменить
            </button>
          </div>
        </form>
        <form
          className="admin__form admin__form_type_upload admin__form_place_lead"
          encType="multipart/form-data"
          method="POST"
        >
          <div className="admin__form-heading-container">
            <p className="admin__form-heading">Пользовательское соглашение</p>
          </div>
          <p className="admin_requirements-heading">Требования:</p>
          <ul className="admin__requirements-list">
            <li className="admin__requirements-item">• Вес: не более 1Мб</li>
            <li className="admin__requirements-item">• Формат: PDF</li>
          </ul>
          <div className="admin__upload-info admin__upload-info_visible">
            <input
              className="admin__file-input"
              type="file"
              onChange={onChangePicture}
              ref={uploadInputRef}
            />
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
      </div>
      {preview && (
        <div className="admin__preview-container">
          <PostForm content={compiledData} />
        </div>
      )}
    </div>
  );
}

export default AdminPostForm;
