import React from "react";
import { Link } from "react-scroll";
import arrowIcon from "../images/icons/ArrowRight.svg";

function Pricing({ content, pricingRef }) {
  return (
    <article id="pricing" className="pricing" ref={pricingRef}>
      <h2 className="content__title">{content.heading}</h2>
      <div className="content__info-block">
        <div className="content__text-container content__text-container_place_pricing">
          <p className="content__text content__text_place_pricing">
            {content.textMajor}
          </p>
          <p className="content__text content__text_place_pricing">
            {content.textMinor}
          </p>
        </div>
        <Link
          to="form"
          offset={-200}
          duration={500}
          spy={false}
          smooth={true}
          href="/"
          className="link_type_navigation link_place_pricing link"
        >
          {content.buttonText}
          <img
            src={arrowIcon}
            alt="иконка стрелки"
            className="icon icon_place_pricing icon_type_arrow"
          />
        </Link>
      </div>
    </article>
  );
}
export default Pricing;
