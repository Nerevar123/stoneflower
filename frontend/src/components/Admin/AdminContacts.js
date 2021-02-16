import React, { useState, useEffect } from "react";
import Contacts from "../Contacts";
import Label from "../Label";
import { patchText } from "../../utils/api";

function AdminContacts({ validation, contactsContent, onPatchData }) {
  const [compiledData, setCompiledData] = useState(contactsContent);
  const [preview, showPreview] = useState(false);

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(contactsContent);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [contactsContent, resetForm, setIsValid]);

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
    showPreview(!preview);
  }

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
            <p onClick={handlePreview} className="admin__preview-link">
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
            name="address"
            labelText="Адрес"
            type="text"
            required
            maxLength="40"
            withCount
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
      </div>
      {preview && (
        <div className="admin__preview-container">
          <Contacts content={compiledData} />
        </div>
      )}
    </div>
  );
}

export default AdminContacts;
