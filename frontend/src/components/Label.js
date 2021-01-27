import React from "react";

function Label({
  validation,
  className,
  name,
  labelText,
  maxLength,
  placeholder = "Введите текст",
  withCount,
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
          placeholder={placeholder}
          maxLength={maxLength}
          {...props}
        />
        {withCount && (
          <button
            type="button"
            onClick={resetInput}
            className={`${className}__reset-button`}
          />
        )}
      </div>
      {withCount && (
        <span className={`${className}__input-counter`}>{`${
          values[name] ? values[name].length : 0
        }/${maxLength}`}</span>
      )}
    </div>
  );
}

export default Label;
