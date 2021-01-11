import React from "react";
import Modal from "./Modal";
import Slider from "react-slick";
import useWindowSize from "../hooks/useWindowSize";
import arrowRight from "../images/slider/ArrowRight.svg";
import arrowLeft from "../images/slider/ArrowLeft.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);



function ModalWithCarousel({ closeModal, initialSlide, content }) {
  function handleClose() {
    closeModal();
  }
  const window = useWindowSize();
  const slide = initialSlide;
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img
        className="swiper-button-next"
        src={arrowRight}
        alt="Иконка"
        style={{ ...style, width: "65px", height: "56px", right: "-60px" }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img
        className="swiper-button-prev"
        src={arrowLeft}
        alt="Иконка"
        style={{ ...style, width: "65px", height: "56px", left: "-60px" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    initialSlide: initialSlide,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: false,
    adaptiveHeight: true,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Modal
      closeModal={closeModal}
      carousel={true}
      children={
        <>
          <div onClick={handleClose} className="modal__overlay"></div>
          <div className="modal__slider-container">
            {/* <Slider {...settings}>
            {content &&
              content.map((item) => (

                  <img
                    key={item._id}
                    alt="img"
                    id={item._id}
                    src={item.image}
                    className="modal__image"
                    draggable="false"
                  />
              ))}
          </Slider> */}
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              initialSlide={slide}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
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
                      className="modal__image"
                      draggable="false"
                    />
                  </SwiperSlide>
                ))}

            </Swiper>
          </div>

            <img
                          className="swiper-button-prev"
              src={arrowLeft}
              alt="Иконка"
              style={{ width: "65px", height: "56px", outline: "none" }}
            />


            <img
              className="swiper-button-next"
              src={arrowRight}
              alt="Иконка"
              style={{ width: "65px", height: "56px", outline: "none" }}
            />
        </>
      }
    />
  );
}
export default ModalWithCarousel;
