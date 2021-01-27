import React from "react";
import Label from "./Label";

function Login({ validation, isSaving, onAuthorize }) {
  const { values, errors, isValid, resetForm } = validation;

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAuthorize({
      email: values.email || "",
      password: values.password || "",
    });
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form
        className="login__form"
        name="login"
        onSubmit={handleSubmit}
        method="GET"
      >
        <fieldset className="login__fields">
          <Label
            validation={validation}
            className="login"
            name="email"
            labelText="Заголовок"
            placeholder="Email"
            type="email"
            required
            autoComplete="username"
          />
          <Label
            validation={validation}
            className="login"
            name="password"
            labelText="Заголовок"
            placeholder="Пароль"
            type="password"
            required
            minLength="4"
            autoComplete="current-password"
          />
          <span
            className={`login__error ${
              errors.submit ? "login__error_active" : ""
            }`}
          >
            {errors.submit || ""}
          </span>
        </fieldset>
        <button
          type="submit"
          disabled={!isValid}
          className={`login__save-button ${
            !isValid ? "login__save-button_disabled" : ""
          }`}
        >
          Сохранить
        </button>
      </form>
    </section>
  );
}

export default Login;
