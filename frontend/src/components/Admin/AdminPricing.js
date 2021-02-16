import React, { useState, useEffect } from "react";
import Pricing from "../Pricing";
import Label from "../Label";
import { patchText } from "../../utils/api";

function AdminPricing({ validation, pricingContent, onPatchData }) {
  const [compiledData, setCompiledData] = useState(pricingContent);
  const [preview, showPreview] = useState(false);

  const { values, isValid, resetForm, setIsValid } = validation;

  useEffect(() => {
    resetForm(pricingContent);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [pricingContent, resetForm, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    onPatchData(
      {
        title: "pricing",
        content: [
          {
            name: "heading",
            text: values.heading,
          },
          {
            name: "textMajor",
            text: values.textMajor,
          },
          {
            name: "textMinor",
            text: values.textMinor,
          },
          {
            name: "buttonText",
            text: values.buttonText,
          },
        ],
      },
      pricingContent.id,
      patchText
    );
  }

  function handlePreview() {
    setCompiledData({
      heading: values.heading || pricingContent.heading,
      textMajor: values.textMajor || pricingContent.textMajor,
      textMinor: values.textMinor || pricingContent.textMinor,
      buttonText: values.buttonText || pricingContent.buttonText,
    });
    showPreview(!preview);
  }

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Расчёт цен</h2>
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
            name="textMajor"
            labelText="Первый абзац"
            type="text"
            required
            maxLength="300"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="textMinor"
            labelText="Второй абзац"
            type="text"
            required
            maxLength="200"
            withCount
          />
          <Label
            validation={validation}
            className="admin"
            name="buttonText"
            labelText="Текст кнопки"
            type="text"
            required
            maxLength="20"
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
              onClick={(_) => resetForm(pricingContent, {}, true)}
              className="admin__upload-button admin__upload-button_type_cancel"
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
      {preview && (
        <div className="admin__preview-container">
          <Pricing content={compiledData} />
        </div>
      )}
    </div>
  );
}

export default AdminPricing;
