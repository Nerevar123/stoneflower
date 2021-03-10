import React, { useEffect, useState } from "react";
import logo from "../images/footer__logo.svg";
import useWindowSize from "../hooks/useWindowSize";
import { NavLink, Link } from "react-router-dom";

function Footer({
  content,
  extended,
  formRef,
  mainRef,
  servicesRef,
  advantagesRef,
  applicabilityRef,
  phasesRef,
  pricingRef,
  suppliersRef,
  handleScrollToElement,
}) {
  const [isFooterExtended, setFooterExtended] = useState(false);
  console.log(content);
  useEffect(() => {
    extended ? setFooterExtended(true) : setFooterExtended(false);
    console.log(isFooterExtended);
  }, [extended]);

  const windowSize = useWindowSize();

  return (
    <footer className="footer">
      {isFooterExtended ? (
        <>
          <img
            alt="Логотип"
            className="footer__logo footer__logo_extended logo"
            src={logo}
          />
          <div className="footer__content-wrapper">
            <nav className="footer__links">
              <NavLink
                className="footer__link link"
                activeClassName="footer__link_active"
                exact
                to="/"
                onClick={() => {
                  handleScrollToElement(servicesRef);
                }}
              >
                Наши услуги
              </NavLink>
              <NavLink
                className="footer__link link"
                activeClassName="footer__link_active"
                exact
                to="/"
                onClick={() => {
                  handleScrollToElement(phasesRef);
                }}
              >
                Этапы работы
              </NavLink>
              <NavLink
                className="footer__link link"
                activeClassName="footer__link_active"
                exact
                to="/portfolio"
              >
                Портфолио
              </NavLink>
              <NavLink
                className="footer__link link"
                activeClassName="footer__link_active"
                exact
                to="/"
                onClick={() => {
                  handleScrollToElement(advantagesRef);
                }}
              >
                Преимущества материала
              </NavLink>
              <NavLink
                className="footer__link link"
                activeClassName="footer__link_active"
                exact
                to="/"
                onClick={() => {
                  handleScrollToElement(pricingRef);
                }}
              >
                Расчет цены
              </NavLink>
              <NavLink
                className="footer__link link"
                activeClassName="footer__link_active"
                exact
                to="/advices"
              >
                Советы дизайнера
              </NavLink>
              <NavLink
                className="footer__link link"
                activeClassName="footer__link_active"
                exact
                to="/"
                onClick={() => {
                  handleScrollToElement(applicabilityRef);
                }}
              >
                Таблица применимости
              </NavLink>
              <NavLink
                className="footer__link link"
                activeClassName="footer__link_active"
                exact
                to="/"
                onClick={() => {
                  handleScrollToElement(suppliersRef);
                }}
              >
                Производители
              </NavLink>
              <NavLink
                className="footer__link link"
                activeClassName="footer__link_active"
                exact
                to="/contacts"
              >
                Контакты
              </NavLink>
            </nav>
            {windowSize.width > 849 && (
              <>
                <div className="footer__contacts">
                  <p className="footer__text footer__text_type_minor">
                    {content.address}
                  </p>
                  <p className="footer__text footer__text_type_minor">
                    {content.phonePrimary}
                  </p>
                  <p className="footer__text footer__text_type_minor">
                    {content.phoneAdditional}
                  </p>
                </div>
                <Link
                  className="footer__order-link"
                  to="/"
                  onClick={() => {
                    handleScrollToElement(formRef);
                  }}
                >
                  Оставить заявку
                </Link>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <img alt="Логотип" className="footer__logo logo" src={logo} />
          <p className="footer__text">Студия керамогранита «Каменный Цветок»</p>
          <p className="footer__text footer__text_type_additional">
            {content.phoneAdditional}
          </p>
        </>
      )}
    </footer>
  );
}

export default Footer;
