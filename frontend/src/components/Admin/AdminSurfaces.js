import React, { useState, useEffect, useRef } from "react";
import Surfaces from "../Surfaces";
import Label from "../Label";
import AdminPopup from "./AdminPopup";
import ClosablePopup from "../ClosablePopup";
import {
  putSurfaceExample,
  patchSurfaceExample,
  deleteSurfaceExamples,
  patchText,
} from "../../utils/api";

function AdminSurfaces({
  validation,
  surfaces,
  surfacesTextContent,
  onPatchData,
  menuRef,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  const [compiledData, setCompiledData] = useState(surfacesTextContent);
  const [picture, setPicture] = useState(null);
  const [preview, showPreview] = useState(false);
  const [addSurface, setAddSurface] = useState(false);
  const [editSurface, setEditSurface] = useState(false);
  const [delSurface, setDelSurface] = useState(false);
  const [selectedSurface, setSelectedSurface] = useState(null);
  const [currentExample, setCurrentExample] = useState({});
  const editPopupInputRef = useRef();
  const addPopupInputRef = useRef();
  const [popupVisible, setPopupVisible] = useState(true);
  const [selectedButton, setSelectedButton] = useState(0);
  const previewRef = useRef();

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(surfacesTextContent);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [resetForm, setIsValid, surfacesTextContent]);

  useEffect(() => {
    setSelectedSurface(surfaces[0]);
    setSelectedButton(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelectClick(num) {
    setSelectedButton(num);
    setSelectedSurface(surfaces[num]);
    showPreview(false);
  }

  function handleAddClick() {
    setAddSurface(true);
  }

  function handleEditClick(data) {
    setEditSurface(true);
    setCurrentExample(data);
    resetForm(data, {}, true);
  }

  function handleDeleteClick(data) {
    setDelSurface(true);
    setCurrentExample(data);
  }

  function handleDeleteSurface() {
    onPatchData(
      { example: currentExample._id, image: currentExample.image },
      selectedSurface._id,
      deleteSurfaceExamples
    );
  }

  function handleSubmitText(e) {
    e.preventDefault();

    onPatchData(
      {
        title: "surfaces",
        content: [
          {
            name: "heading",
            text: values.heading,
          },
          {
            name: "shortText",
            text: values.shortText,
          },
          {
            name: "expandedText",
            text: values.expandedText,
          },
        ],
      },
      surfacesTextContent.id,
      patchText
    );
  }

  function handleCreateSurface(e) {
    e.preventDefault();
    setIsUploading(true);

    onPatchData(
      {
        description: values.description,
        manufacturer: values.manufacturer,
        origin: values.origin,
        style: values.style,
        surface: values.surface,
        image: picture,
      },
      selectedSurface._id,
      putSurfaceExample
    );
  }

  function handleEditSurface(e) {
    e.preventDefault();
    setIsUploading(true);

    onPatchData(
      {
        id: currentExample._id,
        description: values.description || currentExample.description,
        manufacturer: values.manufacturer || currentExample.manufacturer,
        origin: values.origin || currentExample.origin,
        style: values.style || currentExample.style,
        surface: values.surface || currentExample.surface,
        image: picture || JSON.stringify(currentExample.image),
      },
      selectedSurface._id,
      patchSurfaceExample
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

  const handleEditPopupButtonClick = (e) => {
    e.preventDefault();

    if (imgData === null) {
      editPopupInputRef.current.click();
    } else {
      handleEditSurface(e);
    }
  };

  const handleAddPopupButtonClick = (e) => {
    e.preventDefault();
    if (imgData === null) {
      addPopupInputRef.current.click();
    } else {
      handleCreateSurface(e);
    }
  };

  function handlePreviewClick() {
    setCompiledData({
      heading: values.heading || surfacesTextContent.heading,
      shortText: values.shortText || surfacesTextContent.shortText,
      expandedText: values.expandedText || surfacesTextContent.expandedText,
    });
    showPreview(true);
  }

  function closeAllPopups() {
    setPopupVisible(false);
    setTimeout(() => {
      setAddSurface(false);
      setEditSurface(false);
      setDelSurface(false);
      setPopupVisible(false);
      setPicture(null);
      setImgData(null);
      setIsPictureSelected(false);
      resetForm(surfacesTextContent, {}, true);
      setCurrentExample({});
    }, 300);
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
    <>
      <div className="admin__edit-wrapper">
        <div className="admin__form-area">
          <h2 className="admin__heading">Варианты поверхностей</h2>
          <form
            className="admin__form admin__form_type_lead-text"
            name="admin-lead"
            method="GET"
            noValidate
            onSubmit={handleSubmitText}
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
              maxLength="65"
              withCount
              height="20px"
            />
            <Label
              validation={validation}
              className="admin"
              name="shortText"
              labelText="Описание"
              type="text"
              required
              maxLength="300"
              withCount
              height="120px"
            />
            <Label
              validation={validation}
              className="admin"
              name="expandedText"
              labelText="Читать далее"
              type="text"
              required
              maxLength="500"
              withCount
              height="190px"
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
                onClick={() => resetForm(surfacesTextContent, {}, true)}
                className="admin__upload-button admin__upload-button_type_cancel"
              >
                Отменить
              </button>
            </div>
          </form>
          <div className="admin__form">
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
              <button
                className={`admin__select-button ${
                  selectedButton === 3 ? "admin__select-button_active" : ""
                }`}
                onClick={(_) => handleSelectClick(3)}
              >
                №4
              </button>
            </div>
            <div className="admin__table-titles">
              <p className="admin__table-title">Ссылка</p>
              <p className="admin__table-title">Изображение</p>
            </div>
            <ul className="admin__table">
              {selectedSurface &&
                selectedSurface.examples.map((item) => (
                  <li className="admin__table-item" key={item._id}>
                    <span className="admin__table-text">
                      {item.description}
                    </span>
                    <span className="admin__table-text">
                      {item.image.originalname}
                    </span>
                    <div className="admin__table-buttons">
                      <button
                        className="admin__table-button admin__table-button_type_edit"
                        onClick={() => handleEditClick(item)}
                      ></button>
                      <button
                        className="admin__table-button admin__table-button_type_delete"
                        onClick={() => handleDeleteClick(item)}
                      ></button>
                    </div>
                  </li>
                ))}
            </ul>
            <button
              type="button"
              className="admin__upload-button admin__upload-button_type_select"
              onClick={handleAddClick}
            >
              Добавить
            </button>
          </div>
        </div>

        <div
          ref={previewRef}
          className="admin__preview-container"
          style={{ minWidth: `${preview ? "1100px" : "0"}` }}
        >
          {preview && (
            <button onClick={scrollToMenu} className="admin__go-back">
              Назад
            </button>
          )}
          {preview && (
            <Surfaces content={surfaces} textContent={compiledData} />
          )}
        </div>
      </div>
      {addSurface && (
        <ClosablePopup>
          <AdminPopup
            title="Добавить элемент"
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
                <Label
                  validation={validation}
                  className="admin"
                  name="description"
                  labelText="Название материала"
                  type="url"
                  required
                  maxLength="50"
                  withCount
                />
                <Label
                  validation={validation}
                  className="admin"
                  name="manufacturer"
                  labelText="Фабрика"
                  type="url"
                  required
                  maxLength="50"
                  withCount
                />
                <Label
                  validation={validation}
                  className="admin"
                  name="origin"
                  labelText="Страна"
                  type="url"
                  required
                  maxLength="50"
                  withCount
                />
                <Label
                  validation={validation}
                  className="admin"
                  name="style"
                  labelText="Коллекция"
                  type="url"
                  required
                  maxLength="50"
                  withCount
                />
                <Label
                  validation={validation}
                  className="admin"
                  name="surface"
                  labelText="Поверхность"
                  type="url"
                  required
                  maxLength="50"
                  withCount
                />
                <div className="admin__form-heading-container">
                  <p className="admin__form-heading">Логотип</p>
                </div>
                <p className="admin_requirements-heading">Требования:</p>
                <ul className="admin__requirements-list">
                  <li className="admin__requirements-item">
                    • Размер: 100x100px
                  </li>
                  <li className="admin__requirements-item">
                    • Вес: не более 1Мб
                  </li>
                  <li className="admin__requirements-item">
                    • Формат: JPEG (на белом фоне) / PNG (на прозрачном фоне) /
                    SVG
                  </li>
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
                    ref={addPopupInputRef}
                  />
                  <p className="admin__file-name">
                    {picture ? picture.name : ""}
                  </p>
                </div>
                <button
                  type="submit"
                  onClick={handleAddPopupButtonClick}
                  className={`admin__upload-button admin__upload-button_type_select ${
                    isUploading ? "admin__upload-button_state_uploading" : ""
                  } ${
                    isPictureSelected
                      ? "admin__upload-button_state_uploaded"
                      : ""
                  }`}
                >
                  {isPictureSelected ? "Сохранить" : "Выбрать файл"}
                </button>
                <div className="admin__buttons-container"></div>
              </form>
            }
          />
        </ClosablePopup>
      )}
      {editSurface && (
        <ClosablePopup>
          <AdminPopup
            title="Редактировать"
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
                <Label
                  validation={validation}
                  className="admin"
                  name="description"
                  labelText="Название материала"
                  type="url"
                  required
                  maxLength="50"
                  withCount
                />
                <Label
                  validation={validation}
                  className="admin"
                  name="manufacturer"
                  labelText="Фабрика"
                  type="url"
                  required
                  maxLength="50"
                  withCount
                />
                <Label
                  validation={validation}
                  className="admin"
                  name="origin"
                  labelText="Страна"
                  type="url"
                  required
                  maxLength="50"
                  withCount
                />
                <Label
                  validation={validation}
                  className="admin"
                  name="style"
                  labelText="Коллекция"
                  type="url"
                  required
                  maxLength="50"
                  withCount
                />
                <Label
                  validation={validation}
                  className="admin"
                  name="surface"
                  labelText="Поверхность"
                  type="url"
                  required
                  maxLength="50"
                  withCount
                />
                <div className="admin__form-heading-container">
                  <p className="admin__form-heading">Логотип</p>
                </div>
                <p className="admin_requirements-heading">Требования:</p>
                <ul className="admin__requirements-list">
                  <li className="admin__requirements-item">
                    • Размер: 100x100px
                  </li>
                  <li className="admin__requirements-item">
                    • Вес: не более 1Мб
                  </li>
                  <li className="admin__requirements-item">
                    • Формат: JPEG (на белом фоне) / PNG (на прозрачном фоне) /
                    SVG
                  </li>
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
                    ref={editPopupInputRef}
                  />
                  <p className="admin__file-name">
                    {picture ? picture.name : ""}
                  </p>
                </div>
                {!isPictureSelected && (
                  <button
                    type="submit"
                    onClick={handleEditPopupButtonClick}
                    className={`admin__upload-button admin__upload-button_type_select ${
                      isUploading ? "admin__upload-button_state_uploading" : ""
                    } ${
                      isPictureSelected
                        ? "admin__upload-button_state_uploaded"
                        : ""
                    }`}
                  >
                    {isPictureSelected ? "Сохранить" : "Выбрать файл"}
                  </button>
                )}
                {isPictureSelected && (
                  <button
                    type="submit"
                    disabled={!isValid}
                    onClick={handleEditSurface}
                    className={`admin__upload-button admin__upload-button_type_select ${
                      !isValid ? "admin__upload-button_disabled" : ""
                    }`}
                  >
                    Сохранить
                  </button>
                )}
                <div className="admin__buttons-container"></div>
              </form>
            }
          />
        </ClosablePopup>
      )}
      {delSurface && (
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
                <button
                  type="submit"
                  onClick={handleDeleteSurface}
                  className="admin__upload-button admin__upload-button_type_select"
                >
                  Удалить
                </button>
                <button
                  type="button"
                  onClick={() => setDelSurface(false)}
                  className="admin__upload-button"
                >
                  Отмена
                </button>
                <div className="admin__buttons-container"></div>
              </form>
            }
          />
        </ClosablePopup>
      )}
    </>
  );
}

export default AdminSurfaces;
