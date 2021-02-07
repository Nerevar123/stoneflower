import React, { useState, useEffect } from "react";
import Phases from "../Phases";
import Label from "../Label";

function AdminPhases({ validation, phasesText, onSaveText, phasesIcons }) {
  const [compiledData, setCompiledData] = useState(phasesText);
  const [preview, showPreview] = useState(false);

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(phasesText);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [phasesText, resetForm, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    onSaveText(
      {
        title: "phases",
        content: [
          {
            name: "title",
            text: values.title,
          },
          {
            name: "phases1",
            text: values.phases1,
          },
          {
            name: "phases2",
            text: values.phases2,
          },
          {
            name: "phases3",
            text: values.phases3,
          },
          {
            name: "phases4",
            text: values.phases4,
          },
        ],
      },
      phasesText.id
    );
  }

  function handlePreview() {
    setCompiledData({
      title: values.title || phasesText.title,
      phases1: values.phases1 || phasesText.phases1,
      phases2: values.phases2 || phasesText.phases2,
      phases3: values.phases3 || phasesText.phases3,
      phases4: values.phases4 || phasesText.phases4,
    });
    showPreview(!preview);
  }

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Этапы работы</h2>
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
            name="phases1"
            labelText="Пункт 1"
            type="text"
            required
            maxLength="40"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="phases2"
            labelText="Пункт 2"
            type="text"
            required
            maxLength="40"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="phases3"
            labelText="Пункт 3"
            type="text"
            required
            maxLength="40"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="phases4"
            labelText="Пункт 4"
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
              onClick={(_) => resetForm(phasesText, {}, true)}
              className="admin__upload-button admin__upload-button_type_cancel"
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
      {preview && (
        <div className="admin__preview-container">
          <Phases phasesText={compiledData} phasesIcons={phasesIcons} />
        </div>
      )}
    </div>
  );
}

export default AdminPhases;
