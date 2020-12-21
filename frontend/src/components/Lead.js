import React from "react";
// import { HashLink as Link } from 'react-router-hash-link';
import { NavHashLink as NavLink } from "react-router-hash-link";
import { Link, animateScroll as scroll } from "react-scroll";

function Lead() {
  return (
    <article id="main" className="lead">
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
      <Link
        className="lead__link link"
        to="services"
        spy={false}
        smooth={true}
        offset={-80}
        duration={500}
      >
        Бесплатная консультация
      </Link>
    </article>
  );
}

export default Lead;
