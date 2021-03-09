import React, { useState, useEffect, useRef } from "react";
import PortfolioItem from "../PortfolioItem";
import Label from "../Label";
import AdminPopup from "./AdminPopup";
import ClosablePopup from "../ClosablePopup";
import {
  putWorkPhoto,
  patchWorkPhoto,
  deleteWorkPhoto,
  saveWork,
  patchWork,
  deleteWork,
} from "../../utils/api";

function AdminPortfolio({
  validation,
  portfolio,
  onSaveData,
  onPatchData,
  onDeleteData,
  menuRef,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  const [selectedWork, setSelectedWork] = useState({});
  const [compiledData, setCompiledData] = useState(selectedWork);
  const [picture, setPicture] = useState(null);
  const [preview, showPreview] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [delPhoto, setDelPhoto] = useState(false);
  const [addWork, setAddWork] = useState(false);
  const [delWork, setDelWork] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState({});
  const editPopupInputRef = useRef();
  const addPopupInputRef = useRef();
  const [popupVisible, setPopupVisible] = useState(true);
  const [selectedButton, setSelectedButton] = useState(0);
  const previewRef = useRef();

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(selectedWork);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [resetForm, setIsValid, selectedWork]);

  useEffect(() => {
    setSelectedWork(portfolio[0]);
    setSelectedButton(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelectClick(num) {
    setSelectedButton(num);
    setSelectedWork(portfolio[num]);
    showPreview(false);
  }

  function handleAddWorkClick() {
    resetForm();
    setAddWork(true);
  }

  function handleEditWork(e) {
    e.preventDefault();

    onPatchData(
      {
        title: values.title || selectedWork.title,
        category: values.category || selectedWork.category,
        text: values.text || selectedWork.text,
        photos: selectedWork.photos,
      },
      selectedWork._id,
      patchWork
    );
  }

  function handleDeleteWorkClick() {
    setDelWork(true);
  }

  function handleAddWork(e) {
    e.preventDefault();

    onSaveData(
      {
        title: values.title,
        category: values.category,
        text: values.text,
        photos: [],
      },
      saveWork
    );
  }

  function handleDeleteWork(e) {
    e.preventDefault();

    onDeleteData(selectedWork._id, deleteWork);
  }

  function handleAddPhotoClick() {
    setAddPhoto(true);
  }

  function handleEditPhotoClick(data) {
    setEditPhoto(true);
    setCurrentPhoto(data);
    resetForm(data, {}, true);
  }

  function handleDeletePhotoClick(data) {
    setDelPhoto(true);
    setCurrentPhoto(data);
  }

  function handleDeletePhoto(e) {
    e.preventDefault();

    onPatchData(
      { photo: currentPhoto._id, image: currentPhoto.image },
      selectedWork._id,
      deleteWorkPhoto
    );
  }

  function handleCreatePhoto(e) {
    e.preventDefault();
    setIsUploading(true);

    onPatchData(
      {
        description: values.description,
        image: picture,
      },
      selectedWork._id,
      putWorkPhoto
    );
  }

  function handleEditPhoto(e) {
    e.preventDefault();
    setIsUploading(true);

    onPatchData(
      {
        id: currentPhoto._id,
        description: values.description || currentPhoto.description,
        image: picture || JSON.stringify(currentPhoto.image),
      },
      selectedWork._id,
      patchWorkPhoto
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
      handleEditPhoto(e);
    }
  };

  const handleAddPopupButtonClick = (e) => {
    e.preventDefault();
    if (imgData === null) {
      addPopupInputRef.current.click();
    } else {
      handleCreatePhoto(e);
    }
  };

  function handlePreviewClick() {
    setCompiledData({
      title: values.title || selectedWork.title,
      category: values.category || selectedWork.category,
      text: values.text || selectedWork.text,
      photos: selectedWork.photos,
    });
    showPreview(true);
  }

  function closeAllPopups() {
    setPopupVisible(false);
    setTimeout(() => {
      setAddPhoto(false);
      setEditPhoto(false);
      setDelPhoto(false);
      setAddWork(false);
      setDelWork(false);
      setPopupVisible(false);
      setPicture(null);
      setImgData(null);
      setIsPictureSelected(false);
      resetForm(selectedWork, {}, true);
      setCurrentPhoto({});
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
          <h2 className="admin__heading">Портфолио</h2>
          <div className="admin__buttons-container">
            <div className="admin__select-buttons">
              {portfolio.map((advice, i) => (
                <button
                  key={advice._id}
                  className={`admin__select-button ${
                    selectedButton === i ? "admin__select-button_active" : ""
                  }`}
                  onClick={(_) => handleSelectClick(i)}
                >
                  №{i + 1}
                </button>
              ))}
            </div>
            <div className="admin__control-buttons">
              <button
                className="admin__table-button admin__table-button_type_add"
                onClick={handleAddWorkClick}
              ></button>
              <button
                className="admin__table-button admin__table-button_type_delete"
                onClick={handleDeleteWorkClick}
              ></button>
            </div>
          </div>
          <form
            className="admin__form admin__form_type_lead-text"
            name="admin-lead"
            method="GET"
            noValidate
            onSubmit={handleEditWork}
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
              name="title"
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
              name="category"
              labelText="Категория"
              type="text"
              required
              maxLength="65"
              withCount
              height="20px"
            />
            <Label
              validation={validation}
              className="admin"
              name="text"
              labelText="Описание"
              type="text"
              required
              maxLength="600"
              withCount
              height="150px"
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
                onClick={() => resetForm(selectedWork, {}, true)}
                className="admin__upload-button admin__upload-button_type_cancel"
              >
                Отменить
              </button>
            </div>
          </form>
          <div className="admin__form">
            <div className="admin__table-titles">
              <p className="admin__table-title">Описание</p>
              <p className="admin__table-title">Изображение</p>
            </div>
            <ul className="admin__table">
              {Object.keys(selectedWork).length !== 0 &&
                selectedWork.photos.map((item) => (
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
                        onClick={() => handleEditPhotoClick(item)}
                      ></button>
                      <button
                        className="admin__table-button admin__table-button_type_delete"
                        onClick={() => handleDeletePhotoClick(item)}
                      ></button>
                    </div>
                  </li>
                ))}
            </ul>
            <button
              type="button"
              className="admin__upload-button admin__upload-button_type_select"
              onClick={handleAddPhotoClick}
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
          {preview && <PortfolioItem previewMode={true} previewContent={compiledData} />}
        </div>
      </div>
      {addPhoto && (
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
                  labelText="Описание"
                  type="url"
                  required
                  maxLength="100"
                  withCount
                />
                <div className="admin__form-heading-container">
                  <p className="admin__form-heading">Изображение</p>
                </div>
                <p className="admin_requirements-heading">Требования:</p>
                <ul className="admin__requirements-list">
                  <li className="admin__requirements-item">
                    • Оптимальный размер: 1110x912px
                  </li>
                  <li className="admin__requirements-item">
                    • Вес: не более 1Мб
                  </li>
                  <li className="admin__requirements-item">
                    • Формат: JPEG/PNG
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
      {editPhoto && (
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
                  labelText="Описание"
                  type="url"
                  required
                  maxLength="100"
                  withCount
                />
                <div className="admin__form-heading-container">
                  <p className="admin__form-heading">Изображение</p>
                </div>
                <p className="admin_requirements-heading">Требования:</p>
                <ul className="admin__requirements-list">
                  <li className="admin__requirements-item">
                    • Оптимальный размер: 1110x912px
                  </li>
                  <li className="admin__requirements-item">
                    • Вес: не более 1Мб
                  </li>
                  <li className="admin__requirements-item">
                    • Формат: JPEG/PNG
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
                <div className="admin__buttons-container">
                  {!isPictureSelected && (
                    <button
                      type="submit"
                      onClick={handleEditPopupButtonClick}
                      className={`admin__upload-button admin__upload-button_type_select ${
                        isUploading
                          ? "admin__upload-button_state_uploading"
                          : ""
                      } ${
                        isPictureSelected
                          ? "admin__upload-button_state_uploaded"
                          : ""
                      }`}
                    >
                      Выбрать файл
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={!isValid}
                    onClick={handleEditPhoto}
                    className={`admin__upload-button admin__upload-button_type_select ${
                      !isValid ? "admin__upload-button_disabled" : ""
                    }`}
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            }
          />
        </ClosablePopup>
      )}
      {delPhoto && (
        <ClosablePopup>
          <AdminPopup
            title="Удалить изображение?"
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
                    onClick={handleDeletePhoto}
                    className="admin__upload-button admin__upload-button_type_select"
                  >
                    Удалить
                  </button>
                  <button
                    type="button"
                    onClick={() => setDelPhoto(false)}
                    className="admin__upload-button"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            }
          />
        </ClosablePopup>
      )}
      {addWork && (
        <ClosablePopup>
          <AdminPopup
            title="Добавить работу"
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
                  name="title"
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
                  name="category"
                  labelText="Категория"
                  type="text"
                  required
                  maxLength="65"
                  withCount
                  height="20px"
                />
                <Label
                  validation={validation}
                  className="admin"
                  name="text"
                  labelText="Описание"
                  type="text"
                  required
                  maxLength="600"
                  withCount
                  height="150px"
                />
                <div className="admin__buttons-container">
                  <button
                    type="submit"
                    onClick={handleAddWork}
                    className="admin__upload-button admin__upload-button_type_select"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            }
          />
        </ClosablePopup>
      )}
      {delWork && (
        <ClosablePopup>
          <AdminPopup
            title="Удалить работу?"
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
                    onClick={handleDeleteWork}
                    className="admin__upload-button admin__upload-button_type_select"
                  >
                    Удалить
                  </button>
                  <button
                    type="button"
                    onClick={() => setDelWork(false)}
                    className="admin__upload-button"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            }
          />
        </ClosablePopup>
      )}
    </>
  );
}

export default AdminPortfolio;
