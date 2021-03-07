import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="not-found">
      <div className="not-found__icon" />
      <h3 className="not-found__title">404 - Страница не найдена</h3>
      <Link className="not-found__link" to="/">
        Вернуться на главную
      </Link>
    </section>
  );
}

export default PageNotFound;
