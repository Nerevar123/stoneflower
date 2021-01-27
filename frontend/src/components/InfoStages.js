import React from "react";
import { Link } from "react-scroll";

function InfoStages() {
  return (
    <article className="surfaces">
      <h2 className="content__title">Варианты поверностей</h2>
      <p className="content__text">
        Помимо изображенных на поверхности материала природных и художественных
        ликов, разработанных дизайнерами Италии и Испании, материал выполнен с
        разнообразными рельефами: полированный, шелковистый, матовый,
        повторяющий грубую обработанную поверхность дерева и камня.
      </p>
      <Link to="/" className="surfaces__button link">
        Читать далее
      </Link>
      <ul className="surfaces__list list">
        <li className="surfaces__list-item">
          <img alt="Изображение" className="surfaces__image" />
          <button className="surfaces__button button">Дерево</button>
        </li>
        <li className="surfaces__list-item">
          <img alt="Изображение" className="surfaces__image" />
          <button className="surfaces__button button">Камень</button>
        </li>
        <li className="surfaces__list-item">
          <img alt="Изображение" className="surfaces__image" />
          <button className="surfaces__button button">Цемент</button>
        </li>
        <li className="surfaces__list-item">
          <img alt="Изображение" className="surfaces__image" />
          <button className="surfaces__button button">Дизайн</button>
        </li>
      </ul>
    </article>
  );
}

export default InfoStages;
