import React from "react";
import { Link } from "react-scroll";

function Lead({ content, leadBgImage }) {
  return (
    <article
      id="main"
      className="lead"
      style={{
        background: `linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.58) 0.73%,
          rgba(255, 255, 255, 0) 61.78%
        ), url(${
          leadBgImage && (leadBgImage.path || leadBgImage)
        })`, backgroundSize: 'cover',   backgroundRepeat: 'no-repeat'
      }}
    >
      <h1 className="lead__header">{content.leadTitle}</h1>
      <ul className="lead__list list">
        <li className="lead__list-item">
          <p className="lead__text">{content.leadText1}</p>
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
