import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import portfolio_1 from "../images/portfolio/portfolio_1.jpg";
import portfolio_2 from "../images/portfolio/portfolio_2.jpg";
import portfolio_3 from "../images/portfolio/portfolio_3.jpg";

function Portfolio({ content, showModal }) {
  const settings = {
    className: "center",
    infinite: false,
    centerMode: true,
    centerPadding: '0%',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };
  return (
    <article className="portfolio">
      <h2 className="content__title content__title_place_advices">Портфолио</h2>
        <div className="portfolio__slider-container">
        <Slider {...settings}>
          {content &&
            content.map((item) => (
              <div>
                <img
                  alt="img"
                  id={item._id}
                  src={item.image}
                  className="portfolio__image"
                />
              </div>
            ))}
        </Slider>
        </div>

    </article>
  );
}

export default Portfolio;
