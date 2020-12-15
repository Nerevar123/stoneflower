import React from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import header__logo from '../images/header__logo.svg';

function Header() {
  return (
    <header className="header">
        <img className="header__logo logo" src={header__logo} alt="Логотип"/>
        <nav className="header__links">
          <NavLink smooth to="/" className="header__link link">Главная</NavLink>
          <NavLink smooth to="/" className="header__link link">Услуги</NavLink>
          <NavLink smooth to="/" className="header__link link">Поверхности</NavLink>
          <NavLink smooth to="/" className="header__link link">Портфолио</NavLink>
          <NavLink smooth to="/" className="header__link link">Контакты</NavLink>
        </nav>
        <button className="header__button button">Оставить заявку</button>
      </header>
  )
}

export default Header;
