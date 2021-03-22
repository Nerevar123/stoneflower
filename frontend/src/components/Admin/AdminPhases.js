import React, { useState, useEffect, useRef } from "react";
import Phases from "../Phases";
import Label from "../Label";
import { patchText } from "../../utils/api";

function AdminPhases({
  validation,
  phasesText,
  onPatchData,
  phasesIcons,
  menuRef,
}) {
  const [compiledData, setCompiledData] = useState(phasesText);
  const [preview, showPreview] = useState(false);

  const previewRef = useRef();

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(phasesText);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [phasesText, resetForm, setIsValid]);

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

  function handleSubmit(e) {
    e.preventDefault();

    onPatchData(
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
      phasesText.id,
      patchText
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
    showPreview(true);
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
            name="phases1"
            labelText="Пункт 1"
            type="text"
            required
            maxLength="40"
            withCount
            height="40px"
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
            height="40px"
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
            height="40px"
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
            height="40px"
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
      <div
        ref={previewRef}
        style={{ minWidth: preview ? "1180px" : "0" }}
        className="admin__preview-container"
      >
        {preview && (
          <button onClick={scrollToMenu} className="admin__go-back">
            Назад
          </button>
        )}
        {preview && (
          <Phases phasesText={compiledData} phasesIcons={phasesIcons} />
        )}
      </div>
    </div>
  );
}

export default AdminPhases;
