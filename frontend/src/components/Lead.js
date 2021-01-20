import React from "react";
import { Link } from "react-scroll";

function Lead({ content }) {
  return (
    <article id="main" className="lead">
      <h1 className="lead__header">{content.heading}</h1>
      <ul className="lead__list list">
        <li className="lead__list-item">
          <p className="lead__text">
          {content.item_1}
          </p>
        </li>
        <li className="lead__list-item">
          <p className="lead__text">{content.item_2}</p>
        </li>
        <li className="lead__list-item">
          <p className="lead__text">{content.item_3}</p>
        </li>
      </ul>
      <Link
        className="lead__link link"
        to="form"
        spy={false}
        smooth={true}
        offset={-200}
        duration={500}
      >
        Бесплатная консультация
      </Link>
    </article>
  );
}

export default Lead;
