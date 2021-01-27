import React from "react";

function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const resetInput = (e) => {
    const name = e.target.previousSibling.name;
    setValues({ ...values, [name]: "" });
    setErrors({ ...errors, [name]: "" });
    setIsValid(false);
  };

  return {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    setErrors,
    setValues,
    resetForm,
    resetInput,
  };
}

export default useFormWithValidation;
