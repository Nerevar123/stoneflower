import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import header__logo from "../images/logo.svg";
import useWindowSize from "../hooks/useWindowSize";
// as scroll говорит, что дальше будет использоваться scroll, а если используется сам Link то наверн это лишнее
import { Link, animateScroll as scroll } from "react-scroll";

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);

  function toggleMenuOpen() {
    setMenuOpened(!menuOpened);
  }

  const window = useWindowSize();
  return (
    <header className={`header ${menuOpened ? "open" : ""}`}>
      <img className="header__logo logo" src={header__logo} alt="Логотип" />
      {window.width > 849 && (
        <>
          <nav className="header__links">
            <Link
              className="header__link link"
              activeClass="header__link_active"
              to="main"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              Главная
            </Link>
            <Link
              className="header__link link"
              activeClass="header__link_active"
              to="services"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              Услуги
            </Link>
            <Link
              className="header__link link"
              activeClass="header__link_active"
              to="surfaces"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              Поверхности
            </Link>
            <Link
              className="header__link link"
              activeClass="header__link_active"
              to="portfolio"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              Портфолио
            </Link>
            <Link
              className="header__link link"
              activeClass="header__link_active"
              to="contacts"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              Контакты
            </Link>
          </nav>
          <button className="header__order-button button">
            Оставить заявку
          </button>
        </>
      )}
      {window.width < 850 && (
        <>
          <button
            className="header__menu-button button"
            onClick={toggleMenuOpen}
          >
            <div className="header__menu-bar"></div>
            <div className="header__menu-bar"></div>
            <div className="header__menu-bar"></div>
          </button>
          <div className="header__sidebar">
            <nav className="header__links">
            <Link
              className="header__link link"
              activeClass="header__link_active"
              to="main"
              spy={false}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={toggleMenuOpen}
            >
              Главная
            </Link>
            <Link
              className="header__link link"
              activeClass="header__link_active"
              to="services"
              spy={false}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={toggleMenuOpen}
            >
              Услуги
            </Link>
            <Link
              className="header__link link"
              activeClass="header__link_active"
              to="surfaces"
              spy={false}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={toggleMenuOpen}
            >
              Поверхности
            </Link>
            <Link
              className="header__link link"
              activeClass="header__link_active"
              to="portfolio"
              spy={false}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={toggleMenuOpen}
            >
              Портфолио
            </Link>
            <Link
              className="header__link link"
              activeClass="header__link_active"
              to="contacts"
              spy={false}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={toggleMenuOpen}
            >
              Контакты
            </Link>
            </nav>
            <button
              className="header__order-button button"
              onClick={toggleMenuOpen}
            >
              Оставить заявку
            </button>
          </div>
          <div className="header__overlay" onClick={toggleMenuOpen}></div>
        </>
      )}
    </header>
  );
}

export default Header;
