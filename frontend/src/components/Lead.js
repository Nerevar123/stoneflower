import React, { useEffect } from "react";
import { Link } from "react-scroll";

function Lead({ content, leadBgImage }) {
  return (
    <article id="main" className="lead" style={{
      backgroundImage: `url(${leadBgImage && (leadBgImage.path || leadBgImage)})`
    }} >
      <h1 className="lead__header">{content.leadTitle}</h1>
      <ul className="lead__list list">
        <li className="lead__list-item">
          <p className="lead__text">
          {content.leadText1}
          </p>
        </li>
        <li className="lead__list-item">
          <p className="lead__text">{content.leadText2}</p>
        </li>
        <li className="lead__list-item">
          <p className="lead__text">{content.leadText3}</p>
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
