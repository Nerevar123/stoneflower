import React, { useState } from "react";
// import { HashLink as Link } from 'react-router-hash-link';
import { NavHashLink as NavLink } from "react-router-hash-link";
import header__logo from "../images/logo.svg";
import useWindowSize from "../hooks/useWindowSize";
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
              <NavLink
                smooth
                to="/"
                className="header__link link"
                onClick={toggleMenuOpen}
              >
                Главная
              </NavLink>
              <NavLink
                smooth
                to="/"
                className="header__link link"
                onClick={toggleMenuOpen}
              >
                Услуги
              </NavLink>
              <NavLink
                smooth
                to="/"
                className="header__link link"
                onClick={toggleMenuOpen}
              >
                Поверхности
              </NavLink>
              <NavLink
                smooth
                to="/"
                className="header__link link"
                onClick={toggleMenuOpen}
              >
                Портфолио
              </NavLink>
              <NavLink
                smooth
                to="/"
                className="header__link link"
                onClick={toggleMenuOpen}
              >
                Контакты
              </NavLink>
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
