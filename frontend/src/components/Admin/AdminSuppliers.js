import React, { useState, useEffect, useRef } from "react";
import Suppliers from "../Suppliers";
import Label from "../Label";
import AdminPopup from "./AdminPopup";
import ClosablePopup from "../ClosablePopup";
import {
  saveSupplier,
  patchSupplier,
  deleteSupplier,
  patchText,
} from "../../utils/api";

function AdminSuppliers({
  validation,
  suppliers,
  suppliersTextContent,
  onSaveData,
  onPatchData,
  onDeleteData,
  menuRef,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  const [compiledData, setCompiledData] = useState(suppliersTextContent);
  const [picture, setPicture] = useState(null);
  const [preview, showPreview] = useState(false);
  const [materialItems, setMaterialItems] = useState([]);
  const [supplierItems, setSupplierItems] = useState([]);
  const [addSupplier, setAddSupplier] = useState(false);
  const [editSupplier, setEditSupplier] = useState(false);
  const [delSupplier, setDelSupplier] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState({});
  const [isMaterial, setIsMaterial] = useState(false);
  const editPopupInputRef = useRef();
  const addPopupInputRef = useRef();
  const [popupVisible, setPopupVisible] = useState(true);
  const previewRef = useRef();

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(suppliersTextContent);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [resetForm, setIsValid, suppliersTextContent]);

  useEffect(() => {
    let mat = [];
    let sup = [];

    suppliers.forEach((supplier) => {
      if (supplier.isMaterial) {
        mat = [...mat, supplier];
      } else {
        sup = [...sup, supplier];
      }
    });

    setMaterialItems(mat);
    setSupplierItems(sup);
  }, [suppliers]);

  function handleAddClick(isMaterial) {
    setAddSupplier(true);
    setIsMaterial(isMaterial);
  }

  function handleEditClick(data) {
    setEditSupplier(true);
    setCurrentSupplier(data);
    resetForm(data, {}, true);
  }

  function handleDeleteClick(data) {
    setDelSupplier(true);
    setCurrentSupplier(data);
  }

  function handleDeleteSupplier() {
    onDeleteData(currentSupplier._id, deleteSupplier);
  }

  function handleSubmitText(e) {
    e.preventDefault();

    onPatchData(
      {
        title: "suppliers",
        content: [
          {
            name: "heading",
            text: values.heading,
          },
          {
            name: "subheadingMaterials",
            text: values.subheadingMaterials,
          },
          {
            name: "subheadingSuppliers",
            text: values.subheadingSuppliers,
          },
        ],
      },
      suppliersTextContent.id,
      patchText
    );
  }

  function handleCreateSupplier(e) {
    e.preventDefault();
    setIsUploading(true);

    onSaveData(
      {
        link: values.link,
        isMaterial: isMaterial,
        image: picture,
      },
      saveSupplier
    );
  }

  function handleEditSupplier(e) {
    e.preventDefault();
    setIsUploading(true);

    onPatchData(
      {
        link: values.link || currentSupplier.link,
        isMaterial: currentSupplier.isMaterial,
        image: picture || JSON.stringify(currentSupplier.image),
      },
      currentSupplier._id,
      patchSupplier
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
      handleEditSupplier(e);
    }
  };

  const handleAddPopupButtonClick = (e) => {
    e.preventDefault();
    if (imgData === null) {
      addPopupInputRef.current.click();
    } else {
      handleCreateSupplier(e);
    }
  };

  function handlePreviewClick() {
    setCompiledData({
      heading: values.heading || suppliersTextContent.heading,
      subheadingMaterials:
        values.subheadingMaterials || suppliersTextContent.subheadingMaterials,
      subheadingSuppliers:
        values.subheadingSuppliers || suppliersTextContent.subheadingSuppliers,
    });
    showPreview(true);
  }

  function closeAllPopups() {
    setPopupVisible(false);
    setTimeout(() => {
      setAddSupplier(false);
      setEditSupplier(false);
      setDelSupplier(false);
      setPopupVisible(false);
      setPicture(null);
      setImgData(null);
      setIsPictureSelected(false);
      resetForm(suppliersTextContent, {}, true);
      setCurrentSupplier({});
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
          <h2 className="admin__heading">Производители</h2>
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
              name="subheadingMaterials"
              labelText="Описание, материалы"
              type="text"
              required
              maxLength="300"
              withCount
              height="20px"
            />
            <Label
              validation={validation}
              className="admin"
              name="subheadingSuppliers"
              labelText="Описание, поставщики"
              type="text"
              required
              maxLength="300"
              withCount
              height="20px"
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
                onClick={() => resetForm(suppliersTextContent, {}, true)}
                className="admin__upload-button admin__upload-button_type_cancel"
              >
                Отменить
              </button>
            </div>
          </form>
          <div className="admin__form">
            <div className="admin__form-heading-container">
              <p className="admin__form-heading">Логотипы материалов</p>
            </div>
            <div className="admin__table-titles">
              <p className="admin__table-title">Ссылка</p>
              <p className="admin__table-title">Изображение</p>
            </div>
            <ul className="admin__table">
              {materialItems.map((item) => (
                <li className="admin__table-item" key={item._id}>
                  <span className="admin__table-text">{item.link}</span>
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
              onClick={() => handleAddClick(true)}
            >
              Добавить
            </button>
          </div>
          <div className="admin__form">
            <div className="admin__form-heading-container">
              <p className="admin__form-heading">Логотипы производителей</p>
            </div>
            <div className="admin__table-titles">
              <p className="admin__table-title">Ссылка</p>
              <p className="admin__table-title">Изображение</p>
            </div>
            <ul className="admin__table">
              {supplierItems.map((item) => (
                <li className="admin__table-item" key={item._id}>
                  <span className="admin__table-text">{item.link}</span>
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
              onClick={() => handleAddClick(false)}
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
            <Suppliers content={suppliers} textContent={compiledData} />
          )}
        </div>
      </div>
      {addSupplier && (
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
                  name="link"
                  labelText="Введите ссылку на сайт производителя"
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
      {editSupplier && (
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
                  name="link"
                  labelText="Введите ссылку на сайт производителя"
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
                    onClick={handleEditSupplier}
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
      {delSupplier && (
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
                  onClick={handleDeleteSupplier}
                  className="admin__upload-button admin__upload-button_type_select"
                >
                  Удалить
                </button>
                <button
                  type="button"
                  onClick={() => setDelSupplier(false)}
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

export default AdminSuppliers;
