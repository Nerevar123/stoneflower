import React, { useState, useEffect, useRef } from "react";
import Suppliers from "../Suppliers";
import Label from "../Label";
import AdminPopup from "./AdminPopup";
import ClosablePopup from "../ClosablePopup";
import { saveSupplier, patchSupplier, deleteSupplier, patchText } from "../../utils/api";

function AdminSuppliers({
  validation,
  suppliers,
  suppliersTextContent,
  onSaveData,
  onPatchData,
  onDeleteData,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [isPictureSelected, setIsPictureSelected] = useState(false);
  // const [selectedAdvice, setSelectedAdvice] = useState({});
  const [compiledData, setCompiledData] = useState(suppliersTextContent);
  const [picture, setPicture] = useState(null);
  const [preview, showPreview] = useState(false);
  // const [addAdvice, setAddAdvice] = useState(false);
  const [materialItems, setMaterialItems] = useState([]);
  const [supplierItems, setSupplierItems] = useState([]);
  const [addSupplier, setAddSupplier] = useState(false);
  const [isMaterial, setIsMaterial] = useState(false);

  const uploadInputRef = useRef();
  const popupUploadInputRef = useRef();

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
    console.log(suppliers);
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

  function handleCreateSupplier(e) {
    e.preventDefault();
    onSaveData(
      {
        link: values.link,
        isMaterial: isMaterial,
        image: picture,
      },
      saveSupplier,
    );
  }

  function handleAddClick(isMaterial) {
    setAddSupplier(true);
    setIsMaterial(isMaterial);
  }

  function handleDeleteSupplier(id) {
    onDeleteData(id, deleteSupplier);
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

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setIsUploading(true);

  //   onPatchAdvice(
  //     {
  //       heading: values.heading || selectedAdvice.heading,
  //       shortText: values.shortText || selectedAdvice.shortText,
  //       expandedText: values.expandedText || selectedAdvice.expandedText,
  //       image: picture || JSON.stringify(selectedAdvice.image),
  //     },
  //     selectedAdvice._id
  //   );
  // }

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

  // const handleUploadButtonClick = (e) => {
  //   e.preventDefault();

  //   if (imgData === null) {
  //     uploadInputRef.current.click();
  //   } else {
  //     handleSubmit(e);
  //   }
  // };

  const handlePopupUploadButtonClick = (e) => {
    e.preventDefault();
    if (imgData === null) {
      popupUploadInputRef.current.click();
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
    showPreview(!preview);
  }

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
              name="subheadingMaterials"
              labelText="Описание, материалы"
              type="text"
              required
              maxLength="300"
              withCount
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
                onClick={(_) => resetForm(suppliersTextContent, {}, true)}
                className="admin__upload-button admin__upload-button_type_cancel"
              >
                Отменить
              </button>
            </div>
          </form>
          <div className="admin__form">
            <p className="admin__form-heading">Логотипы 1</p>
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
                    <button className="admin__table-button">Edit</button>
                    <button className="admin__table-button" onClick={_ => handleDeleteSupplier(item._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="admin__upload-button admin__upload-button_type_select"
              onClick={_ => handleAddClick(true)}
            >
              Добавить
            </button>
          </div>
          <div className="admin__form">
            <p className="admin__form-heading">Логотипы 2</p>
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
                    <button className="admin__table-button">Edit</button>
                    <button className="admin__table-button" onClick={_ => handleDeleteSupplier(item._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="admin__upload-button admin__upload-button_type_select"
              onClick={_ => handleAddClick(false)}
            >
              Добавить
            </button>
          </div>
        </div>
        {preview && (
          <div className="admin__preview-container">
            <Suppliers content={suppliers} textContent={compiledData} />
          </div>
        )}
      </div>
      {addSupplier && (
        <ClosablePopup>
          <AdminPopup
            title="Добавить совет"
            onClose={(_) => setAddSupplier(false)}
            children={
              <form
                className="admin__form admin__form_type_lead-text"
                name="admin-lead"
                method="GET"
                noValidate
                onSubmit={handleCreateSupplier}
              >
                <div className="admin__form-heading-container">
                  <p className="admin__form-heading">Добавить</p>
                </div>
                <Label
                  validation={validation}
                  className="admin"
                  name="link"
                  labelText="Введите ссылку на сайт производителя"
                  type="text"
                  required
                  maxLength="50"
                  withCount
                />
                <div className="admin__upload-info admin__upload-info_visible">
                  <div className="admin__progress-info admin__progress-info_completed"></div>
                  <input
                    className="admin__file-input"
                    type="file"
                    onChange={onChangePicture}
                    ref={popupUploadInputRef}
                  />
                  <p className="admin__file-name">
                    {picture ? picture.name : "название файла"}
                  </p>
                </div>
                <button
                  type="submit"
                  onClick={handlePopupUploadButtonClick}
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
                <div className="admin__buttons-container">
                </div>
              </form>
            }
          />
        </ClosablePopup>
      )}
    </>
  );
}

export default AdminSuppliers;
