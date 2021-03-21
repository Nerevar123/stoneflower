import React, { useState, useEffect, useRef } from "react";
import Advantages from "../Advantages";
import Label from "../Label";
import { patchText } from "../../utils/api";

function AdminAdvantages({ validation, advantagesText, onPatchData, menuRef }) {
  const [compiledData, setCompiledData] = useState(advantagesText);
  const [preview, showPreview] = useState(false);
  const [description, setDescription] = useState("");
  const previewRef = useRef();

  const scrollToPreview = () => {
    setTimeout(() => {
      previewRef.current.scrollIntoView({
        inline: "start",
        behavior: "smooth",
      });
    }, 100);
  };
  const { values, isValid, resetForm, setIsValid } = validation;
  const scrollToMenu = () => {
    menuRef.current.scrollIntoView({ inline: "start", behavior: "smooth" });
  };

  useEffect(() => {
    setDescription(
      advantagesText.shortTextBeforeAccent +
        advantagesText.shortTextAccent +
        advantagesText.shortTextAfterAccent
    );
    resetForm({
      title: advantagesText.title,
      description: description,
      linkText: advantagesText.linkText,
      expandedText: advantagesText.expandedText,
    });
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [advantagesText, description, resetForm, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    onPatchData(
      {
        title: "advantages",
        content: [
          {
            name: "title",
            text: values.title,
          },
          {
            name: "shortTextBeforeAccent",
            text: values.description.split(" ").slice(0, 3).join(" ") + " ",
          },
          {
            name: "shortTextAccent",
            text: values.description.split(" ").slice(3, 6).join(" "),
          },
          {
            name: "shortTextAfterAccent",
            text: " " + values.description.split(" ").slice(6).join(" "),
          },
          {
            name: "linkText",
            text: values.linkText,
          },
          {
            name: "expandedText",
            text: values.expandedText,
          },
        ],
      },
      advantagesText.id,
      patchText
    );
  }

  function handlePreview() {
    setCompiledData({
      title: values.title || advantagesText.title,
      shortTextBeforeAccent:
        values.description.split(" ").slice(0, 3).join(" ") + " ",
      shortTextAccent: values.description.split(" ").slice(3, 6).join(" "),
      shortTextAfterAccent:
        " " + values.description.split(" ").slice(6).join(" "),
      linkText: values.linkText || advantagesText.linkText,
      expandedText: values.expandedText || advantagesText.expandedText,
    });
    showPreview(true);
  }

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Преимущества</h2>
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
                scrollToPreview();
                handlePreview();
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
            name="description"
            labelText="Описание"
            type="text"
            required
            maxLength="400"
            withCount
            height="120px"
          />
          <Label
            validation={validation}
            className="admin"
            name="linkText"
            labelText="Раскрывающийся текст (заголовок)"
            type="text"
            required
            maxLength="60"
            withCount
            height="100px"
          />
          <Label
            validation={validation}
            className="admin"
            name="expandedText"
            labelText="Раскрывающийся текст (описание)"
            type="text"
            required
            maxLength="1500"
            withCount
            height="120px"
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
              onClick={(_) =>
                resetForm(
                  {
                    title: advantagesText.title,
                    description: description,
                    linkText: advantagesText.linkText,
                    expandedText: advantagesText.expandedText,
                  },
                  {},
                  true
                )
              }
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
          <>
            <Advantages textContent={compiledData} />
          </>
        )}
      </div>
    </div>
  );
}

export default AdminAdvantages;
