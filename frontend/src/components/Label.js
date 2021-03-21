import React, { useState, useEffect } from "react";

function Label({
  validation,
  className,
  name,
  labelText,
  maxLength,
  placeholder = "Введите текст",
  withCount,
  height,
  ...props
}) {
  const { values, errors, handleChange, resetInput } = validation;
  const [isProtected, setProtected] = useState(false);
  useEffect(() => {
    if (className === "login") {
      setProtected(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <div className={`${className}__input-container`}>
      <label className={`${className}__input-label`}>{labelText}</label>
      <div className="admin__input-wrapper">
        {isProtected ? (
          <input
            name={name}
            className={`input ${className}__input ${
              errors[name] ? `${className}__input_invalid` : ""
            }`}
            value={values[name] || ""}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={maxLength}
            style={{ height: `${height}` }}
            {...props}
          />
        ) : (
          <textarea
            type={name}
            name={name}
            className={`input ${className}__input ${
              errors[name] ? `${className}__input_invalid` : ""
            }`}
            value={values[name] || ""}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={maxLength}
            style={{ height: `${height}` }}
            {...props}
          />
        )}
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
