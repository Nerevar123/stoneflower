import React from "react";
// import { HashLink as Link } from 'react-router-hash-link';
import { NavHashLink as NavLink } from "react-router-hash-link";

function Surfaces() {
  return (
    <article className="surfaces">
            <h2 className="content__title">Варианты поверностей</h2>
            <p className="content__text">Помимо изображенных на поверхности материала природных и художественных ликов, разработанных  дизайнерами Италии и Испании, материал выполнен с разнообразными рельефами: полированный, шелковистый, матовый, повторяющий грубую обработанную поверхность дерева и камня.</p>
            <NavLink to="/" className="surfaaces__link link">Читать далее</NavLink>
            <ul className="surfaces__list list">
              <li className="surfaces__list-item">
                <img className="surfaces__image" />
                <button className="surfaces__button button">Дерево</button>
              </li>
              <li className="surfaces__list-item">
                <img className="surfaces__image" />
                <button className="surfaces__button button">Камень</button>
              </li>
              <li className="surfaces__list-item">
                <img className="surfaces__image" />
                <button className="surfaces__button button">Цемент</button>
              </li>
              <li className="surfaces__list-item">
                <img className="surfaces__image" />
                <button className="surfaces__button button">Дизайн</button>
              </li>
            </ul>
          </article>
  );
}

export default Surfaces;




