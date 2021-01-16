import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import cn from 'classnames';
import * as Yup from "yup";
import 'yup-phone';

function PostForm({ content, showModal }) {

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const initialValues = {
    name: "",
    tel: "",
    email: "",
    description: ""
  };

  const handleSubmit = (values) =>
  new Promise((resolve, reject) => {
      console.log('sended', values);
      resolve(true);
  })

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Не менее двух символов")
      .required("Вы пропустили это поле"),
    tel: Yup.string()
      .phone("RU", false, "Введите корректный номер телефона")
      .required("Вы пропустили это поле"),
    email: Yup.string()
      .typeError("Введите корректный email-адрес")
      .email("Введите email-адрес")
      .required("Вы пропустили это поле"),
  });

  return (
    <article className="contact__form">
      <h2 className="content__title content__title_place_form">{content.heading}</h2>
      <p className="content__text">
      {content.subHeading}
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          await sleep(500);
          handleSubmit(values)
            .then(() => {
              alert(JSON.stringify(values, null, 2));
              actions.resetForm();
              showModal();
            })
            .catch((error) => {
              actions.setFieldError("submit", error.message);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {({
          isSubmitting,
          dirty,
          isValid,
          errors,
          touched,
          values,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form className="form" noValidate>
            <fieldset className="form__fieldset">
              <div className="form__inputs-wrapper">
              <div className="form__credentials-wrapper">
              <label htmlFor="name" className="form__label form__label_type_input">
                <p className="form__heading">Ваше имя</p>
                <Field
                  name="name"
                  type="text"
                  className={`form__input  ${
                    !!errors.name && !!touched.name && "form__input_type_error"
                  }`}
                  placeholder="Иван Иванов"
                />
                <ErrorMessage
                  component="span"
                  name="name"
                  className="form__error"
                />
              </label>
              <label htmlFor="tel" className="form__label form__label_type_input">
              <p className="form__heading">Телефон</p>
                <Field
                  name="tel"
                  type="tel"
                  className={`form__input font ${
                    !!errors.tel && !!touched.tel && "form__input_type_error"
                  }`}
                  placeholder="+7 (___) ___ __ __"
                />
                <ErrorMessage
                  component="span"
                  name="tel"
                  className="form__error"
                />
              </label>
              <label htmlFor="email" className="form__label form__label_type_input">
              <p className="form__heading">E-mail</p>
                <Field
                  name="email"
                  type="email"
                  className={`form__input ${
                    errors.email && !!touched.email && "form__input_type_error"
                  }`}
                  placeholder="example@example.com"
                />
                <ErrorMessage
                  component="span"
                  name="email"
                  className="form__error"
                />
              </label>
              </div>
              <label htmlFor="description" className="form__label form__label_type_textarea">
              <p className="form__heading">Описание задачи</p>
                <Field
                  name="description"
                  as="textarea"
                  className="form__input form__input_type_textarea"
                  placeholder="Например: рассчитать стоимость облицовки фасада"
                />
              </label>
              </div>
                <p className="form__text">
                Отправляя форму, вы даете согласие на обработку своих{' '}
                  <a
                    className="form__link"
                    href={content.offerLink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    персональных данных
                  </a>
                </p>
            </fieldset>
            <div className="form__button-field">
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className={cn("form__button", "button", {
                  form__button_disabled: !isValid || !dirty,
                })}
                text={"123"}
              >
                {isSubmitting ? "Подождите..." : "ОТПРАВИТЬ"}
              </button>
              <span className="form__error ">{errors.submit}</span>
            </div>
          </Form>
        )}
      </Formik>
    </article>
  );
}
export default PostForm;
