import React from "react";
import shieldWarning from "../images/ShieldWarning.svg";

function Disadvantages({ disadvantagesContent }) {
  return (
    <article className="disadvantages">
      <h2 className="content__title">{disadvantagesContent.title}</h2>
      <ul className="disadvantages__list list">
        <li className="disadvantages__list-item">
          <img
            className="disadvantages__list-image"
            src={shieldWarning}
            alt="Изображение списка"
          />
          <p className="content__text">{disadvantagesContent.disadvantages1}</p>
        </li>
        <li className="disadvantages__list-item">
          <img
            className="disadvantages__list-image"
            src={shieldWarning}
            alt="Изображение списка"
          />
          <p className="content__text">{disadvantagesContent.disadvantages2}</p>
        </li>
        <li className="disadvantages__list-item">
          <img
            className="disadvantages__list-image"
            src={shieldWarning}
            alt="Изображение списка"
          />
          <p className="content__text">{disadvantagesContent.disadvantages3}</p>
        </li>
      </ul>
    </article>
  );
}

export default Disadvantages;
