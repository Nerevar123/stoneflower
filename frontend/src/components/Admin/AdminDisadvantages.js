import React, { useState, useEffect } from "react";
import Disadvantages from "../Disadvantages";
import Label from "../Label";

function AdminDisadvantages({ validation, disadvantagesText, onSaveText }) {
  const [compiledData, setCompiledData] = useState(disadvantagesText);
  const [preview, showPreview] = useState(false);

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(disadvantagesText);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [disadvantagesText, resetForm, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    onSaveText(
      {
        title: "disadvantages",
        content: [
          {
            name: "title",
            text: values.title,
          },
          {
            name: "disadvantages1",
            text: values.disadvantages1,
          },
          {
            name: "disadvantages2",
            text: values.disadvantages2,
          },
          {
            name: "disadvantages3",
            text: values.disadvantages3,
          },
        ],
      },
      disadvantagesText.id
    );
  }

  function handlePreview() {
    setCompiledData({
      title: values.title || disadvantagesText.title,
      disadvantages1: values.disadvantages1 || disadvantagesText.disadvantages1,
      disadvantages2: values.disadvantages2 || disadvantagesText.disadvantages2,
      disadvantages3: values.disadvantages3 || disadvantagesText.disadvantages3,
    });
    showPreview(!preview);
  }

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Недостатки</h2>
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
            name="title"
            labelText="Заголовок"
            type="text"
            required
            maxLength="65"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="disadvantages1"
            labelText="Пункт 1"
            type="text"
            required
            maxLength="260"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="disadvantages2"
            labelText="Пункт 2"
            type="text"
            required
            maxLength="260"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="disadvantages3"
            labelText="Пункт 3"
            type="text"
            required
            maxLength="260"
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
              onClick={(_) => resetForm(disadvantagesText, {}, true)}
              className="admin__upload-button admin__upload-button_type_cancel"
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
      {preview && (
        <div className="admin__preview-container">
          <Disadvantages disadvantagesContent={compiledData} />
        </div>
      )}
    </div>
  );
}

export default AdminDisadvantages;
