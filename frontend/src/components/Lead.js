import React from "react";
// import { HashLink as Link } from 'react-router-hash-link';
import { NavHashLink as NavLink } from "react-router-hash-link";


function Lead() {
  return (
    <article className="lead">
      <h1 className="lead__header">Студия Керамогранита «Каменный цветок»</h1>
      <ul className="lead__list list">
        <li className="lead__list-item">
          <p className="lead__text">
            Производство изделий из листового керамического проката
          </p>
        </li>
        <li className="lead__list-item">
          <p className="lead__text">Дизайн интерьеров</p>
        </li>
        <li className="lead__list-item">
          <p className="lead__text">Cветотехнические решения для дома</p>
        </li>
      </ul>
      <button className="lead__button button">Бесплатная консультация</button>
    </article>
  )
}

export default Lead;
