import React, { useState } from "react";
import logo from "../images/footer__logo.svg";

function Footer( {content} ) {
  return (
    <footer className="footer">
      <img alt="Логотип" className="footer__logo logo" src={logo} />
      <p className="footer__text">Студия керамогранита «Каменный Цветок»</p>
      <p className="footer__text footer__text_type_additional">{content.phoneAdditional}</p>
    </footer>
  );
}

export default Footer;
