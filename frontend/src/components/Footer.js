import React, { useEffect, useState } from "react";
import logo from "../images/footer__logo.svg";
import useWindowSize from "../hooks/useWindowSize";
import { NavLink } from "react-router-dom";

function Footer({
  content,
  extended,
}) {
  const [isFooterExtended, setFooterExtended] = useState(false);

  useEffect(() => {
    extended ? setFooterExtended(true) : setFooterExtended(false);
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
                to="/surfaces"
              >
                Поверхности
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
                to="/advices"
              >
                Советы дизайнера
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
