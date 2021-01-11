import React, { useState, useEffect, createRef, useRef } from "react";
import { Link } from "react-scroll";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowRight from "../images/slider/ArrowRight.svg";
import arrowLeft from "../images/slider/ArrowLeft.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Keyboard
} from "swiper";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Keyboard]);

function Portfolio({ content, showModal, isModalWithCarouselOpen }) {
  function handleImageClick(evt) {
    console.log(evt.target.id);

    showModal(evt.target.id);
  }
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        {!isModalWithCarouselOpen && (
          <img
            className={className}
            src={arrowRight}
            alt="Иконка"
            style={{ ...style, width: "65px", height: "56px", right: "-60px" }}
            onClick={onClick}
          />
        )}
      </>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        {!isModalWithCarouselOpen && (
          <img
            className={className}
            src={arrowLeft}
            alt="Иконка"
            style={{ ...style, width: "65px", height: "56px", left: "-60px" }}
            onClick={onClick}
          />
        )}
      </>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    initialSlide: 0,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    accessibility: false
  };

  return (
    <article className="portfolio">
      <h2 className="content__title content__title_place_advices">Портфолио</h2>
      <div className="portfolio__slider-container">
        {/* <Swiper
          spaceBetween={50}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          keyboard={{
            enabled: true,
          }}
        >
          {content &&
            content.map((item) => (
              <SwiperSlide key={item._id}>
                <img
                  key={item._id}
                  alt="img"
                  id={item._id}
                  src={item.image}
                  className="portfolio__image"
                  draggable="false"
                  onClick={handleImageClick}
                />
              </SwiperSlide>
            ))}
            <img
              className="swiper-button-prev"
              src={arrowLeft}
              alt="Иконка"
              style={{ width: "65px", height: "56px", left: "60px", outline: "none",  filter: "brightness(0) invert(1)" }}
            />


            <img
              className="swiper-button-next"
              src={arrowRight}
              alt="Иконка"
              style={{ width: "65px", height: "56px",right: "60px", outline: "none", filter: "brightness(0) invert(1)" }}
            />
        </Swiper> */}

        <Slider {...settings}>
        {content &&
          content.map((item) => (
            <div
              key={item._id}
              className="portfolio__slide"
            >
              <img
                key={item._id}
                alt="img"
                id={item._id}
                src={item.image}
                className="portfolio__image"
                draggable="false"
                onClick={handleImageClick}
              />
            </div>
          ))}
      </Slider>
      </div>
    </article>
  );
}

export default Portfolio;
