import React, { useState } from "react";
import { Link } from "react-scroll";
import arrowIcon from "../images/icons/ArrowRight.svg";
import useWindowSize from "../hooks/useWindowSize";

function Advantages({ textContent, icons, showModal, image, withIcons }) {
  const [textExpanded, setTextExpanded] = useState(false);
  // const slide = 2;
  function handleOpenEvent() {
    console.log(image);
    showModal(image);
  }
  function handleTextExpand() {
    setTextExpanded(!textExpanded);
  }

  const window = useWindowSize();

  return (
    <article className="advantages">
      <h2 className="content__title">{textContent.title}</h2>
      <div className="content__info-block">
        <div className="content__text-container">
          <p className="content__text">
            {textContent.shortTextBeforeAccent}
            <span className="advantages__accent">
              {textContent.shortTextAccent}
            </span>
            {textContent.shortTextAfterAccent}
          </p>
          <button
            onClick={handleTextExpand}
            className={`advantages__link link ${textExpanded ? "open" : ""}`}
          >
            <span className="link__accent">{textContent.linkText}</span>
            <div className="link__expand-arrow"></div>
          </button>
          <div
            className={`content__expand-container ${
              textExpanded ? "content__expand-container_opened" : ""
            }`}
          >
            <p className="content__text">{textContent.expandedText}</p>
          </div>
        </div>
        {window.width > 849 && (
          <Link
            to="applicability"
            spy={false}
            smooth={true}
            offset={-30}
            duration={500}
            href="/"
            className="link_type_navigation link"
          >
            таблица применимости
            <img
              src={arrowIcon}
              alt="иконка стрелки"
              className="icon icon_type_arrow"
            />
          </Link>
        )}
        {window.width < 849 && (
          <button
            onClick={handleOpenEvent}
            className="link_type_navigation link"
          >
            таблица применимости
            <img
              src={arrowIcon}
              alt="иконка стрелки"
              className="icon icon_type_arrow"
            />
          </button>
        )}
      </div>
      {withIcons && (
        <ul className="advantages__list list">
          <li className="advantages__list-item">
            <img
              src={icons.icon_1}
              alt="Иконка"
              className="advantages__icon advantages__icon_place_table"
            />
            <p className="content__text content__text_place_advantages">
              Обширная область применения
            </p>
          </li>
          <li className="advantages__list-item">
            <img
              src={icons.icon_2}
              alt="Иконка"
              className="advantages__icon advantages__icon_place_table"
            />
            <p className="content__text content__text_place_advantages">
              Легко наносится на старую облицовку
            </p>
          </li>
          <li alt="Иконка" className="advantages__list-item">
            <img
              src={icons.icon_3}
              alt="Иконка"
              className="advantages__icon advantages__icon_place_table"
            />
            <p className="content__text content__text_place_advantages">
              Прочный и гибкий матриал
            </p>
          </li>
          <li className="advantages__list-item">
            <img
              src={icons.icon_4}
              alt="Иконка"
              className="advantages__icon advantages__icon_place_table"
            />
            <p className="content__text content__text_place_advantages">
              Гарантийный срок службы 20 лет
            </p>
          </li>
          <li className="advantages__list-item">
            <img
              src={icons.icon_5}
              alt="Иконка"
              className="advantages__icon advantages__icon_place_table"
            />
            <p className="content__text content__text_place_advantages">
              Сертифицирован для дет. садов и мед. учреждений
            </p>
          </li>
          <li className="advantages__list-item">
            <img
              src={icons.icon_6}
              alt="Иконка"
              className="advantages__icon advantages__icon_place_table"
            />
            <p className="content__text content__text_place_advantages">
              Не содержит токсичных веществ, экологичен
            </p>
          </li>
          <li className="advantages__list-item">
            <img
              src={icons.icon_7}
              alt="Иконка"
              className="advantages__icon advantages__icon_place_table"
            />
            <p className="content__text content__text_place_advantages">
              Не горит, не впитывает влагу, не изменяет цвет
            </p>
          </li>
          <li className="advantages__list-item">
            <img
              src={icons.icon_8}
              alt="Иконка"
              className="advantages__icon advantages__icon_place_table"
            />
            <p className="content__text content__text_place_advantages">
              Стойкий к щелочам и кислотам
            </p>
          </li>
        </ul>
      )}
    </article>
  );
}

export default Advantages;
