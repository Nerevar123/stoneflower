import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="not-found">
      <div className="not-found__message-wrapper">
        <h2 className="not-found__title">Ошибка 404</h2>
        <p className="not-found__message">
          {`Страница не найдена. 
          Возможно, она удалена или введён
          некорректный адрес.`}
        </p>
        <Link className="not-found__link" to="/">
          Назад
        </Link>
      </div>
    </section>
  );
}

export default PageNotFound;
