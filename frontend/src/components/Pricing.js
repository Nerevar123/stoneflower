import React from "react";
import { Link } from "react-scroll";
import arrowIcon from '../images/icons/ArrowRight.svg';

function Pricing({ content }) {
  return (
    <article id="pricing" className="pricing">
      <h2 className="content__title">{content.heading}</h2>
      <div className="advantages__info-block">
        <div className="advantages__text-container">
          <p className="content__text">{content.textMajor}</p>
          <p className="content__text">{content.textMinor}</p>
        </div>
        <Link
          to="form"
          spy={false}
          smooth={true}
          offset={-30}
          duration={500}
          href="/"
          className="advantages__link_type_navigation advantages__link link"
        >
          {content.buttonText}<img src={arrowIcon} alt="иконка стрелки"className="advantages__icon advantages_icon_type_arrow"/>
        </Link>
      </div>
    </article>
  );
}
export default Pricing;
