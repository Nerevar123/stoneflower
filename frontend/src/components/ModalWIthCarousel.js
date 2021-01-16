import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import useWindowSize from "../hooks/useWindowSize";
import arrowRight from "../images/slider/ArrowRight.svg";
import arrowLeft from "../images/slider/ArrowLeft.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function ModalWithCarousel({
  closeModal,
  initialSlide,
  content,
  isModalWithCarouselOpen,
}) {


  function getFocus() {
    const el = document.querySelector('.modal__image-container');
    el.focus();
  }



  const window = useWindowSize();

  const numSlide = parseInt(initialSlide);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    adaptiveHeight: true,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    accessibility: true,
    draggable: true,
    initialSlide: numSlide,
  };

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        <img
          className={className}
          src={arrowRight}
          alt="Иконка"
          style={{
            ...style,
            width: "65px",
            height: "56px",
            right: "-60px",
            filter: "brightness(0) invert(1)",
          }}
          onClick={onClick}
        />
      </>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
        <img
          className={className}
          src={arrowLeft}
          alt="Иконка"
          style={{
            ...style,
            width: "65px",
            height: "56px",
            left: "-60px",
            filter: "brightness(0) invert(1)",
          }}
          onClick={onClick}
        />
      </>
    );
  }

  function handleClose() {
    closeModal();
  }

  return (
    <Modal
      closeModal={closeModal}
      isModalWithCarouselOpen={isModalWithCarouselOpen}
      carousel={true}
      children={
        <>
          <div onClick={handleClose} className="modal__overlay"></div>
          <div className="modal__slider-container">
            {window.width > 849 && (
              <button
                onClick={handleClose}
                className="modal__close-button button modal__close-button_place_carousel"
              ></button>
            )}
            <Slider {...settings} >
              {content &&
                content.map((item) => (
                  <div key={item._id} className="modal__image-container" onLoad={getFocus}>
                    <img

                      key={item._id}
                      alt="img"
                      id={item._id}
                      src={item.image}
                      className="modal__image"
                      draggable="false"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </>
      }
    />
  );
}
export default ModalWithCarousel;
