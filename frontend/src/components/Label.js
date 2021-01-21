import React from "react";

function Label({
  validation,
  className,
  name,
  labelText,
  maxLength,
  ...props
}) {
  const { values, errors, handleChange, resetInput } = validation;

  return (
    <div className={`${className}__input-container`}>
      <label className={`${className}__input-label`}>{labelText}</label>
      <div className="admin__input-wrapper">
        <input
          name={name}
          className={`input ${className}__input ${
            errors[name] ? `${className}__input_invalid` : ""
          }`}
          value={values[name] || ""}
          onChange={handleChange}
          placeholder="Введите текст"
          maxLength={maxLength}
          {...props}
        />
        <button
          type="button"
          onClick={resetInput}
          className={`${className}__reset-button`}
        />
      </div>
      <span className={`${className}__input-counter`}>{`${
        values[name] ? values[name].length : 0
      }/${maxLength}`}</span>
    </div>
    //   <>
    //     <div className="admin__input-wrapper">
    //       <input
    //         ref={forwardRef}
    //         onChange={() => {
    //           handleCounterChange(forwardRef);
    //         }}
    //         placeholder="Введите текст"
    //         className={`admin__input ${isValid ? "" : "admin__input_invalid"}`}
    //       />
    //       <button
    //         type="button"
    //         onClick={eraseInput}
    //         className="admin__reset-button"
    //       ></button>
    //     </div>

    //     <span className="admin__input-counter">{`${symbolCounter}/${maxLength}`}</span>
    //   </>
  );
}

export default Label;