import React, { useState, useEffect, createRef, useRef } from "react";
import { lead } from "../../utils/config";
import Lead from "../Lead";

function AdminLeadEditor() {
  const [data, setData] = useState(lead);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(true);
  const leadHeadingInputRef = useRef();
  const leadFirstItemImputRef = useRef();
  const leadSecondItemInputItemRef = useRef();
  const leadThirdItemInputItemRef = useRef();
  const [compiledData, setCompiledData] = useState(data);
  // const [headingText, setHeadingText] = useState(lead.heading);
  // const [firstItemText, setFirstItemText] = useState(lead.item_1);
  // const [secondItemText, setSecondItemText] = useState(lead.item_2);
  // const [thirdItemText, setThirdItemText] = useState(lead.item_3);

  function Input({ forwardRef, maxLength, value}) {
    const [isValid, setIsValid] = useState(true);
    const [symbolCounter, setSymbolCounter] = useState(0);
    const eraseInput = () => {
      forwardRef.current.value = "";
      setSymbolCounter(0);
    };
    const handleCounterChange = (ref) => {
      const stringLength = ref.current.value.split("").length;
      setSymbolCounter(stringLength);
    };
    useEffect(() => {
      symbolCounter > 0 && symbolCounter <= maxLength
        ? setIsValid(true)
        : setIsValid(false);
    }, [symbolCounter]);

    useEffect(() => {
      forwardRef.current.value = value;
      setSymbolCounter(value.split("").length);
    }, []);

    return (
      <>
        <div className="admin__input-wrapper">
          <input
            ref={forwardRef}
            onChange={() => {
              handleCounterChange(forwardRef);
            }}
            placeholder="Введите текст"
            className={`admin__input ${isValid ? "" : "admin__input_invalid"}`}
          />
          <button
            type="button"
            onClick={eraseInput}
            className="admin__reset-button"
          ></button>
        </div>

        <span className="admin__input-counter">{`${symbolCounter}/${maxLength}`}</span>
      </>
    );
  }

  function compileInputData() {
    setData({
      heading: leadHeadingInputRef.current.value,
      item_1: leadFirstItemImputRef.current.value,
      item_2: leadSecondItemInputItemRef.current.value,
      item_3: leadThirdItemInputItemRef.current.value,
    });
  }
  useEffect(() => {
    setCompiledData(data);
  },[data])

  return (
    <div className="admin__edit-wrapper">
      <div className="admin__form-area">
        <h2 className="admin__heading">Главная</h2>
        <form className="admin__form admin__form_type_upload admin__form_place_lead">
          <div className="admin__form-heading-container">
            <p className="admin__form-heading">Изображение</p>
            <p className="admin__preview-link">Показать превью</p>
          </div>
          <p className="admin_requirements-heading">Требования:</p>
          <ul className="admin__requirements-list">
            <li className="admin__requirements-item">• Размер: 1440x752px</li>
            <li className="admin__requirements-item">• Вес: не более 1Мб</li>
            <li className="admin__requirements-item">• Формат: JPEG/PNG</li>
          </ul>
          <div className="admin__upload-info admin__upload-info_visible">
            <div className="admin__progress-info admin__progress-info_completed"></div>
            <p className="admin__file-name">картинка_1.jpg</p>
          </div>
          <div className="admin__buttons-container">
            <button
              type="button"
              className={`admin__upload-button admin__upload-button_type_select ${
                isUploading ? "admin__upload-button_state_uploading" : ""
              } ${isUploaded ? "admin__upload-button_state_uploaded" : ""}`}
            >
              {isUploaded ? "Сохранить" : "Выбрать файл"}
            </button>
            {isUploaded && (
              <button
                type="button"
                className="admin__upload-button admin__upload-button_type_cancell"
              >
                Отменить
              </button>
            )}
          </div>
        </form>
        <form className="admin__form admin__form_type_lead-text">
          <div className="admin__form-heading-container">
            <p className="admin__form-heading">Текст</p>
            <p onClick={compileInputData} className="admin__preview-link">
              Показать превью
            </p>
          </div>
          <div className="admin__input-container">
            <label className="admin__input-label">Заголовок</label>
            <Input

              value={data.heading}
              forwardRef={leadHeadingInputRef}
              maxLength={45}
            />
          </div>
          <div className="admin__input-container">
            <label className="admin__input-label">Пункт 1</label>
            <Input

              value={data.item_1}
              forwardRef={leadFirstItemImputRef}
              maxLength={65}
            />
          </div>
          <div className="admin__input-container">
            <label className="admin__input-label">Пункт 2</label>
            <Input

              value={data.item_2}
              forwardRef={leadSecondItemInputItemRef}
              maxLength={65}
            />
          </div>
          <div className="admin__input-container">
            <label className="admin__input-label">Пункт 3</label>
            <Input

              value={data.item_3}
              forwardRef={leadThirdItemInputItemRef}
              maxLength={65}
            />
          </div>
          <div className="admin__buttons-container">
            <button
              type="button"
              className="admin__upload-button admin__upload-button_type_select"
            >
              Сохранить
            </button>
            <button
              type="button"
              className="admin__upload-button admin__upload-button_type_cancell"
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
      <div className="admin__preview-container">
        <Lead content={compiledData} />
      </div>
    </div>
  );
}

export default AdminLeadEditor;
