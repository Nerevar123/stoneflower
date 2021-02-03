import React from "react";
import { Link } from "react-scroll";
import useWindowSize from "../hooks/useWindowSize";

function Lead({ content, leadBgImage }) {
  const window = useWindowSize();
  return (
    <article
      id="main"
      className="lead"
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.58) 0.73%,
          rgba(255, 255, 255, 0) 61.78%
        ), url(${
          leadBgImage && (leadBgImage.path || leadBgImage)
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `cover, ${window.width > 1280?'cover':'1280px'}`,
        backgroundPosition: 'top left, top left',
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
