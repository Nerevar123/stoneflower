import React, { useState } from "react";
import header__logo from "../images/logo.svg";
import useWindowSize from "../hooks/useWindowSize";
// import { Link } from "react-scroll";
import { NavLink, Link } from "react-router-dom";

function Header({ handleRequestButtonClick, handleMainLinkClick }) {
  const [menuOpened, setMenuOpened] = useState(false);

  function toggleMenuOpen() {
    setMenuOpened(!menuOpened);
  }

  const size = useWindowSize();
  return (
    <header className={`header ${menuOpened ? "open" : ""}`}>
      <img className="header__logo logo" src={header__logo} alt="Логотип" />
      {size.width > 849 && (
        <>
          <nav className="header__links">
            <NavLink
              className="header__link link"
              activeClassName="header__link_active"
              exact
              to="/"
              onClick={handleMainLinkClick}
            >
              Главная
            </NavLink>
            <NavLink
              className="header__link link"
              activeClassName="header__link_active"
              exact
              to="/surfaces"
            >
              Поверхности
            </NavLink>
            <NavLink
              className="header__link link"
              activeClassName="header__link_active"
              exact
              to="/portfolio"
            >
              Портфолио
            </NavLink>
            <NavLink
              className="header__link link"
              activeClassName="header__link_active"
              exact
              to="/advices"
            >
              Советы дизайнера
            </NavLink>
            <NavLink
              className="header__link link"
              activeClassName="header__link_active"
              exact
              to="/contacts"
            >
              Контакты
            </NavLink>
          </nav>

          <button className="header__order-button button">
            <Link
              className="header__order-link"
              to="/"
              onClick={handleRequestButtonClick}
            >
              Оставить заявку
            </Link>
          </button>
        </>
      )}
      {size.width < 850 && (
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
                className="header__link link"
                activeClassName="header__link_active"
                exact
                to="/"
                onClick={() => {
                  toggleMenuOpen();
                  handleMainLinkClick();
                }}
              >
                Главная
              </NavLink>
              <NavLink
                className="header__link link"
                activeClassName="header__link_active"
                exact
                to="/surfaces"
                onClick={toggleMenuOpen}
              >
                Поверхности
              </NavLink>
              <NavLink
                className="header__link link"
                activeClassName="header__link_active"
                exact
                to="/portfolio"
                onClick={toggleMenuOpen}
              >
                Портфолио
              </NavLink>
              <NavLink
                className="header__link link"
                activeClassName="header__link_active"
                exact
                to="/advices"
                onClick={toggleMenuOpen}
              >
                Советы дизайнера
              </NavLink>
              <NavLink
                className="header__link link"
                activeClassName="header__link_active"
                exact
                to="/contacts"
                onClick={toggleMenuOpen}
              >
                Контакты
              </NavLink>
            </nav>
            <button
              className="header__order-button button"
              onClick={toggleMenuOpen}
            >
              <Link
                onClick={() => {
                  toggleMenuOpen();
                  handleRequestButtonClick();
                }}
                className="header__order-link"
                to="/"
              >
                Оставить заявку
              </Link>
            </button>
          </div>
          <div className="header__overlay" onClick={toggleMenuOpen}></div>
        </>
      )}
    </header>
  );
}

export default Header;
